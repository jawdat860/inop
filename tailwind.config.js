/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  darkMode : "class",
  theme: {
    extend: {
      container : {
        center : true,
        padding : {
          default : "1rem",
          sm : "3rem"
        }
      },
      colors: {
        primary: "#ffc001",
        secondary: "#ff9c01",
        dark: "#1e1e1e",
        light: "#f5f5f5",
      },
    },
  },
  plugins: [
  
  ],
}