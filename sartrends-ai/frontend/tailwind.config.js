/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        dark: {
          900: '#0a0a0f',
          800: '#0f0f23',
          700: '#1a1a2e',
          600: '#16213e',
        }
      },
    },
  },
  plugins: [],
}

