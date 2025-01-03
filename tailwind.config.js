/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Orbitron': ['Orbitron'],
        'Sora': ['Sora'],
      },
    },
    screens: {
      'Ipad': { max: '1200px' }, // Target screens up to 1200px wide
      'side-phone': { max: '700px' }, // Target screens up to 700px wide
      'phone': { max: '320px' }, // Target screens up to 500px wide 
    },
  },
  plugins: [],
}
