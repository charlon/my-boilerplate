const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

  mode: "development",
  context: __dirname,

  entry : {
    boilerplate: './boilerplate/static/boilerplate/js/main',
    home: './myuw/static/home/',
    teaching: './myuw/static/teaching/',
  },

  optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},

  output: {
      path: path.resolve('./boilerplate/static/bundles/'),
      filename: "[name]-[hash].js",
  },

  plugins: [
    new BundleTracker({
      filename: './webpack-stats.json'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name]-[hash].css",
      //chunkFilename: "[id].css"
    })

  ],

  module: {
      rules: [
          {
              test: /\.vue$/,
              loader: 'vue-loader'
          },
          {
              test: /\.(ts|tsx)$/,
              loader: 'ts-loader'
          },
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                  babelrc: false,
                  presets: ['es2015', 'react']
              }
          },
          {
              test: /\.(css|scss)$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    // you can specify a publicPath here
                    // by default it use publicPath in webpackOptions.output
                    publicPath: './boilerplate/static/bundles/'
                  }
                },
                "css-loader",
                "sass-loader"
              ]
          }
      ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }

}
