const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

const htmlPlugin = new HtmlWebPackPlugin({
  template: 'public/index.html'
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css'
  // chunkFilename: '[id].css'
});

module.exports = {
  // entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          { 
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              // localIdentName: "[name]_[local]_[hash:base64:5]",
              localIdentName: "[name]_[hash:base64:5]",
              minimize: true,
              importLoaders: 2,
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
      }
    ]
  },
  plugins: [cssPlugin, htmlPlugin]
};