/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        "fix-cert": {
          primary: "#2563eb",
          secondary: "#64748b",
          accent: "#0ea5e9",
          success: "#16a34a",
          warning: "#f59e0b",
          error: "#dc2626",
          info: "#0ea5e9",

          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e2e8f0",
          "base-content": "#0f172a",
        },
      },
      {
        "fix-cert-dark": {
          primary: "#3b82f6",
          secondary: "#94a3b8",
          accent: "#38bdf8",
          success: "#22c55e",
          warning: "#fbbf24",
          error: "#ef4444",
          info: "#38bdf8",

          "base-100": "#0f172a",
          "base-200": "#020617",
          "base-300": "#1e293b",
          "base-content": "#e5e7eb",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
}

