const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

const BUILD_DIR = path.resolve(__dirname, "build");
const APP_DIR = path.resolve(__dirname, "src");
const NODE_MODULES = path.resolve(__dirname, "node_modules");
const NAME = "bundle";

const config = () => {
  return {
    target: "node",
    entry: [`${APP_DIR}/server.tsx`],
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
      ],
    },
    devServer: {
      historyApiFallback: true,
    },

    // Exclude imports in the project from the bundle.js (server-side only) as the server will now dynamically pull it in from node_modules.
    externals: [webpackNodeExternals()],
  };
};

module.exports = config;
