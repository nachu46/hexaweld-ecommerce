/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Monochrome palette taken from the Jaza Trading logo (black on white)
      colors: {
        'brand-primary': '#111111',
        'brand-hover': '#333333',
        'brand-dark': '#111111',
        'brand-text': '#737373',
        'brand-border': '#E5E5E5',
        'brand-bg': '#F5F5F5',
        'hex-dark': '#111111',
        'hex-text': '#737373',
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['Poppins', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0,0,0,0.06)',
        'card-lg': '0 8px 24px rgba(0,0,0,0.08)',
        'nav': '0 1px 0 #E5E5E5',
        'orange': '0 1px 2px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
