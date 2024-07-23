/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {

        "dark-primary": "#101010",
        "dark-secondary": "#2B2B2B",
        "dark-secondary-200": "#424242",
        "dark-secondary-300": "#5C5D61",
        "message-light": "#E4E5E7",
        "message-dark": "#374151",

        "light-secondary-200": "#E3E3E3",
        "light-secondary-300": "#898989",
        "light-primary": "#F7F7F7",
        "light-secondary": "#C5C5C5",
        "primary": "#101010",
        "secondary": "#2B2B2B",
        "secondary-200": "#424242",
        "secondary-300": "#5C5D61",
        "message": "#374151",
      }
    },
  },
  plugins: [],
}