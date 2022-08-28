/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.js",
    "./components/*.*",
    './pages/**/*.*'
  ],
  plugins: [require('@tailwindcss/typography')],
}
