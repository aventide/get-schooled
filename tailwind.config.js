module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        board: {
          primary: "#60a5fa",
          neutral: "#3d4451",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#dbeafe",
        }
      }
    ]
  },
  theme: {
    extend: {
      animation: {
        'pulse-slow': "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      spacing: {
        'screen': '100vh'
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
        '10000': '10000ms',
        '15000': '15000ms',
        '20000': '20000ms',
      }
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      fancy: ['RubikMonoOne', 'sans-serif'],
      sspRegular: ['SourceSansPro-Regular', 'sans-serif']
    },
    screens: {
      'sm': '500px',
      'md': '520px',
      'lg': '900px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [
    require('daisyui')
  ],
}