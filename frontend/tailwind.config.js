/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FCFBF9',
          100: '#FAF8F5',
          200: '#F4F1EA',
          300: '#E8E3D8',
          400: '#D5CDBF',
          800: '#2C2B29',
          900: '#1A1918',
        },
        accent: {
          blue: '#1D4ED8',
          emerald: '#059669',
          amber: '#D97706',
          rose: '#E11D48',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'paper-sm': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        'paper-md': '0 4px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)',
        'paper-lg': '0 10px 25px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.02)',
      }
    },
  },
  plugins: [],
}
