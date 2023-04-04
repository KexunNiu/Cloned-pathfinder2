/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFC107',       // MD Amber 500
        primaryDark: '#FFA000',   // MD Amber 700
        secondary: '#2196F3',     // MD Blue 500
        secondaryDark: '#1976D2', // MD Blue 700
        info: '#4CAF50',          // MD Green 500
        infoDark: '#388E3C',      // MD Green 700
        warning: '#FF9800',       // MD Orange 500
        warningDark: '#F57C00',   // MD Orange 700
        error: '#F44336',         // MD Red 500
        errorDark: '#D32F2F',     // MD Red 700
        lighter: '#F9F9F9',
        main: '#2E3538',
        grey: '#e2e8f0',
        content: '#2e353880',
      },
    },
  },
  plugins: [],
};
