/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A4D1A',
          DEFAULT: '#0A4D1A',
          neon: '#2FE85F',
          accent: '#2FE85F',
          night: '#111827',
          white: '#FFFFFF',
          soft: '#DCEFE1',
        },
        sidebar: {
          dark: '#0A4D1A', // Deep Forest Pine Green from palette
          active: '#073612', // Darker active tab background
          border: '#0e5f22',
          highlight: '#2FE85F',
          text: '#FFFFFF',
          muted: '#DCEFE1',
        },
        lime: {
          400: '#2FE85F', // Primary vibrant neon green
          500: '#28cf54',
          hover: '#22b647',
        },
        canvas: {
          light: '#f4f8f5',
          dark: '#111827',
        },
        card: {
          light: '#ffffff',
          dark: '#111827',
        },
      },
      fontFamily: {
        sans: ['Manrope Variable', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Manrope Variable', 'sans-serif'],
      },
      boxShadow: {
        'card-soft': '0 2px 12px -2px rgba(0, 0, 0, 0.05)',
        'neon-glow': '0 0 15px rgba(47, 232, 95, 0.35)',
      }
    },
  },
  plugins: [],
}
