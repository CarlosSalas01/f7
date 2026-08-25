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
        sidebar: {
          dark: '#032e22', // Deep Forest Pine Green from screenshot
          active: '#527a14', // Olive/Lime Active Tab background
          text: '#e2e8f0',
          muted: '#94a3b8',
        },
        lime: {
          400: '#a3e635', // Primary Lime Action Button
          500: '#84cc16',
          hover: '#93c5fd',
        },
        canvas: '#f3f6f9', // Soft light gray content background
        card: '#ffffff',
      },
      fontFamily: {
        sans: ['Manrope Variable', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Manrope Variable', 'sans-serif'],
      },
      boxShadow: {
        'card-soft': '0 2px 12px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
