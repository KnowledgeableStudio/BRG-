import { NextResponse } from "next/server";
import { paypalFetch, assertPayPalConfigured } from "@/lib/paypal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// PayPal order IDs are uppercase alphanumeric, typically 17-20 chars.
const ORDER_ID_RE = /^[A-Z0-9]{10,30}$/;

type CaptureBody = {
  orderID?: unknown;
};

export async function POST(request: Request) {
  try {
    assertPayPalConfigured();

    const body = (await request.json().catch(() => ({}))) as CaptureBody;
    const orderID = body.orderID;

    if (typeof orderID !== "string" || !ORDER_ID_RE.test(orderID)) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    const res = await paypalFetch(
      `/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`,
      { method: "POST" }
    );

    if (!res.ok) {
      console.error("[paypal] capture-order failed:", res.status, await res.text());
      return NextResponse.json(
        { error: "Failed to capture payment" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const capture =
      data?.purchase_units?.[0]?.payments?.captures?.[0] ?? null;

    return NextResponse.json({
      id: data.id,
      status: capture?.status ?? data.status,
      captureId: capture?.id ?? null
    });
  } catch (error) {
    console.error("[paypal] capture-order error:", error);
    return NextResponse.json(
      { error: "Unable to process request" },
      { status: 500 }
    );
  }
}
