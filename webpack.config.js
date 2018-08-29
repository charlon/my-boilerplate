const path = require("path")
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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

    new BundleTracker({filename: './webpack-stats.json'}),
    new VueLoaderPlugin(),

    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for 'WARNING Critical dependency: the request of a dependency is an expression'
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve('./boilerplate/static/boilerplate/angular'), // location of your angular src
      {} // a map of your routes
    )

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
              test: /\.(css|scss|less)/,
              loaders: ['style-loader', 'css-loader', 'sass-loader', 'less-loader']
          }
      ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }

}
