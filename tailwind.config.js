/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#f97316',
        muted: '#f1f5f9',
        destructive: '#ef4444',
      },
    },
  },
  plugins: [],
}
