const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const resolve = function(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  entry: {
    main: ['babel-polyfill', './src/page/index.js']
  },
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      '@': resolve('src')
    }
  },
  resolveLoader: {
    modules: ['node_modules']
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules:[
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'), 
          resolve('Jtpl'), 
          resolve('Jtpl-loader'),
          resolve('Jtpl-css-loader')
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'babel-loader'
        },{
          loader: 'jtpl-loader'
        }],
        include: [resolve('src/views'), resolve('src/components')]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          },{
            loader: "postcss-loader"
          },{
            loader: "jtpl-css-loader"
          },{
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: /fonts/,
        options: {
          limit: 1000,
          name: '[name].[hash:7].[ext]',
          publicPath: 'static/images/',
          outputPath: 'static/images'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: /fonts/,
        options: {
          limit: 1000,
          name: '[name].[hash:7].[ext]',
          publicPath: '../fonts/',
          outputPath: 'static/fonts'
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: 'static/css/[name].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './src/page/index.html',
      inject: true,
      hash: true,
      chunks: ['main']
    })
  ],
  devServer: {
    contentBase: resolve('dist'),
    host: '0.0.0.0',
    compress: true,
    port: 8085,
    hot: true
  }
}