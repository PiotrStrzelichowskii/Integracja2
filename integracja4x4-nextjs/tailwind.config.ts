import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
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
      fontFamily: {
        'staatliches': ['var(--font-staatliches)', 'cursive'],
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'roboto-slab': ['var(--font-roboto-slab)', 'serif'],
        'headline': ['var(--font-space-grotesk)', 'sans-serif'],
        'body': ['var(--font-manrope)', 'sans-serif'],
        'label': ['var(--font-manrope)', 'sans-serif'],
      },
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
        /* Custom offroad colors */
        mudDark: "hsl(var(--mud-dark))",
        mudMedium: "hsl(var(--mud-medium))",
        sandLight: "hsl(var(--sand-light))",
        sandDark: "hsl(var(--sand-dark))",
        rustOrange: "hsl(var(--rust-orange))",
        rustOrangeDark: "hsl(var(--rust-orange-dark))",
        
        /* Redesign token colors */
        'on-surface': '#e5e2e1',
        'on-background': '#e5e2e1',
        'surface-container': '#201f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353534',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-low': '#1c1b1b',
        'surface-bright': '#393939',
        'surface-dim': '#131313',
        'surface-variant': '#353534',
        'primary-container': '#f16523',
        'on-primary-container': '#4f1700',
        'on-primary': '#5a1c00',
        'primary-fixed': '#ffdbce',
        'primary-fixed-dim': '#F16523',
        'on-primary-fixed': '#370e00',
        'on-primary-fixed-variant': '#7f2b00',
        'secondary-container': '#4c4942',
        'on-secondary-container': '#bdb8af',
        'on-secondary': '#33302a',
        'secondary-fixed': '#e8e2d9',
        'secondary-fixed-dim': '#cbc6bd',
        'on-secondary-fixed': '#1d1b16',
        'on-secondary-fixed-variant': '#494640',
        'outline-variant': '#594138',
        'on-surface-variant': '#e1bfb3',
        'surface-tint': '#ffb599',
        'inverse-surface': '#e5e2e1',
        'inverse-on-surface': '#313030',
        'inverse-primary': '#a63b00',
        'tertiary-container': '#929090',
        'on-tertiary-container': '#2a2a2a',
        'on-tertiary': '#313030',
        'tertiary-fixed': '#e5e2e1',
        'tertiary-fixed-dim': '#c8c6c5',
        'on-tertiary-fixed': '#1c1b1b',
        'on-tertiary-fixed-variant': '#474746',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',
        'on-error': '#690005',

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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

