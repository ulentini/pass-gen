// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        mono: ["PT Mono", ...fontFamily.mono],
      },
    },
  },
}
