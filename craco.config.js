// TODO: https://material-ui.com/guides/minimizing-bundle-size/#development-environment
// - https://github.com/gsoft-inc/craco
// - https://github.com/jackwilsdon/craco-use-babelrc
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
