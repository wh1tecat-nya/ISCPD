const path = require("path");

module.exports = {
	target: "web",
	mode: "development",
	entry: path.resolve("./src/index.tsx"),
	output: {
		path: path.resolve("./dist"),
		filename: "index.js",
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				use: [
					{
						loader: "babel-loader",
					},
					{
						loader: "ts-loader",
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
};
