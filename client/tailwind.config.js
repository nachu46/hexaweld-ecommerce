/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hex-orange': '#F97316',
        'hex-hover': '#FB923C',
        'hex-dark': '#0F172A',
        'hex-text': '#64748B',
        'hex-border': '#E2E8F0',
        'hex-bg': '#F8FAFC',
        'hex-navy': '#1E293B',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
