/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      colors: {
        rf: {
          green: '#1D9E75',
          'green-dark': '#0F6E56',
          'green-light': '#E1F5EE',
          purple: '#534AB7',
          'purple-dark': '#3C3489',
          'purple-light': '#EEEDFE',
          orange: '#D85A30',
          'orange-light': '#FAECE7',
          amber: '#BA7517',
          'amber-light': '#FAEEDA',
          blue: '#185FA5',
          'blue-light': '#E6F1FB',
        },
      },
    },
  },
  plugins: [],
}
