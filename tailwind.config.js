/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f4f4fb',
          100: '#e9e9f6',
          200: '#d4d3ee',
          300: '#bebde5',
          400: '#a9a7df',
          500: '#9391d9', // Ваш базовий колір
          600: '#7674d0',
          700: '#5b58c7',
          800: '#4a48b0',
          900: '#3c3a8f',
          950: '#27265a',
        },
      },
    },
  },
  plugins: [],
}
