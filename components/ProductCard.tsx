"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { product } from "@/lib/product";
import { formatCurrency } from "@/lib/pricing";

export default function ProductCard() {
  const { addItem, openCart } = useCart();

  return (
    <motion.article
      className="glass-panel group overflow-hidden rounded-[2rem]"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <Link href="/product" className="relative block aspect-[3/4] overflow-hidden bg-black/30">
        <Image
          src={product.images[1]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 420px, 90vw"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="font-display text-2xl font-black text-white">{product.name}</p>
          <p className="mt-2 text-brg-blue">{formatCurrency(product.price)} + taxes</p>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-4 p-5">
        <Link
          href="/product"
          className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/75 transition hover:border-brg-blue hover:text-brg-blue"
        >
          View Details
        </Link>
        <button
          type="button"
          onClick={() => {
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0]
            });
            openCart();
          }}
          className="rounded-full bg-brg-blue px-5 py-3 text-sm font-black text-black transition hover:shadow-glow"
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}
