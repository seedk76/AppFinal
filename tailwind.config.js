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
          DEFAULT: '#FF4E62',
          dark: '#FF3349',
          light: '#FF7A89',
        },
        secondary: {
          DEFAULT: '#1E2022',
          light: '#52616B',
        },
        background: {
          DEFAULT: '#F9F9F9',
          card: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}