/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        'aureolin': ['Aureolin', 'sans'],
      },
    },
  },
  plugins: [],
}

