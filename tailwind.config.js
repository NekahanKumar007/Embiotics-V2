/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'swal-center': 'swal-center 0.3s',
      },
      keyframes: {
        'swal-center': {
          '0%, 100%': { transform: 'translateY(-50%)' },
          '50%': { transform: 'translateY(-55%)' },
        },
      },
      colors: {
        "dark-purple": "#081A51",
        "dark-blue": "rgb(6,72,98)",
        "pink": "rgb(209,17,120)",
        "light-white": 'rgba(255,255,255,0.18)',
        "black": '#000000',
        "skin": '#faaf5f',
        "sky-blue": '#03f4fc'
      }
    },
  },
  plugins: [],
}
