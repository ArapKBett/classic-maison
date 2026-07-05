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
        bg: {
          DEFAULT: '#1A1A1A',
          surface: '#242424',
          elevated: '#2D2D2D',
        },
        gold: {
          light: '#F0D080',
          DEFAULT: '#C9A84C',
          dark: '#A07830',
        },
        ink: {
          DEFAULT: '#F0F0F0',
          muted: '#A0A0A0',
          faint: '#606060',
        },
        border: {
          DEFAULT: '#3A3A3A',
          subtle: '#2A2A2A',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F0D080 0%, #C9A84C 50%, #A07830 100%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.8) 60%, #1A1A1A 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
