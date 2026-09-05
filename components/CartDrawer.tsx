"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/pricing";

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    tax,
    total,
    taxRate,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0b0b0f]/95 backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 38 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl font-black text-white">
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <span className="grid h-6 min-w-6 place-items-center rounded-full bg-brg-blue px-2 text-xs font-black text-black">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={closeCart}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="relative h-32 w-32">
                  <Image
                    src="/logo.png"
                    alt="BRG Logo"
                    fill
                    sizes="128px"
                    quality={90}
                    className="object-contain"
                  />
                </div>
                <p className="mt-6 font-display text-2xl font-black text-white">
                  Your cart is empty
                </p>
                <p className="mt-3 text-sm text-white/50">
                  The BRG Plush Hoodie Toy is waiting for you.
                </p>
                <Link
                  href="/product"
                  onClick={closeCart}
                  className="mt-8 rounded-full bg-brg-blue px-8 py-4 font-display text-sm font-black uppercase tracking-[0.2em] text-black transition hover:shadow-glow-strong"
                >
                  Shop the BRG Drop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-3"
                      >
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-black/30">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="h-full w-full object-cover"
                            style={{ objectPosition: "center" }}
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display text-sm font-black leading-tight text-white">
                              {item.name}
                            </h3>
                            <button
                              type="button"
                              aria-label="Remove item"
                              onClick={() => removeItem(item.id)}
                              className="shrink-0 text-white/35 transition hover:text-brg-blue"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-white/45">
                            {formatCurrency(item.price)} each
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-white/12 bg-black/30 p-0.5">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="grid h-8 w-8 place-items-center rounded-full text-base text-white transition hover:bg-white/10"
                              >
                                -
                              </button>
                              <span className="grid h-8 min-w-8 place-items-center font-display text-sm font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="grid h-8 w-8 place-items-center rounded-full text-base text-white transition hover:bg-white/10"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-display text-sm font-black text-brg-blue">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 px-6 py-5">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-white/55">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-white/55">
                      <span>Tax ({(taxRate * 100).toFixed(3)}%)</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex justify-between font-display text-2xl font-black text-white">
                      <span>Total</span>
                      <span className="text-brg-blue">{formatCurrency(total)}</span>
                    </div>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-5 flex w-full justify-center rounded-full bg-brg-blue px-8 py-4 font-display text-sm font-black uppercase tracking-[0.2em] text-black transition hover:shadow-glow-strong"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-xs font-semibold text-white/40 transition hover:text-white/70"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
