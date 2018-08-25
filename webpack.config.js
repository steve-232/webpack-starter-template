const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: { main: "./src/js/index.js" },
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    filename: "main.js",
    publicPath: "assets"
  },
  devServer: {
    inline: true,
    contentBase: "./dist",
    port: 3000,
    historyApiFallback: true
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "webpack.config.js")
        ],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
};
