/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a4b77',
          light: '#2260a0',
          dark: '#123452',
        },
        sky: {
          brand: '#00b4d8',
          light: '#48cae4',
          lighter: '#90e0ef',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2rem, 5vw, 3.25rem)', { lineHeight: '1.15', fontWeight: '700' }],
        'subhero': ['clamp(1.1rem, 2.5vw, 1.35rem)', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
}
