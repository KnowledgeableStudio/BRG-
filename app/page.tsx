"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountdownTimer from "@/components/CountdownTimer";
import FloatingToy from "@/components/FloatingToy";
import ProductCard from "@/components/ProductCard";
import EchoBackground from "@/components/EchoBackground";
import EchoPreview from "@/components/EchoPreview";
import { useCart } from "@/context/CartContext";
import { product } from "@/lib/product";
import { formatCurrency } from "@/lib/pricing";

const features = [
  {
    title: "BRG Hoodie",
    body: "Deep black plush fabric, electric blue trim, and a compact hoodie silhouette designed for the BRG collection."
  },
  {
    title: "Embroidered Details",
    body: "Aqua face details, soft silver hair, and clean stitching deliver a premium finish."
  },
  {
    title: "Display Ready",
    body: "Sized for desks, shelves, and collector displays — a standout piece for any setup."
  }
];

export default function Home() {
  const { openCart } = useCart();

  return (
    <>
      <EchoBackground />
      <div className="relative z-10">
      <section className="relative min-h-[85vh] overflow-hidden px-6 pt-32">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-brg-blue/25 blur-[110px]" />
        <div className="mx-auto grid min-h-[calc(85vh-8rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10"
          >
            <CountdownTimer />
            <h1 className="mt-8 max-w-4xl font-display text-5xl font-black uppercase leading-[0.92] text-white md:text-8xl lg:text-9xl">
              BRG PLUSH HOODIE TOY
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62">
              A premium BRG plush collectible wearing black techwear, neon blue trim, silver hair,
              and embroidered details made for desks, shelves, and display setups.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/product"
                className="rounded-full bg-brg-blue px-8 py-4 font-display text-sm font-black uppercase tracking-[0.2em] text-black transition hover:shadow-glow-strong"
              >
                Shop Now
              </Link>
              <button
                type="button"
                onClick={openCart}
                className="rounded-full border border-white/15 px-8 py-4 font-display text-sm font-black uppercase tracking-[0.2em] text-white/80 transition hover:border-brg-blue hover:text-brg-blue"
              >
                View Cart
              </button>
              <p className="font-display text-lg font-bold text-white">
                {formatCurrency(product.price)} <span className="text-brg-blue">+ taxes</span>
              </p>
              <p className="text-xs text-white/40">Shipping arranged after checkout</p>
            </div>
            <motion.div
              className="mt-12 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-brg-blue"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-x-10 top-14 h-72 rounded-full bg-brg-blue/30 blur-[90px]" />
            <FloatingToy />
            <motion.div
              className="glass-panel absolute bottom-4 right-0 hidden w-48 overflow-hidden rounded-[1.8rem] p-2 shadow-glow md:block"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.4rem] bg-black/30">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="192px"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="bento-grid grid gap-y-8 gap-x-6 md:grid-cols-3 md:gap-y-6">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                className="glass-panel rounded-[2rem] p-7"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="mb-8 h-px w-full bg-gradient-to-r from-brg-blue to-transparent" />
                <h2 className="font-display text-2xl font-black text-white">{feature.title}</h2>
                <p className="mt-4 text-base font-medium leading-7 text-white/75">{feature.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-y-12 gap-x-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-y-0">
          <div>
            <p className="font-display text-sm font-black uppercase tracking-[0.28em] text-brg-blue">
              Lifestyle
            </p>
            <h2 className="mt-4 font-display text-4xl font-black text-white md:text-7xl">
              Built for the shelf. Styled for BRG.
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-white/75">
              The BRG Plush Hoodie Toy sits naturally beside controllers, keyboards, monitors, and
              collectible displays — a premium piece that complements any gaming setup.
            </p>
            <div className="mt-10">
              <ProductCard />
            </div>
          </div>
          <div className="grid items-start gap-4 sm:grid-cols-2">
            {[product.images[1], product.images[4]].map(
              (image, index) => (
                <motion.div
                  key={image}
                  className={`glass-panel relative overflow-hidden rounded-[2rem] ${
                    index === 1 ? "sm:mt-16" : ""
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="relative aspect-[3/4] bg-black/30">
                    <Image
                      src={image}
                      alt={`${product.name} lifestyle angle ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 320px, 50vw"
                      className="h-full w-full object-cover transition duration-700 hover:scale-110"
                      style={{ objectPosition: "center" }}
                    />
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="bento-grid grid gap-y-12 gap-x-12 lg:grid-cols-2 lg:gap-y-0">
            <div>
              <p className="font-display text-sm font-black uppercase tracking-[0.28em] text-brg-blue">
                About BRG
              </p>
              <h2 className="mt-4 font-display text-4xl font-black md:text-6xl">
                From the BRG drop to your desk.
              </h2>
              <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-white/75">
                BRG Collection is centered on the BRG Plush Hoodie Toy: a soft collectible with
                black hoodie styling, neon blue accents, embroidered face details, and silver hair.
              </p>
              <p className="mt-4 max-w-xl text-lg font-medium leading-8 text-white/75">
                Every piece is crafted for collectors who value clean design, premium materials,
                and display-ready quality.
              </p>
            </div>
            <div className="glass-panel rounded-[2.5rem] p-8">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brg-blue/20 text-brg-blue">
                    <span className="font-display text-xl font-black">01</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-black text-white">Premium Materials</h3>
                    <p className="mt-2 text-sm font-medium text-white/75">
                      Soft plush fabric with durable stitching and embroidered face details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brg-blue/20 text-brg-blue">
                    <span className="font-display text-xl font-black">02</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-black text-white">BRG Hoodie Design</h3>
                    <p className="mt-2 text-sm font-medium text-white/75">
                      Black hoodie styling with neon blue BRG accents and silver hair.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brg-blue/20 text-brg-blue">
                    <span className="font-display text-xl font-black">03</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-black text-white">Display Ready</h3>
                    <p className="mt-2 text-sm font-medium text-white/75">
                      Sized for desks, shelves, collector displays, and product photography.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EchoPreview />

      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-display text-sm font-black uppercase tracking-[0.28em] text-brg-blue">
              Everything You Need
            </p>
            <h2 className="mt-4 font-display text-4xl font-black md:text-6xl">
              Everything you need to know
            </h2>
          </div>
          <div className="bento-grid grid gap-y-8 gap-x-6 md:grid-cols-2 md:gap-y-6">
            <div className="glass-panel rounded-[2rem] p-6">
              <h3 className="font-display text-xl font-black text-white">Shipping</h3>
              <ul className="mt-4 space-y-3 text-sm font-medium text-white/75">
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Shipping is not included in the product price.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>A BRG representative will contact you after checkout to arrange shipping.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Shipping costs are calculated based on your location.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Ships with protective wrapping for safe delivery.</span>
                </li>
              </ul>
            </div>
            <div className="glass-panel rounded-[2rem] p-6">
              <h3 className="font-display text-xl font-black text-white">Product Details</h3>
              <ul className="mt-4 space-y-3 text-sm font-medium text-white/75">
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Height: approximately 10 inches.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Material: premium plush fabric.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Care: spot clean with a damp cloth.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Packaging: protective wrapping, no display box.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Images for illustration only.</span>
                </li>
              </ul>
            </div>
            <div className="glass-panel rounded-[2rem] p-6">
              <h3 className="font-display text-xl font-black text-white">Care Guide</h3>
              <ul className="mt-4 space-y-3 text-sm font-medium text-white/75">
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Spot clean only, then air dry.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Inspect fabric, hoodie trim, and embroidery on arrival.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Keep protective wrapping for storage or returns.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Avoid machine washing to preserve embroidery.</span>
                </li>
              </ul>
            </div>
            <div className="glass-panel rounded-[2rem] p-6">
              <h3 className="font-display text-xl font-black text-white">Pricing</h3>
              <ul className="mt-4 space-y-3 text-sm font-medium text-white/75">
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Base price: $24.99 before tax.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Applicable tax calculated at checkout.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Secure payment processed by PayPal.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brg-blue">&gt;</span>
                  <span>Buyer protection included on every order.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Policies & FAQ — collapsible accordion */}
      <section id="policies" className="px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-display text-sm font-black uppercase tracking-[0.28em] text-brg-blue">
              Policies &amp; FAQ
            </p>
            <h2 className="mt-3 font-display text-3xl font-black md:text-5xl">
              Before you order
            </h2>
          </div>

          <div className="mt-8 space-y-2">
            <FaqItem
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              }
              question="Does the plush come in a box?"
            >
              No. The BRG Plush Hoodie Toy ships with protective wrapping to ensure it arrives in
              perfect condition. No display box or retail packaging is included. Some lifestyle
              images may show a box for presentation purposes only.
            </FaqItem>

            <FaqItem
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
              question="Is the product exactly as shown?"
            >
              Yes, 100%. The BRG Plush Hoodie Toy you receive is the exact same product shown in
              our images — same design, same materials, same colors, and same embroidered details.
              What you see is what you get, guaranteed.
            </FaqItem>

            <FaqItem
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              }
              question="How does shipping work?"
            >
              Shipping is not included in the product price. After your order is placed, a BRG
              representative will contact you to arrange shipping and confirm delivery details
              based on your location. Shipping costs are calculated separately and agreed upon
              before your order is dispatched.
            </FaqItem>

            <FaqItem
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              }
              question="What is your return policy?"
            >
              If your plush arrives damaged or defective, contact us within 14 days of delivery
              with your order number and photos. We will arrange a replacement or full refund.
              Due to the nature of collectible items, returns are only accepted for damaged or
              defective products.
            </FaqItem>

            <FaqItem
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              question="Is my payment secure?"
            >
              All payments are processed securely through PayPal. We never store your payment
              information. PayPal Buyer Protection is included on every order at no extra cost.
            </FaqItem>

            <FaqItem
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
              question="How do I contact support?"
            >
              We are here to help. Reach out to our support team at{" "}
              <a href="mailto:support@brgofficial.com" className="font-semibold text-brg-blue transition hover:text-white">
                support@brgofficial.com
              </a>{" "}
              and we will get back to you within 24 hours.
            </FaqItem>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

function FaqItem({
  icon,
  question,
  children,
  defaultOpen = false
}: {
  icon: ReactNode;
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass-panel overflow-hidden rounded-xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-white/5"
        aria-expanded={open}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brg-blue/15 text-brg-blue">
          {icon}
        </span>
        <span className="flex-1 text-sm font-bold text-white">{question}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-white/40"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 pl-[3.75rem] text-sm leading-6 text-white/60">
              {children}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
