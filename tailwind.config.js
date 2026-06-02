/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        gothic: ['Bebas Neue', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        orange: {
          glow: '#FF6B00',
          bright: '#FF8C00',
          dim: '#CC5500',
        },
        dark: {
          void: '#030303',
          deep: '#080808',
          surface: '#0D0D0D',
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'glitch': 'glitch 0.3s steps(2, end) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,107,0,0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(255,107,0,0.9), 0 0 100px rgba(255,107,0,0.4)' },
        },
        glitch: {
          '0%': { clipPath: 'inset(40% 0 61% 0)', transform: 'translate(-2px, 0)' },
          '25%': { clipPath: 'inset(92% 0 1% 0)', transform: 'translate(2px, 0)' },
          '50%': { clipPath: 'inset(43% 0 1% 0)', transform: 'translate(-1px, 0)' },
          '75%': { clipPath: 'inset(25% 0 58% 0)', transform: 'translate(1px, 0)' },
          '100%': { clipPath: 'inset(54% 0 7% 0)', transform: 'translate(-2px, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
