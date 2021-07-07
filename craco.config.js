module.exports = {
  plugins: [
    {
      plugin: require("@jackwilsdon/craco-use-babelrc"),
    },
  ],
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
