/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2F3A8F",
          dark: "#1F2A72",
          mid: "#3F4BC1",
          light: "#EEF1FF",
          subtle: "#F4F6FF",
          border: "#D9DDF3",
        },

        success: "#16a34a",
        warning: "#f59e0b",
        error: "#dc2626",
        info: "#0ea5e9",

        background: {
          DEFAULT: "#ffffff",
          muted: "#f8fafc",
          subtle: "#f1f5f9",
        },

        text: {
          DEFAULT: "#0f172a",
          muted: "#64748b",
          light: "#94a3b8",
        },

        borderColor: {
          DEFAULT: "#e2e8f0",
        },
      },
    },
  },

  plugins: [],
};