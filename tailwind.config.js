/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        sans: ['Sans', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        nunl: ['Nunlg', 'sans-serif'],
        bng: ['bng', 'sans-serif'],
        nuns: ['Nunsb', 'sans-serif'],
        mon : ['Mon', 'sans-serif']
      }
    },
  },
  plugins: [],
};
