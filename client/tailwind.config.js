import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#6D4AFF",
          700: "#5B36D9",
          800: "#4527A0",
          900: "#24134F",
        },

        secondary: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#22C1C3",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },

        pink: {
          50: "#FDF4FF",
          100: "#FAE8FF",
          200: "#F5D0FE",
          300: "#F0ABFC",
          400: "#E879F9",
          500: "#D946EF",
          600: "#C026D3",
          700: "#A21CAF",
        },

        navy: {
          900: "#17164B",
          800: "#211B5B",
          700: "#312E81",
        },
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },

      boxShadow: {
        soft: "0 10px 35px rgba(91, 54, 217, 0.08)",
        card: "0 12px 35px rgba(36, 19, 79, 0.08)",
        purple: "0 10px 30px rgba(109, 74, 255, 0.25)",
      },

      backgroundImage: {
        "purple-gradient":
          "linear-gradient(135deg, #24134F 0%, #4527A0 55%, #6D4AFF 100%)",

        "button-gradient":
          "linear-gradient(135deg, #6D4AFF 0%, #8B5CF6 100%)",

        "soft-gradient":
          "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 50%, #FDF4FF 100%)",

        "teal-gradient":
          "linear-gradient(135deg, #22C1C3 0%, #0D9488 100%)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },

  plugins: [typography],
};