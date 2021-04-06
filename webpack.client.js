const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "public");
const FONT_DIR = path.resolve(__dirname, "assets/fonts");
const APP_DIR = path.resolve(__dirname, "src");
const STYLE_DIR = path.resolve(__dirname, "style");
const NODE_MODULES = path.resolve(__dirname, "node_modules");
const NAME = "bundle";

const config = () => {
  return {
    entry: [`${APP_DIR}/client.tsx`, `${STYLE_DIR}/index.scss`],
    resolve: {
      extensions: [".ts", ".js", ".json", ".tsx", ".jsx"],
    },
    output: {
      path: BUILD_DIR,
      filename: `${NAME}.js`,
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          include: APP_DIR,
          loader: "ts-loader",
          exclude: NODE_MODULES,
        },
        {
          enforce: "pre",
          test: /\.js$/,
          include: APP_DIR,
          loader: "source-map-loader",
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: `${NAME}.css`,
                context: BUILD_DIR,
                outputPath: "./",
                publicPath: "../",
              },
            },
            {
              loader: "extract-loader",
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
              },
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /(Type-M)\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "Type-M.otf",
                context: FONT_DIR,
                outputPath: "./",
                publicPath: "/",
              },
            },
          ],
        },
        {
          test: /(Type-DB)\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "Type-DB.otf",
                context: FONT_DIR,
                outputPath: "./",
                publicPath: "/",
              },
            },
          ],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
  };
};

module.exports = config;
