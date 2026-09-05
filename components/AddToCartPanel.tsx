"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { product } from "@/lib/product";
import { formatCurrency, getTaxRate } from "@/lib/pricing";

export default function AddToCartPanel() {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      },
      quantity
    );
    setAdded(true);
    openCart();
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">Price</p>
          <p className="mt-1 font-display text-3xl font-black text-white">
            {formatCurrency(product.price)} <span className="text-base text-brg-blue">+ taxes</span>
          </p>
          <p className="mt-1 text-xs text-white/40">Shipping calculated after checkout</p>
        </div>
        <div className="rounded-full border border-brg-blue/30 bg-brg-blue/10 px-4 py-2 text-sm font-bold text-brg-blue">
          {(getTaxRate() * 100).toFixed(3)}% tax rate
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-white/15 bg-black/30 p-1">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            className="grid h-11 w-11 place-items-center rounded-full text-xl transition hover:bg-white/10"
          >
            -
          </button>
          <span className="grid h-11 min-w-12 place-items-center font-display text-xl font-bold">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((current) => Math.min(99, current + 1))}
            className="grid h-11 w-11 place-items-center rounded-full text-xl transition hover:bg-white/10"
          >
            +
          </button>
        </div>
        <motion.button
          type="button"
          onClick={handleAddToCart}
          whileTap={{ scale: 0.96 }}
          className="rounded-full bg-brg-blue px-8 py-4 font-display text-sm font-black uppercase tracking-[0.2em] text-black transition hover:shadow-glow-strong"
        >
          Add to Cart
        </motion.button>
      </div>
      {added && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm font-semibold text-brg-blue"
        >
          Added to cart.
        </motion.p>
      )}
    </div>
  );
}
