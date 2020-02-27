const base = require("../webpack.config");
const webpack = require("webpack");

module.exports = {
  ...base,
  plugins: [new webpack.EnvironmentPlugin(["NODE_ENV", "SERVER_URL"])],
};
