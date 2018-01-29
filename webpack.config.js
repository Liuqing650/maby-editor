const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const env = process.env.WEBPACK_ENV;

let libraryName = 'maby-edit';

let plugins = [], outputFile, devtool = 'source-map';
console.log('✅ 当前是 %s 模式', env);
if (env === 'prod') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  plugins.push(new CleanWebpackPlugin(['dist']));
  outputFile = libraryName + '.min.js';
} else {
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'maby-edit测试',
      template: __dirname + '/public/index.html'
    }));
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }));
  outputFile = '[name].js';
  devtool = 'inline-source-map';
}

let config = {
  entry: {
    'maby-edit': __dirname + '/src/index.js',
    main: __dirname + '/src/test.js',
  },
  devtool: devtool,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
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
      },
    ]
  },
  plugins: plugins
};
if (env === 'dev') {
  config.devServer = {
    contentBase: './dist'
  }
}
module.exports = config;