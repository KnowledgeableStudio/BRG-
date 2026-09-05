"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/pricing";

export default function CartPage() {
  const { items, subtotal, tax, total, taxRate, clearCart } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-display text-sm font-black uppercase tracking-[0.28em] text-brg-blue">
            Cart
          </p>
          <h1 className="mt-4 font-display text-5xl font-black md:text-7xl">
            Your Cart
          </h1>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/58 transition hover:border-brg-blue hover:text-brg-blue"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel mt-12 rounded-[2.5rem] p-10 text-center"
        >
          <p className="font-display text-3xl font-black">Your cart is empty.</p>
          <p className="mt-4 text-white/55">The BRG Plush Hoodie Toy is ready when you are.</p>          <Link
            href="/product"
            className="mt-8 inline-flex rounded-full bg-brg-blue px-8 py-4 font-display text-sm font-black uppercase tracking-[0.2em] text-black transition hover:shadow-glow"
          >
            Shop Now
          </Link>
        </motion.div>
      ) : (
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_390px]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <aside className="glass-panel h-fit rounded-[2rem] p-6 lg:sticky lg:top-28">
            <p className="font-display text-2xl font-black">Order Breakdown</p>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Tax ({(taxRate * 100).toFixed(3)}%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between font-display text-3xl font-black text-brg-blue">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-8 flex w-full justify-center rounded-full bg-brg-blue px-8 py-4 font-display text-sm font-black uppercase tracking-[0.2em] text-black transition hover:shadow-glow-strong"
            >
              Checkout
            </Link>
            <p className="mt-4 text-center text-xs leading-5 text-white/42">
              Tax is applied at checkout based on your location.
            </p>
            <p className="mt-2 text-center text-xs leading-5 text-white/42">
              Shipping is not included. A BRG representative will contact you after checkout to arrange delivery.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
