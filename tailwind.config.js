/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        text: "var(--color-text)",
        background: "var(--color-background)",
        "logo-primary": "var(--color-logo-primary)",
        "logo-stroke": "var(--color-logo-stroke)",
        "text-stroke": "var(--color-text-stroke)",
        'sidebar':   'var(--color-sidebar)',
        'card':      'var(--color-card)',
        'panel':     'var(--color-panel)',
        'cream-50':  'var(--color-cream-50)',
        'cream-100': 'var(--color-cream-100)',
        'cream-200': 'var(--color-cream-200)',
        'cream-300': 'var(--color-cream-300)',
        'cream-400': 'var(--color-cream-400)',
        'cream-500': 'var(--color-cream-500)',
      },
    },
  },
  plugins: [],
};
