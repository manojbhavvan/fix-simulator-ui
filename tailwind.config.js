/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        /* ========= BRAND (Premium SaaS Accent) ========= */
        brand: {
          DEFAULT: "#2F3A8F",      // Light mode brand
          dark: "#4F7BFF",         // Bright SaaS blue for dark mode
          mid: "#3F4BC1",
          light: "#EEF1FF",
          subtle: "#F4F6FF",
          border: "#D9DDF3",
        },

        /* ========= STATUS COLORS ========= */
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",

        /* ========= LIGHT THEME ========= */
        background: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAFC",
          subtle: "#F1F5F9",
        },

        text: {
          DEFAULT: "#0F172A",
          muted: "#64748B",
          light: "#94A3B8",
        },

        borderColor: {
          DEFAULT: "#E2E8F0",
        },

        /* ========= DARK THEME (Premium SaaS) ========= */

        // App background layers
        darkBackground: {
          DEFAULT: "#0B1220",   // Deep navy app background
          muted: "#111A2E",     // Card background
          subtle: "#16223A",    // Table headers / hover states
        },

        // Typography hierarchy
        darkText: {
          DEFAULT: "#E6EDF7",   // Primary readable text
          muted: "#A8B5CC",     // Secondary text (better contrast)
          light: "#7C8DA6",
        },

        // Borders & separators
        darkBorder: {
          DEFAULT: "#1E2A44",   // Visible but subtle
        },
      },
    },
  },

  plugins: [],
};