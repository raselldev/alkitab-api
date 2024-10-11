/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["night"]
  },
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: [require('daisyui')],
}