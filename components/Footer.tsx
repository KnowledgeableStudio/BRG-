import Link from "next/link";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/brgofficialplushies?stkn=am85aWU3OWpiMjd1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@brgofficialplushies?_r=1&_t=ZP-99USFP0pPiA",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
      </svg>
    )
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/19D1oprZx9/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  }
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/60 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-black tracking-[0.24em] text-white">BRG</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
              Premium collectible plush toys designed for gamers, collectors, and display enthusiasts.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-display text-xs uppercase tracking-[0.25em] text-brg-blue">Shop</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <Link href="/product" className="transition hover:text-white">
                Product
              </Link>
              <Link href="/cart" className="transition hover:text-white">
                Cart
              </Link>
              <Link href="/checkout" className="transition hover:text-white">
                Checkout
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="font-display text-xs uppercase tracking-[0.25em] text-brg-blue">Support</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <a
                href="mailto:support@brgofficial.com"
                className="transition hover:text-white"
              >
                Contact Us
              </a>
              <Link href="/#policies" className="transition hover:text-white">
                Shipping &amp; Returns
              </Link>
              <Link href="/#policies" className="transition hover:text-white">
                FAQ
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-display text-xs uppercase tracking-[0.25em] text-brg-blue">Follow BRG</p>
            <div className="mt-4 flex flex-col gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 transition group-hover:border-brg-blue group-hover:bg-brg-blue/15 group-hover:text-brg-blue">
                    {social.icon}
                  </span>
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/40">
            &copy; {year} BRG Collection. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Secure checkout powered by PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
