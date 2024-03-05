/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      purple: '#803C9E',
      darkgray: '#9E9E9E',
      gray: '#F6F1F6',
      white: '#FCFCFC',
      fragole: '#F24156',
      yellow: '#FCC63D',
    },
    extend: {
      skew: {
        '45': '45deg',
        '20': '20deg',
      },
      fontFamily: {
        'mina': ['../fonts/Mina-Regular', 'Sans-Serif']
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

