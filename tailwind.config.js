module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      xs: { max: "325px" },
    },
    extend: {
      colors: {
        darkblack: "#222831",
        lightblack: "#3c434e",
        darkwhite: "#ffffff",
        lightwhite: "#f7fafc",
        darkgrey: "#787a91",
        lightgrey: "#9ba4b4",
        primaryoff: "#99feff",
        primarylight: "#385cf0",
        primarydark: "#1d4cb0",
        highlight: "#f7f0c2",
        warningoff: "#ff3838",
        discordBg: "#404eed",
      },

      fontFamily: {
        mainfont: ["Inter", "sans-serif"],
        codefont: ["Outfit", "sans-serif"],
        curlfont: ["Quicksand", "sans-serif"],
      },
    },
  },
  extend: {},
  plugins: [],
};
