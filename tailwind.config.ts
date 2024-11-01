import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        mobile: "430px",
      },
      backgroundImage: {
        "grad-bg": "url(/splash-bg.png)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        groteskBold: ["grotesk-bold", "sans-serif"],
        groteskSemiBold: ["grotesk-semibold", "sans-serif"],
        groteskRegular: ["grotesk-regular", "sans-serif"],
        groteskMedium: ["grotesk-medium", "sans-serif"],
        groteskLight: ["grotesk-light", "sans-serif"],
        fredokaBold: ["fredoka-bold", "sans-serif"],
        fredokaSemiBold: ["fredoka-semibold", "sans-serif"],
        fredokaRegular: ["fredoka-regular", "sans-serif"],
        fredokaMedium: ["fredoka-medium", "sans-serif"],
        fredokaLight: ["fredoka-light", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xs: ".75rem", // 12px
        sm: ".875rem", // 14px
        md: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "4rem", // 64px
        "7xl": "5rem", // 80px
        "8xl": "6rem", // 96px
        "9xl": "7rem", // 112px
        "10xl": "8rem", // 128px
        "11xl": "9rem", // 144px
        "12xl": "10rem", // 160px
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        xbold: "800",
        xxbold: "900",
      },
      boxShadow: {
        albumCoverShadow: "5px 5px 6px 0px rgba(0, 0, 0, 0.55)",
        vinylShadow: "0px 0px 6px 3px rgba(0, 0, 0, 0.55)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        cultureOrange: "var(--culture-orange)",
        cultureWhite: "var(--culture-white)",
        cultureBlue: "var(--culture-blue)",
        cultureRed: "var(--culture-red)",
        cultureGreen: "var(--culture-green)",
        cultureBeige: "var(--culture-beige)",
        cultureGray: "var(--culture-gray)",
        cultureGrayVariant: "var(--culture-gray-variant)",
        digitalArtYellow: "var(--digital-art-yellow)",
        irlEventBlue: "var(--irl-event-blue)",
        digitalMusicGreen: "var(--digital-music-green)",
        vinylBadgeLavender: "var(--vinyl-badge-lavender)",
        virtualEventPurple: "var(--virtual-event-purple)",
        apparelBlue: "var(--apparel-blue)",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
