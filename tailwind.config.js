/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0f172a", // 深蓝色背景
        neonGreen: "#00ffcc",
        cyberBlue: "#00bfff",
      },
    },
  },
  plugins: [],
};
