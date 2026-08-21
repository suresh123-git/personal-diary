/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: {
          50: 'var(--color-parchment-50)',
          100: 'var(--color-parchment-100)',
          200: 'var(--color-parchment-200)',
          300: 'var(--color-parchment-300)',
          700: 'var(--color-parchment-700)',
          900: 'var(--color-parchment-900)',
        },
        gold: {
          400: 'var(--color-gold-400)',
          500: 'var(--color-gold-500)',
          600: 'var(--color-gold-600)',
        },
        house: {
          primary: 'var(--color-house-primary)',
          secondary: 'var(--color-house-secondary)',
          accent: 'var(--color-house-accent)',
          base: 'var(--color-house-base)',
        },
        surface: 'var(--color-surface)',
        background: 'var(--color-background)',
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        body: ['IM Fell English', 'Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        magical: '0 0 20px rgba(211, 166, 37, 0.25)',
        parchment: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 100px rgba(139, 90, 43, 0.15)',
        glow: '0 0 15px var(--color-gold-500)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        flicker: 'flicker 2s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
