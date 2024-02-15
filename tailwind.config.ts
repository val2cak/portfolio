/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      50: '50px',
      16: '4rem',
    },
    screens: {
      sm: { max: '767px' },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: '768px', max: '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: '1024px', max: '1279px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: '1280px', max: '1535px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': { min: '1536px' },
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        minecraft: ['Minecraft', 'sans-serif'],
        firaCode: ['Fira Code', 'monospace'],
      },

      colors: {
        dark: '#1F1F1F',
        light: '#F8F7F9',
        yellow: '#DBEE49',
        blue: '#417588',
        purple: '#9747FF',
        orange: '#E68D33',
        green: '#00AC00',
        red: '#F21B3F',
      },
      backgroundImage: () => ({
        mario: "url('/images/mario.png')",
        marioMobile: "url('/images/mario-mobile.png')",
      }),
      lineHeight: {
        3: '1.2rem',
        4: '1.6rem',
        5: '2.0rem',
        6: '2.4rem',
        7: '2.8rem',
        8: '3.2rem',
        9: '3.6rem',
        10: '4.0rem',
        11: '4.5rem',
        12: '5rem',
      },
      fontSize: {
        xs: ['12px'],
        sm: ['16px'],
        base: ['20px'],
        md: ['24px'],
        lg: ['28px'],
        xl: ['32px'],
        '2xl': ['36px'],
        '4xl': ['44px'],
        '5xl': ['52px'],
        '8xl': ['84px'],
      },
      borderWidth: {
        default: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
        50: '50px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
