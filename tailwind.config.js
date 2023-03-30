/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": 'rgba(255,255,255,0.18)',
        "black": '#000000',
        "skin": '#faaf5f',
        "sky-blue": '#03f4fc'
      }
    },
  },
  plugins: [],
}
