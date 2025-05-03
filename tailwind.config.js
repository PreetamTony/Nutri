/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefbee',
          100: '#d6f5d6',
          200: '#b0e9b0',
          300: '#7fd67f',
          400: '#4CAF50',
          500: '#3a9c3d',
          600: '#2d7e30',
          700: '#266429',
          800: '#225024',
          900: '#1c3e1d',
        },
        secondary: {
          50: '#edf8ff',
          100: '#d6ecff',
          200: '#b3d9ff',
          300: '#85bfff',
          400: '#4a94ff',
          500: '#2970ff',
          600: '#1b4df9',
          700: '#1a3de9',
          800: '#1a33bd',
          900: '#192f94',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd6',
          200: '#ffdead',
          300: '#ffc678',
          400: '#ffa53f',
          500: '#FF9800',
          600: '#e67700',
          700: '#bf5c00',
          800: '#9a4703',
          900: '#7e3c09',
        },
        success: {
          400: '#4CAF50',
          500: '#3a9c3d',
        },
        warning: {
          400: '#FFC107',
          500: '#e5ac00',
        },
        error: {
          400: '#F44336',
          500: '#d82c1e',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f2f4f7',
          200: '#e4e7ec',
          300: '#d0d5dd',
          400: '#9da4b0',
          500: '#667085',
          600: '#4d5464',
          700: '#384152',
          800: '#202939',
          900: '#121926',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Lexend"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};