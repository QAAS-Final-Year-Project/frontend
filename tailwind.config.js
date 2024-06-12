/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

// text-stone-500 = #666,
// text-zinc-800 = #333,

module.exports = {
  darkMode: "class",

  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))'
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: [
          'Manrope',
          'Nunito',
          'Inter',
          ...defaultTheme.fontFamily.sans
        ],
        display: ['Nunito  ', ...defaultTheme.fontFamily.sans],
    },
      colors: {
        primary: {
          "100": "#D4DBFD",
          "200": "#A9B7FC",
          "300": "#7E90F8",
          "400": "#5D70F1",
          "500": "#2A41E8",
          "600": "#1E31C7",
          "700": "#1523A7",
          "800": "#0D1786",
          "900": "#080F6F",
        }


      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
}