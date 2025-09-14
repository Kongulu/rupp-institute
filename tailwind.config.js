/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx,md}'],
  theme: {
extend: {
  colors: {
    brandRed:     '#f7000d',   // primary red
    brandRedDark: '#ab0009',   // deeper red
    brandPink:    '#ffbcc0',   // panels / light areas
    brandWhite:   '#ffffff',
    brandGray:    '#a5a5a5',
    borderFx:     '#ffe3e5',
  },
  backgroundImage: {
    'ri-gradient': 'linear-gradient(180deg, #f7000d 0%, #ab0009 100%)',
  },
  boxShadow: {
    panel: '0 10px 20px rgba(0,0,0,0.12)',
  },
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
  },
}

