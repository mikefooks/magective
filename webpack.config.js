const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "eval-source-map",
  module: {
    rules: [
      {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	use: {
	  loader: 'babel-loader'
	}
      },
      {
	test: /\.html$/,
	exclude: /node_modules/,
	use: {
	  loader: 'html-loader'
	}
      },
      {
	test: /\.scss$/,
	exclude: /node_modules/,
	use: [
	  'style-loader',
	  'css-loader',
	  'sass-loader'
	]
      }
    ]
  },
  plugins:
  [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
}
