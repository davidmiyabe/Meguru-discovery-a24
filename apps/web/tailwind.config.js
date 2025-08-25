/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#0D3B2E',
        cream: '#FAF7F1',
        gold: '#D6A14D',
        border: '#E6E1D9',
        // Dark base used for text on light backgrounds and night-themed elements
        night: '#1A202C',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
