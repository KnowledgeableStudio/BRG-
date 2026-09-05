"use client";

import Image from "next/image";
import { type CartLine, useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/pricing";

export default function CartItem({ item }: { item: CartLine }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <article className="glass-panel grid gap-5 rounded-[1.8rem] p-4 md:grid-cols-[96px_1fr_auto] md:items-center">
      <div className="relative h-32 w-24 overflow-hidden rounded-3xl bg-black/30">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="112px"
          priority
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          style={{ objectPosition: "center" }}
        />
      </div>
      <div>
        <h2 className="font-display text-xl font-black text-white">{item.name}</h2>
        <p className="mt-2 text-sm text-white/55">{formatCurrency(item.price)} + taxes</p>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="mt-4 text-sm font-semibold text-white/45 transition hover:text-brg-blue"
        >
          Remove
        </button>
      </div>
      <div className="flex items-center justify-between gap-5 md:justify-end">
        <div className="flex items-center rounded-full border border-white/15 bg-black/30 p-1">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="grid h-10 w-10 place-items-center rounded-full text-lg text-white transition hover:bg-white/10"
          >
            -
          </button>
          <span className="grid h-10 min-w-10 place-items-center font-display text-lg font-bold">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="grid h-10 w-10 place-items-center rounded-full text-lg text-white transition hover:bg-white/10"
          >
            +
          </button>
        </div>
        <p className="min-w-24 text-right font-display text-xl font-black text-brg-blue">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </article>
  );
}
