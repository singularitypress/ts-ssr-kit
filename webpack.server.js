const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

const style = require("./webpack.style");

const BUILD_DIR = path.resolve(__dirname, "build");
const APP_DIR = path.resolve(__dirname, "src");
const NODE_MODULES = path.resolve(__dirname, "node_modules");
const NAME = "bundle";

const config = () => {
  return {
    target: "node",
    entry: [`${APP_DIR}/server.entry.tsx`],
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
          loader: "swc-loader",
          exclude: NODE_MODULES,
        },
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: NODE_MODULES,
          include: APP_DIR,
          loader: "source-map-loader",
        },
        style.scss,
      ],
    },
    devServer: {
      historyApiFallback: true,
    },

    // Exclude imports in the project from the bundle.js (server-side only) as the server will now dynamically pull it in from node_modules.
    externals: [webpackNodeExternals()],
    plugins: style.plugins,
  };
};

module.exports = config;
