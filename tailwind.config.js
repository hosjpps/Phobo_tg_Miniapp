/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C41E3A',
          50: '#FDF2F4',
          100: '#FCE5E9',
          200: '#F8CCD3',
          300: '#F4A3B0',
          400: '#ED6B80',
          500: '#C41E3A',
          600: '#B01A34',
          700: '#8F152A',
          800: '#751220',
          900: '#5E0F1A',
        },
        secondary: {
          DEFAULT: '#FF8C42',
          50: '#FFF5ED',
          100: '#FFEAD9',
          200: '#FFD5B3',
          300: '#FFB87A',
          400: '#FF8C42',
          500: '#FF6F1E',
          600: '#E55A0A',
          700: '#BD4609',
          800: '#96370B',
          900: '#7A2F0C',
        },
        accent: {
          DEFAULT: '#D4AF37',
          50: '#FCF9ED',
          100: '#F9F1D0',
          200: '#F3E2A1',
          300: '#EBCE69',
          400: '#D4AF37',
          500: '#C59F2E',
          600: '#AA7D24',
          700: '#8A5F20',
          800: '#724C21',
          900: '#603F20',
        },
        background: '#FFF8F0',
        text: {
          DEFAULT: '#3E2723',
          light: '#8D6E63',
        },
        neutral: {
          DEFAULT: '#F5F5F5',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E0E0E0',
          300: '#BDBDBD',
          400: '#9E9E9E',
          500: '#757575',
        },
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        border: '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'modal': '0 8px 32px rgba(0, 0, 0, 0.16)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-light': 'bounceLight 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}
