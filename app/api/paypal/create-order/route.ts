import { NextResponse } from "next/server";
import { paypalFetch, assertPayPalConfigured } from "@/lib/paypal";
import { calculateOrderTotals, getTaxRate, roundCurrency } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ITEMS = 50;
const MAX_QUANTITY = 99;
const MAX_ORDER_VALUE = 10_000;

type CartLine = {
  id?: unknown;
  name?: unknown;
  price?: unknown;
  quantity?: unknown;
};

type CreateOrderBody = {
  items?: unknown;
};

function sanitizeItems(raw: unknown): { name: string; price: number; quantity: number }[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  if (raw.length > MAX_ITEMS) return [];

  const result: { name: string; price: number; quantity: number }[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;

    const obj = item as CartLine;
    const name = typeof obj.name === "string" ? obj.name.slice(0, 127) : "Item";
    const price = Number(obj.price);
    const quantity = Math.floor(Number(obj.quantity));

    if (!Number.isFinite(price) || price < 0 || price > 1000) continue;
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QUANTITY) continue;

    result.push({ name, price: roundCurrency(price), quantity });
  }

  return result;
}

export async function POST(request: Request) {
  try {
    assertPayPalConfigured();

    const body = (await request.json().catch(() => ({}))) as CreateOrderBody;
    const items = sanitizeItems(body.items);

    if (items.length === 0) {
      return NextResponse.json({ error: "Cart is empty or invalid" }, { status: 400 });
    }

    const taxRate = getTaxRate();
    const rawSubtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (rawSubtotal > MAX_ORDER_VALUE) {
      return NextResponse.json({ error: "Order value exceeds maximum" }, { status: 400 });
    }

    const totals = calculateOrderTotals(rawSubtotal, taxRate);

    const itemLines = items.map((item) => ({
      name: item.name,
      quantity: String(item.quantity),
      unit_amount: {
        currency_code: "USD",
        value: item.price.toFixed(2)
      },
      category: "PHYSICAL_GOODS"
    }));

    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totals.total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totals.subtotal.toFixed(2)
              },
              tax_total: {
                currency_code: "USD",
                value: totals.tax.toFixed(2)
              }
            }
          },
          items: itemLines
        }
      ],
      application_context: {
        brand_name: "BRG Collection",
        shipping_preference: "GET_FROM_FILE",
        user_action: "PAY_NOW",
        locale: "en-US"
      }
    };

    const res = await paypalFetch("/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error("[paypal] create-order failed:", res.status, await res.text());
      return NextResponse.json(
        { error: "Failed to create payment order" },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ id: data.id, total: totals.total });
  } catch (error) {
    console.error("[paypal] create-order error:", error);
    return NextResponse.json(
      { error: "Unable to process request" },
      { status: 500 }
    );
  }
}
