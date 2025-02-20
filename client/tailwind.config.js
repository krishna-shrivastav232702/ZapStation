/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        pastelGreen:"#d4f7df",
        lightBlue:"#e8f7f9"
      }
    },
  },
  plugins: [],
}

