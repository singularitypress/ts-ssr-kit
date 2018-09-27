const webpack = require("webpack");
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "public");
const APP_DIR = path.resolve(__dirname, "src");
const NODE_MODULES = path.resolve(__dirname, "node_modules");
const NAME = "bundle";

var config = () => {
	return {
		mode: "development",
		entry: `${APP_DIR}/client.tsx`,
		resolve: {
			extensions: [".ts", ".js", ".json", ".tsx", ".jsx"],
		},
		output: {
			path: BUILD_DIR,
			filename: `js/${NAME}.js`,
		},
		module: {
			rules: [
				{
					test: /\.(t|j)sx?$/,
					include: APP_DIR,
					loader: "awesome-typescript-loader",
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
	};
};

module.exports = config;
