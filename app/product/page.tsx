"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AddToCartPanel from "@/components/AddToCartPanel";
import EchoProductCinematic from "@/components/EchoProductCinematic";
import FloatingToy from "@/components/FloatingToy";
import ProductGallery from "@/components/ProductGallery";
import { product, productNotes } from "@/lib/product";
import { formatCurrency } from "@/lib/pricing";

export default function ProductPage() {
  return (
    <>
    <section className="relative overflow-hidden px-6 py-32">
      <div className="absolute left-1/2 top-28 h-96 w-96 -translate-x-1/2 rounded-full bg-brg-blue/20 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <ProductGallery images={product.images} name={product.name} />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-28"
          >
            <Link href="/" className="text-sm font-bold text-white/45 transition hover:text-brg-blue">
              Back to Home
            </Link>
            <h1 className="mt-5 font-display text-5xl font-black text-white md:text-7xl">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-2xl font-black text-brg-blue">
              {formatCurrency(product.price)} + taxes
            </p>
            <p className="mt-6 text-lg leading-8 text-white/62">{product.description}</p>
            <div className="mt-8">
              <AddToCartPanel />
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div
                  key={spec}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/64"
                >
                  <span className="mr-2 text-brg-blue">&#9670;</span>
                  {spec}
                </div>
              ))}
            </div>

            {/* Product disclaimer */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
              <svg className="mt-0.5 shrink-0 text-brg-blue" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <div className="text-xs leading-5 text-white/50">
                <p>
                  The BRG Plush Hoodie Toy you receive is 100% the same product shown in our
                  images — same design, materials, colors, and embroidered details.
                </p>
                <p className="mt-2">
                  Shipping is not included in the price. A BRG representative will contact you
                  after checkout to arrange shipping based on your location. The plush ships
                  with protective wrapping — no display box is included.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="glass-panel rounded-[2.5rem] p-6">
          <FloatingToy className="h-[360px] md:h-[420px]" />
        </div>
        <div>
          <p className="font-display text-sm font-black uppercase tracking-[0.28em] text-brg-blue">
            Why You&apos;ll Love It
          </p>
          <h2 className="mt-4 font-display text-4xl font-black md:text-6xl">
            Crafted for collectors.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {productNotes.map((note) => (
              <article key={note.title} className="glass-panel rounded-[1.75rem] p-5">
                <div className="font-display text-lg font-black text-brg-blue">{note.title}</div>
                <p className="mt-4 text-sm leading-6 text-white/62">{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

      <EchoProductCinematic />

      <section className="mx-auto mt-24 max-w-7xl px-6 py-24">
        <div className="text-center">
          <p className="font-display text-sm font-black uppercase tracking-[0.28em] text-brg-blue">
            Product Details
          </p>
          <h2 className="mt-4 font-display text-4xl font-black md:text-6xl">
            Everything you need to know
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="glass-panel rounded-[2rem] p-6">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-brg-blue/20 text-brg-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-black text-white">Premium Quality</h3>
            <p className="mt-2 text-white/60">Crafted with high-quality plush fabric and durable stitching for long-lasting enjoyment.</p>
          </div>
          <div className="glass-panel rounded-[2rem] p-6">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-brg-blue/20 text-brg-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-black text-white">Display Ready</h3>
            <p className="mt-2 text-white/60">Perfect size for desks, shelves, and gaming setups. Ships with protective wrapping for safe delivery.</p>
          </div>
          <div className="glass-panel rounded-[2rem] p-6">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-brg-blue/20 text-brg-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-black text-white">Limited Edition</h3>
            <p className="mt-2 text-white/60">Part of the exclusive BRG Collection drop. Once they're gone, they're gone.</p>
          </div>
          <div className="glass-panel rounded-[2rem] p-6">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-brg-blue/20 text-brg-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-black text-white">Gaming Inspired</h3>
            <p className="mt-2 text-white/60">Designed with esports aesthetics, featuring techwear styling and neon blue accents.</p>
          </div>
          <div className="glass-panel rounded-[2rem] p-6">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-brg-blue/20 text-brg-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-black text-white">Soft Plush Feel</h3>
            <p className="mt-2 text-white/60">Ultra-soft plush material built for both display and comfort.</p>
          </div>
          <div className="glass-panel rounded-[2rem] p-6">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-brg-blue/20 text-brg-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-black text-white">Secure Checkout</h3>
            <p className="mt-2 text-white/60">Pay safely with PayPal. Your order is protected from checkout to delivery.</p>
          </div>
        </div>
      </section>
    </>
  );
}
