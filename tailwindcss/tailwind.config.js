const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        mono: ["PT Mono", ...fontFamily.mono],
      },
    },
  },
  variants: {},
  plugins: [],
}
