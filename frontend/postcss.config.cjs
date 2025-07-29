module.exports = {
  plugins: [
    require("@tailwindcss/postcss")(), // 👈 obligatorio en Tailwind v4+
    require("autoprefixer"),
  ],
};
