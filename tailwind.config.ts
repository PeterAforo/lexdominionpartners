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
          50: '#F5F5F4',
          100: '#E5E5E3',
          200: '#C8C8C5',
          300: '#A3A3A0',
          400: '#737370',
          500: '#4A4A47',
          600: '#3A3A38',
          700: '#2D2D2B',
          800: '#1F1F1D',
          900: '#141413',
          DEFAULT: '#2D2D2B',
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
  plugins: [require('@tailwindcss/typography')],
}

export default config
