const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      head: ["Poppins", "sans-serif"],
      sans: [
        '"Work Sans"',
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {
      colors: {
        background: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--background), ${opacityValue})`
            : `rgb(var(--background))`,
        foreground: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--foreground), ${opacityValue})`
            : `rgb(var(--foreground))`,
        headings: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--headings), ${opacityValue})`
            : `rgb(var(--headings))`,
        gray: colors.neutral,
        yellow: colors.yellow,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
