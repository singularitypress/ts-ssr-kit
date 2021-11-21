const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = !!(process.argv.pop() === "production");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? "[name].[contenthash].css" : "[name].css",
      chunkFilename: isProd ? "[id].[contenthash].css" : "[id].css",
    }),
  ],
  scss: {
    test: /(\.module)?.(sass|scss)$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[name]__[local]--[hash:base64:5]",
          },
          sourceMap: true,
        },
      },
      "sass-loader",
    ],
  },
};
