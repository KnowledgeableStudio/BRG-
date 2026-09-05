const ENV = (process.env.PAYPAL_ENV ?? "sandbox").toLowerCase();
const IS_LIVE = ENV === "live";

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const DEFAULT_API_BASE = IS_LIVE
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

const API_BASE = process.env.PAYPAL_API_BASE ?? DEFAULT_API_BASE;

export function getPayPalApiBase() {
  return API_BASE;
}

export function isPayPalLive() {
  return IS_LIVE;
}

export function assertPayPalConfigured() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "PayPal is not configured. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env.local"
    );
  }
  return { clientId: CLIENT_ID, clientSecret: CLIENT_SECRET };
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function fetchAccessToken(): Promise<string> {
  const { clientId, clientSecret } = assertPayPalConfigured();

  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[paypal] auth failed:", res.status, text);
    cachedToken = null;
    throw new Error("PayPal authentication failed");
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  const expiresAt = Date.now() + Math.max(0, (data.expires_in - 60) * 1000);
  cachedToken = { token: data.access_token, expiresAt };
  return cachedToken.token;
}

export async function paypalFetch(path: string, init: RequestInit = {}) {
  const token = await fetchAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {})
    },
    cache: "no-store"
  });
  return res;
}
