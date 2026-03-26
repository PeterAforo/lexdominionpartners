import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF7E8',
          100: '#F5ECCC',
          200: '#E8D48B',
          300: '#DBBF5C',
          400: '#C5A54E',
          500: '#A38A3B',
          600: '#8A7432',
          700: '#6B5A27',
          800: '#4D401C',
          900: '#2E2611',
          DEFAULT: '#C5A54E',
        },
        navy: {
          50: '#E8ECF2',
          100: '#C5CDD9',
          200: '#8E9DB5',
          300: '#5A6F91',
          400: '#2D4570',
          500: '#1B2A4A',
          600: '#162240',
          700: '#111A33',
          800: '#0F1B2D',
          900: '#0A1220',
          DEFAULT: '#1B2A4A',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        accent: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
