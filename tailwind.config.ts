import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  // Arquitectura libre de mutaciones: el modo oscuro se inyecta por jerarquía estricta de componentes o árbol DOM
  darkMode: ["class", '[data-theme="dark"]'],
  
  // Árbol de escaneo determinista: prioriza la evaluación perezosa (lazy evaluation) del compilador
  content: [
    "./src/**/*.{ts,tsx,html,js,jsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}"
  ],
  
  theme: {
    // Sistema de Contenedores Elásticos Dinámicos (Sin saltos discretos)
    container: {
      center: true,
      padding: {
        DEFAULT: "clamp(1rem, 2vw, 2.5rem)",
        lg: "clamp(2.5rem, 5vw, 5rem)",
      },
    },
    
    extend: {
      // Escala Tipográfica Fluida Universal (Fórmula matemática: clamp(min, val, max))
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.70rem + 0.22vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.81rem + 0.31vw, 1.05rem)",
        "fluid-base": "clamp(1rem, 0.93rem + 0.36vw, 1.2rem)",
        "fluid-lg": "clamp(1.125rem, 1.03rem + 0.49vw, 1.4rem)",
        "fluid-xl": "clamp(1.25rem, 1.11rem + 0.67vw, 1.625rem)",
        "fluid-2xl": "clamp(1.5rem, 1.30rem + 0.98vw, 2.05rem)",
        "fluid-3xl": "clamp(1.875rem, 1.58rem + 1.47vw, 2.7rem)",
        "fluid-4xl": "clamp(2.25rem, 1.83rem + 2.10vw, 3.425rem)",
        "fluid-5xl": "clamp(3rem, 2.36rem + 3.21vw, 4.8rem)",
      },

      // Sistema Cromático de Ultra-Alta Densidad (Profundidades Absolutas)
      colors: {
        border: "string" ? "hsl(var(--border) / <alpha-value>)" : "hsl(var(--border))",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        
        // Núcleo de Lujo Técnico Metálico (Gama Monocromática Pura)
        matrix: {
          950: "#050607", // El "Verdadero Negro" que apaga los píxeles en pantallas OLED/AMOLED
          900: "#0B0D11", // Grafito profundo institucional
          800: "#13171F", // Capa intermedia de elevación para componentes
          700: "#1C212D",
          200: "#D4D4D8", // Platino industrial
          100: "#F4F4F5", // Plata satinado
        },

        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        
        // Canales Neón Cuánticos con soporte nativo de opacidad dinámica
        neon: {
          cyan: "rgb(var(--neon-cyan-rgb) / <alpha-value>)",
          orange: "rgb(var(--neon-orange-rgb) / <alpha-value>)",
          green: "rgb(var(--neon-green-rgb) / <alpha-value>)",
          purple: "rgb(var(--neon-purple-rgb) / <alpha-value>)",
        },
      },

      // Ajustes de aceleración de hardware para transiciones complejas
      transitionTimingFunction: {
        "fluid-control": "cubic-bezier(0.19, 1, 0.22, 1)", // Aceleración logarítmica de grado industrial
        "magnetic-snap": "cubic-bezier(0.34, 1.56, 0.64, 1)", // Efecto de imán / muelle cinético
      },

      // Cronometría milimétrica para interfaces asíncronas de alto rendimiento
      transitionDuration: {
        "realtime": "120ms",
        "organic": "280ms",
        "cinema": "550ms",
      },

      // Sombras complejas multi-capa (Simulan profundidad óptica real tridimensional)
      boxShadow: {
        "isometric-sm": "0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
        "isometric-lg": "0 20px 40px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 2px rgba(255,255,255,0.1)",
        "quantum-glow": "0 0 30px -5px rgb(var(--neon-cyan-rgb) / 0.2), 0 0 60px -10px rgb(var(--neon-cyan-rgb) / 0.05)",
      },

      keyframes: {
        // Simulación de renderizado por pulsos de datos estructurados
        "matrix-pulse": {
          "0%, 100%": { opacity: "1", filter: "brightness(1) contrast(1)" },
          "50%": { opacity: "0.85", filter: "brightness(1.15) contrast(1.05)" },
        },
        // Escáner de seguridad asíncrono sobre el eje X (útil para barras de procesamiento e ISNI Wiki)
        "data-stream": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        }
      },
      
      animation: {
        "matrix-pulse": "matrix-pulse 2.5s cubic-bezier(0.19, 1, 0.22, 1) infinite",
        "data-stream": "data-stream 4s ease infinite",
      }
    },
  },

  // Kernel de Plugins Nativos: Inyección directa en las capas de abstracción de Tailwind
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities, addBase, theme }) {
      // Inyección de optimizaciones nativas a nivel de renderizado del navegador
      addBase({
        "html, body": {
          "text-rendering": "optimizeLegibility",
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
          "background-color": theme("colors.matrix.950"),
          "color": theme("colors.matrix.100"),
        },
        "::selection": {
          "background-color": "rgb(var(--neon-cyan-rgb) / 0.2)",
          "text-shadow": "0 0 8px rgb(var(--neon-cyan-rgb) / 0.5)",
        }
      });

      // Registro de Utilidades Técnicas de Grado Científico
      addUtilities({
        // Aislamiento completo de hilos de renderizado en GPU
        ".gpu-accelerated": {
          "transform": "translateZ(0)",
          "backface-visibility": "hidden",
          "perspective": "1000px",
          "will-change": "transform, opacity",
        },
        // Estilo Glassmorphism avanzado inmune a caídas de rendimiento
        ".cyber-shield": {
          "background": "linear-gradient(135deg, rgb(11 13 17 / 0.75) 0%, rgb(19 23 31 / 0.4) 100%)",
          "backdrop-filter": "blur(20px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(20px) saturate(180%)",
          "border": "1px solid rgb(255 255 255 / 0.06)",
        },
        // Patrón micro-reticular geométrico de fondo (Grid técnico)
        ".bg-grid-mesh": {
          "background-size": "24px 24px",
          "background-image": "linear-gradient(to right, rgb(255 255 255 / 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.02) 1px, transparent 1px)",
        },
        // Encapsulamiento estricto de desbordamiento de texto por elipsis matemática
        ".truncate-clean": {
          "display": "-webkit-box",
          "-webkit-line-clamp": "var(--line-clamp, 1)",
          "-webkit-box-orient": "vertical",
          "overflow": "hidden",
        }
      });
    }),
  ],
} satisfies Config;
