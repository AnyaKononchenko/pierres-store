/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'gothic': ['DotGothic16', 'sans-serif'],
        'sigmar': ['Sigmar', 'sans-serif'],
        'silkscreen': ['Silkscreen', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

