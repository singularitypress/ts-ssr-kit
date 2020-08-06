const webpack = require("webpack");
const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

const BUILD_DIR = path.resolve(__dirname, "build");
const APP_DIR = path.resolve(__dirname, "src");
const STYLE_DIR = path.resolve(__dirname, "style");
const NODE_MODULES = path.resolve(__dirname, "node_modules");
const NAME = "bundle";

var config = () => {
	return {
		target: "node",
		entry: [`${APP_DIR}/server.tsx`, `${STYLE_DIR}/index.scss`],
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
					loader: "awesome-typescript-loader",
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
