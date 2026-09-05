"use client";

import { useEffect, useRef, useState } from "react";
import type { CartLine } from "@/context/CartContext";

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPalButtonsConfig) => PayPalButtonsInstance;
    };
  }
}

type PayPalButtonsConfig = {
  style?: {
    layout?: "vertical" | "horizontal";
    color?: "gold" | "blue" | "silver" | "white" | "black";
    shape?: "rect" | "pill";
    label?: "paypal" | "pay" | "checkout" | "buynow";
    height?: number;
  };
  createOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  onError: (err: unknown) => void;
};

type PayPalButtonsInstance = {
  render: (selector: HTMLElement) => Promise<void>;
  close: () => Promise<void>;
};

type PayPalButtonsProps = {
  items: CartLine[];
  onSuccess: (result: {
    id: string;
    status?: string;
    captureId?: string | null;
  }) => void;
};

const SCRIPT_ID = "paypal-sdk-script";
let sdkPromise: Promise<void> | null = null;

const PAYPAL_DARK_CSS = `
  html, body { background: transparent !important; }
  body, div, span { background-color: transparent !important; }
  .paypal-button-card, .paypal-button, .paypal-button-text,
  .paypal-button-label-container, .paypal-button-content,
  .paypal-button-row, .paypal-button-fundingicons,
  .paypal-button-shape-rect, .paypal-button-shape-pill {
    background-color: transparent !important;
  }
  .paypal-button-text-white, .paypal-button-text-black {
    color: #fff !important;
  }
  .paypal-button-color-black {
    background: #111319 !important;
    border: 1px solid rgba(255,255,255,0.15) !important;
  }
  .paypal-button-color-gold {
    background: #ffc439 !important;
  }
  .paypal-button-tagline {
    color: rgba(255,255,255,0.5) !important;
  }
  .paypal-button-text-color-black {
    color: #000 !important;
  }
`;

function injectDarkStyleIntoPayPalFrames(container: HTMLElement) {
  const iframes = container.querySelectorAll("iframe");
  iframes.forEach((iframe) => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc && !doc.getElementById("paypal-dark-mode")) {
        const style = doc.createElement("style");
        style.id = "paypal-dark-mode";
        style.textContent = PAYPAL_DARK_CSS;
        doc.head?.appendChild(style);
      }
    } catch {
      // Cross-origin iframe — can't inject, but color:black + CSS handles most
    }
  });
}

function loadSdk(clientId: string): Promise<void> {
  if (sdkPromise) return sdkPromise;
  if (window.paypal) {
    sdkPromise = Promise.resolve();
    return sdkPromise;
  }

  sdkPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("PayPal SDK failed")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      clientId
    )}&currency=USD&intent=capture&commit=true&components=buttons`;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => {
      sdkPromise = null;
      reject(new Error("PayPal SDK failed to load"));
    };
    document.head.appendChild(script);
  });

  return sdkPromise;
}

export default function PayPalButtons({ items, onSuccess }: PayPalButtonsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const onSuccessRef = useRef(onSuccess);
  const itemsRef = useRef(items);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    itemsRef.current = items;
  }, [onSuccess, items]);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId || clientId.startsWith("YOUR_")) {
      setStatus("error");
      setMessage(
        "PayPal is not configured. Add NEXT_PUBLIC_PAYPAL_CLIENT_ID to .env.local."
      );
      return;
    }

    let cancelled = false;
    let buttons: PayPalButtonsInstance | null = null;
    let observer: MutationObserver | null = null;

    (async () => {
      try {
        setStatus("loading");
        await loadSdk(clientId);
        if (cancelled || !containerRef.current || !window.paypal) return;

        buttons = window.paypal.Buttons({
          style: {
            layout: "vertical",
            color: "black",
            shape: "rect",
            label: "pay",
            height: 40
          },
          createOrder: async () => {
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items: itemsRef.current })
            });
            const data = await res.json();
            if (!res.ok || !data.id) {
              throw new Error(data?.error ?? "Failed to create PayPal order");
            }
            return data.id as string;
          },
          onApprove: async (approval) => {
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: approval.orderID })
            });
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data?.error ?? "Payment capture failed");
            }
            onSuccessRef.current({
              id: data.id,
              status: data.status,
              captureId: data.captureId ?? null
            });
          },
          onError: (err) => {
            const msg = err instanceof Error ? err.message : "Payment failed";
            setStatus("error");
            setMessage(msg);
          }
        });

        await buttons.render(containerRef.current);
        if (!cancelled) {
          setStatus("ready");
          injectDarkStyleIntoPayPalFrames(containerRef.current);
        }

        // Watch for PayPal re-injecting iframes
        observer = new MutationObserver(() => {
          if (containerRef.current) {
            injectDarkStyleIntoPayPalFrames(containerRef.current);
          }
        });
        if (containerRef.current) {
          observer.observe(containerRef.current, { childList: true, subtree: true });
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setMessage(err instanceof Error ? err.message : "PayPal failed to load");
        }
      }
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (buttons) {
        buttons.close().catch(() => {});
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="paypal-button-container"
        aria-busy={status === "loading"}
      />
      {status === "loading" && (
        <div className="mt-3 flex flex-col items-center gap-2">
          <div className="h-10 w-full animate-pulse rounded-xl bg-white/8" />
          <div className="h-10 w-full animate-pulse rounded-xl bg-white/8" />
        </div>
      )}
      {status === "error" && message && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-500/25 bg-red-500/8 p-4">
          <svg className="mt-0.5 shrink-0 text-red-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-xs font-semibold leading-5 text-red-300">{message}</p>
        </div>
      )}
    </div>
  );
}
