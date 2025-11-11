/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,svelte,ts,js}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
