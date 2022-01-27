module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-cl)",
        success: "var(--sucess-cl)",
        danger: "var(--danger-cl)",
        warning: "var(--warning-cl)",
        dark: "var(--dark-cl)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
