const path = require("path");

const style = require("./webpack.style");

const BUILD_DIR = path.resolve(__dirname, "public");
const APP_DIR = path.resolve(__dirname, "src");
const NODE_MODULES = path.resolve(__dirname, "node_modules");
const NAME = "bundle";

const config = () => {
  return {
    entry: [`${APP_DIR}/client.entry.tsx`, `${APP_DIR}/style/index.scss`],
    resolve: {
      extensions: [".ts", ".js", ".json", ".tsx", ".jsx", ".scss"],
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
          include: APP_DIR,
          exclude: NODE_MODULES,
          loader: "source-map-loader",
        },
        style.rules,
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      axios: "axios",
      d3: "d3",
    },
    plugins: style.plugins,
  };
};

module.exports = config;
