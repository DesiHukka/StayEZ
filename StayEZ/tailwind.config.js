/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "460px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
