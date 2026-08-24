/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'royal-iris': '#2e0585',
        'bloom-violet': '#7532e4',
        'lavender-sky': '#986fe9',
        periwinkle: '#d3a1ff',
        'heritage-blue': '#032dc5',
        'morning-azure': '#0d72ea',
        'sunset-garden': '#fe9400',
        'golden-orange': '#fea900',
        ink: '#0f0524',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2e0585 0%, #7532e4 100%)',
        'gradient-light': 'linear-gradient(135deg, #986fe9 0%, #ffffff 100%)',
      },
      fontFamily: {
        // TODO(fonts): swap to Founders Grotesk once the licensed webfont
        // files arrive from the agency — see src/index.css for the single
        // @font-face swap point.
        sans: [
          'General Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      fontSize: {
        base: ['1.0625rem', { lineHeight: '1.65' }], // 17px
        body: ['1.125rem', { lineHeight: '1.65' }], // 18px
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        // 'both' (not just 'forwards') so a delayed instance stays hidden
        // during its delay instead of flashing visible then disappearing.
        'fade-rise': 'fade-rise 1s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
