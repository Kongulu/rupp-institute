/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx,md}'],
  theme: {
    extend: {
      colors: {
        brandRed:     '#97001A',   // deep Visily red (approx)
        brandRedDark: '#6E0013',   // gradient bottom (approx)
        brandPink:    '#FBE3E6',   // panel
        brandWhite:   '#FFFFFF',
        brandGray:    '#4B5563',
        borderFx:     '#E5E7EB',
      },
      backgroundImage: {
        'ri-gradient': 'linear-gradient(180deg, #97001A 0%, #6E0013 100%)',
      },
      boxShadow: {
        panel: '0 10px 20px rgba(0,0,0,0.12)',
      },
      fontSize: {
        'ri-hero':  ['3.25rem', { lineHeight: '1.05' }],
        'ri-giant': ['8rem',   { lineHeight: '1' }],
      }
    }
  },
  plugins: []
}
