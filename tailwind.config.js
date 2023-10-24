/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#dcdcdc',
        'blue-violet': {
          '50': '#f0f3fd',
          '100': '#e3eafc',
          '200': '#cdd7f8',
          '300': '#afbcf2',
          '400': '#8e9aeb',
          '500': '#7378e1',
          '600': '#5b58d3',
          '700': '#534ebc',
          '800': '#3f3d96',
          '900': '#383778',
          '950': '#222046',
        },
      },
      boxShadow: {
        'header': '1px 6px 12px 0px rgba(212,212,212,0.27)',
      },
    },
  },
  plugins: [],
}