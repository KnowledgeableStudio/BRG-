import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCursor from "@/components/AnimatedCursor";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://brg-future-plush.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  title: {
    default: "BRG Collection - Future Plush",
    template: "%s | BRG Collection"
  },
  description:
    "Shop the BRG Plush Hoodie Toy, a premium techwear-inspired collectible plush with neon blue esports styling.",
  keywords: [
    "BRG plush",
    "hoodie toy",
    "gaming plush",
    "techwear collectible",
    "esports plush"
  ],
  openGraph: {
    title: "BRG Collection - Future Plush",
    description:
      "A premium BRG Plush Hoodie Toy with black techwear styling, neon blue accents, and embroidered details.",
    url: "https://brg-future-plush.vercel.app",
    siteName: "BRG Collection",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BRG Collection - Future Plush"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BRG Collection - Future Plush",
    description: "Premium techwear plush drop. $24.99 + taxes.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head suppressHydrationWarning>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BRG Collection",
              url: "https://brg-future-plush.vercel.app",
              logo: "https://brg-future-plush.vercel.app/logo.png",
              description:
                "Premium streetwear and gaming styled e-commerce for the BRG Plush Hoodie Toy.",
              sameAs: []
            })
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BRG Collection - Future Plush",
              url: "https://brg-future-plush.vercel.app",
              publisher: {
                "@type": "Organization",
                name: "BRG Collection",
                logo: "https://brg-future-plush.vercel.app/logo.png"
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <div className="noise-overlay" />
          <AnimatedCursor />
          <Navbar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
