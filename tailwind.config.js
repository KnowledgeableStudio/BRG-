/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brg: {
          black: "#0b0b0f",
          panel: "#11121a",
          blue: "#00AEEF",
          ice: "#dff7ff",
          smoke: "#8c94a7"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        display: ["var(--font-space)", "Space Grotesk", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 174, 239, 0.35)",
        "glow-strong": "0 0 70px rgba(0, 174, 239, 0.55)"
      },
      backgroundImage: {
        "scan-grid":
          "linear-gradient(rgba(0,174,239,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,.08) 1px, transparent 1px)"
      },
      animation: {
        "slow-spin": "slow-spin 16s linear infinite",
        "pulse-glow": "pulse-glow 2.8s ease-in-out infinite",
        "float-soft": "float-soft 5s ease-in-out infinite"
      },
      keyframes: {
        "slow-spin": {
          to: {
            transform: "rotate(360deg)"
          }
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.45",
            transform: "scale(1)"
          },
          "50%": {
            opacity: "0.9",
            transform: "scale(1.08)"
          }
        },
        "float-soft": {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)"
          },
          "50%": {
            transform: "translate3d(0, -18px, 0)"
          }
        }
      }
    }
  },
  plugins: []
};
