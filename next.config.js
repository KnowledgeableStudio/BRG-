/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 100],
    minimumCacheTTL: 60 * 60 * 24 * 30
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.paypal.com https://www.paypalobjects.com`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://api-m.sandbox.paypal.com https://api-m.paypal.com",
              "frame-src https://www.paypal.com https://www.paypalobjects.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://www.paypal.com"
            ].join("; ")
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
