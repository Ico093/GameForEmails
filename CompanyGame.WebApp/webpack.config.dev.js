const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/js/CompanyGame.index'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: "/",
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src/html'), // boolean | string | array, static file location
    noInfo: true, // only errors & warns on hot reload
    proxy: {
      '/api': {
        target: "http://localhost/CompanyGame.Api/api",
				changeOrigin: true,
				pathRewrite: {
					"^/api": ""
				}
      }
    }
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /(\.css)$/, loader: "style-loader!css-loader!resolve-url-loader" },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!resolve-url-loader!sass-loader"
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  }
}
