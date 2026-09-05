"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/pricing";
import PayPalButtons from "./PayPalButtons";

type PaymentResult = {
  id: string;
  status?: string;
  captureId?: string | null;
};

export default function CheckoutForm() {
  const { items, subtotal, tax, total, taxRate, clearCart } = useCart();
  const [shippingConfirmed, setShippingConfirmed] = useState(false);
  const [payment, setPayment] = useState<PaymentResult | null>(null);

  const handleShippingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShippingConfirmed(true);
  };

  if (items.length === 0 && !payment) {
    return (
      <section className="mx-auto max-w-xl px-6 py-32 text-center">
        <div className="glass-panel rounded-3xl p-10">
          <p className="font-display text-3xl font-black">Your cart is empty</p>
          <p className="mt-3 text-sm text-white/55">Add the BRG Plush Hoodie Toy to start checkout.</p>
          <Link
            href="/product"
            className="mt-6 inline-flex rounded-full bg-brg-blue px-6 py-3 font-display text-xs font-black uppercase tracking-[0.2em] text-black transition hover:shadow-glow"
          >
            Shop Now
          </Link>
        </div>
      </section>
    );
  }

  if (payment) {
    return (
      <section className="mx-auto max-w-xl px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl p-10"
        >
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brg-blue/20">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00AEEF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="mt-5 font-display text-3xl font-black text-brg-blue">Order confirmed</p>
          <p className="mt-3 text-sm text-white/70">
            Thank you for your order. Your payment has been processed successfully.
          </p>
          <div className="mt-5 inline-flex flex-col gap-1 rounded-xl border border-brg-blue/25 bg-brg-blue/5 px-5 py-3 text-xs">
            <span className="font-bold text-white">Order {payment.id}</span>
            {payment.captureId && (
              <span className="text-white/50">Transaction {payment.captureId}</span>
            )}
            <span className="text-white/50">Status: {payment.status ?? "Completed"}</span>
          </div>
          <div className="mt-6">
            <Link
              href="/product"
              className="inline-flex rounded-full bg-brg-blue px-6 py-3 font-display text-xs font-black uppercase tracking-[0.2em] text-black transition hover:shadow-glow"
            >
              Back to shop
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <div className="glass-panel rounded-3xl p-6 md:p-7">
        <h1 className="font-display text-2xl font-black">Checkout</h1>

        {/* Compact order summary bar */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brg-blue/15 font-display text-xs font-black text-brg-blue">
              {items.reduce((n, i) => n + i.quantity, 0)}
            </div>
            <span className="text-sm font-semibold text-white/80">{items[0]?.name ?? "Item"}</span>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-black text-brg-blue">{formatCurrency(total)}</p>
            <p className="text-[0.65rem] text-white/40">incl. {formatCurrency(tax)} tax</p>
          </div>
        </div>

        {/* Shipping notice */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-white/10 bg-black/30 p-3">
          <svg className="mt-0.5 shrink-0 text-brg-blue" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-[0.7rem] leading-4 text-white/50">
            Shipping is not included in the total. A BRG representative will contact you after
            checkout to arrange shipping based on your location.
          </p>
        </div>

        {/* Shipping form */}
        {!shippingConfirmed && (
          <form onSubmit={handleShippingSubmit} className="mt-5 space-y-3">
            <div className="grid gap-3">
              <input
                required
                name="name"
                autoComplete="name"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-brg-blue"
                placeholder="Full name"
              />
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-brg-blue"
                placeholder="Email address"
              />
              <input
                required
                name="address"
                autoComplete="street-address"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-brg-blue"
                placeholder="Shipping address"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-brg-blue px-6 py-3.5 font-display text-xs font-black uppercase tracking-[0.2em] text-black transition hover:shadow-glow-strong"
            >
              Continue to payment
            </button>
          </form>
        )}

        {/* Payment section — only after shipping confirmed */}
        {shippingConfirmed && (
          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Shipping confirmed
              </div>
              <button
                type="button"
                onClick={() => setShippingConfirmed(false)}
                className="text-xs font-semibold text-brg-blue transition hover:text-white"
              >
                Edit
              </button>
            </div>

            <PayPalButtons
              items={items}
              onSuccess={(result) => {
                setPayment(result);
                clearCart();
              }}
            />
          </div>
        )}

        {/* Trust badges — compact single line */}
        <div className="mt-4 flex items-center justify-center gap-3 text-[0.65rem] font-semibold text-white/30">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>256-bit SSL</span>
          <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
          <span>Buyer Protection</span>
        </div>
      </div>
    </section>
  );
}
