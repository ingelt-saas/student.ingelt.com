module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-blue": "#0064E1",
        "light-blue": "#4396FF",
        "main-dark-bg": "rgb(0,0,0,1)",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      colors: {
        'dark-gray': '#E5E7EB',
        'gray': "#7A7C88",
        'blue': "#0064E1",
        'light-blue': "#4396FF"
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      }
    },
    keyframes: {
      "shimmer": {
        "100%": {
          "transform": "translateX(100%)",
        },
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'foo': '900px', // new breakpoint
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
  },
  plugins: [],
};
