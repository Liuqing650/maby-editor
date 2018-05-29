const webpack = require('webpack');
const packageJSON = require('./package.json');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let libraryName = 'maby-editor';

let plugins = [];

console.log('✅ 当前是 发布 模式');

plugins = [
  new HtmlWebpackPlugin({
    title: 'maby-editor测试',
    template: __dirname + '/public/index.html'
  }),
  new UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  }),
  new CleanWebpackPlugin(['preview/slateDev'])
];
console.log(' ./preview 目录已删除，正在打包当前版本 %s', packageJSON.version);
let config = {
  entry: {
    main: __dirname + '/example/index.js',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'preview/slateDev'),
    filename: libraryName + '.min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      './'
    ],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', "stage-0"]
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 51200
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
};
module.exports = config;