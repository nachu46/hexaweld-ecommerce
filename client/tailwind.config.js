/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#007AFF', // Apple Blue
        'brand-hover': '#005BB5',
        'brand-dark': '#1D1D1F',
        'brand-text': '#86868B',
        'brand-border': '#D2D2D7',
        'brand-bg': '#F5F5F7',
        'hex-dark': '#0F172A',
        'hex-text': '#64748B',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Helvetica Neue"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)',
        'card-lg': '0 10px 40px rgba(0,0,0,0.10)',
        'nav': '0 1px 0 #E2E8F0, 0 4px 20px rgba(0,0,0,0.04)',
        'orange': '0 4px 14px rgba(249,115,22,0.35)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
