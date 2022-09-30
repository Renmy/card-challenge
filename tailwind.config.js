/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vdarkviolet: "hsl(278, 68%, 11%)",
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
      },
      
    },
    screens: {
      mob: "360px",
      desktop: "1440px"
    },

    letterSpacing: {
      xwidest: '0.15em'
    },
    
    
  },
  plugins: [],
}
