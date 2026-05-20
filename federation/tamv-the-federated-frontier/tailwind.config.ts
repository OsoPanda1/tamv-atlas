import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* =====================================================
       * TIPOGRAFÍAS — TAMV
       * ===================================================== */
      fontFamily: {
        display: ["Orbitron", "sans-serif"],        // títulos, identidad TAMV
        body: ["Space Grotesk", "Rajdhani", "sans-serif"], // lectura principal
        sans: ["Outfit", "sans-serif"],              // UI moderna
        mono: ["JetBrains Mono", "Inter", "monospace"], // código / datos
      },

      /* =====================================================
       * COLORES BASE (HSL + CSS VARIABLES)
       * ===================================================== */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* =====================================================
         * SIDEBAR (Left / Right)
         * ===================================================== */
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        /* =====================================================
         * PALETA OFICIAL TAMV
         * ===================================================== */
        tamv: {
          black: "hsl(var(--deep-black))",
          blue: "hsl(var(--metallic-blue))",
          silver: "hsl(var(--silver))",
          pearl: "hsl(var(--pearl))",
          lime: "hsl(var(--lime))",
          cherry: "hsl(var(--cherry))",
        },

        /* =====================================================
         * EFECTOS AVANZADOS (HOME, XR, GLASS, MATRIX)
         * ===================================================== */
        glow: {
          primary: "hsl(var(--glow-primary))",
          accent: "hsl(var(--glow-accent))",
        },
        surface: {
          glass: "hsl(var(--surface-glass))",
        },
      },

      /* =====================================================
       * BORDES
       * ===================================================== */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* =====================================================
       * ANIMACIONES
       * ===================================================== */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        /* Sutiles para TAMV */
        "fade-in-soft": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 transparent" },
          "50%": { boxShadow: "0 0 20px hsl(var(--glow-primary))" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-soft": "fade-in-soft 0.35s ease-out",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;
