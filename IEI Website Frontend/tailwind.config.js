/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'iei-blue': '#1e3a8a',
        'iei-cyan': '#06b6d4',
        'iei-magenta': '#ec4899',
        'iei-orange': '#f97316',
        'iei-dark': '#374151',
        'iei-navy': '#1e40af',
      },
      animation: {
        'slow-pan': 'pan 60s linear infinite',
      },
      keyframes: {
        pan: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-10%, -10%)' }
        }
      }
    },
  },
  plugins: [],
}
