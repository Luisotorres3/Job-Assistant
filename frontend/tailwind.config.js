/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
          focus: "#3730A3",
        },
        secondary: "#F97316",
        accent: "#10B981",
        neutral: {
          light: "#F3F4F6",
          dark: "#1F2937",
        },
        danger: {
          DEFAULT: "#EF4444",
          hover: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
