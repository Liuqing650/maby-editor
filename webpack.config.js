const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv !== 'production';
const libraryName = 'maby-editor';
const ASSET_PATH = '/';
const ANALYZER = process.env.ANALYZER || false;

// 环境
const PORT_ENV = 10123;
const PREVIEW = process.env.PREVIEW || false;

const isAutoDll = false; // 是否开启 autodll
const eslint = true;
const stylelint = false;

const vendor = [
  'react',
  'react-dom',
  'redbox-react'
];

console.log(isDev ? '开发模式' : '发布模式');

// 设置插件环境 development/prodcution
const getPlugins = () => {
  // Common
  const plugins = [
    new ExtractTextPlugin({
      filename: `${libraryName}.css`,
      disable: isDev
    }),
    new HtmlWebpackPlugin({
      title: 'maby-editor-slate',
      template: path.join(process.cwd(), '/public/index.html')
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: JSON.stringify(nodeEnv) }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      __DEV__: isDev,
      __PORT__: PORT_ENV,
      __PREVIEW__: PREVIEW
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ];
  if (isDev) {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new StyleLintPlugin({ failOnError: stylelint }),
      new webpack.NamedModulesPlugin()
    );
  } else {
    plugins.push(
      new CleanWebpackPlugin(['public/dist']),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CopyWebpackPlugin([{ 
        from: 'assets/*', context: 'public/'
      }]),
      new UglifyJsPlugin({
        uglifyOptions: {
          beautify: true, // 最紧凑的输出
          comments: true, // 删除所有的注释
          compress: {
            warnings: false,
            drop_console: !PREVIEW, // 删除所有的 `console` 语句
            collapse_vars: true,
            reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
          }
        }
      }),
    );
  }
  if (isAutoDll) {
    plugins.push(
      new AutoDllPlugin({
        context: path.resolve(process.cwd()),
        inject: true,
        filename: '[name].dll.js',
        entry: {
          vendor
        }
      })
    )
  }
  if (ANALYZER) {
    plugins.push(
      new BundleAnalyzerPlugin(),
    );
  }
  return plugins;
};

// 获取入口
const getEntry = () => {
  if (isDev) {
    return {
      'maby-editor': __dirname + '/src/index.js',
      main: __dirname + '/example/index.js',
      vendor
    };
  }
  return {
    'maby-editor': __dirname + '/src/index.js',
  }
};

// 获取loaders
const webpackLoaders = () => {
  const loaders = [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: isDev
      }
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract(
        {
          fallback: 'style-loader',
          use:['css-loader', 'postcss-loader']
        },
      )
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract(
        {
          fallback: 'style-loader',
          use:[
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        }
      )
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }
  ];
  
  if (eslint) {
    loaders.unshift({
      test: /\.(js|jsx)?$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader'
    });
  }
  return loaders;
};
module.exports = {
  name: 'client',
  target: 'web',
  cache: isDev,
  profile: isDev, // 是否捕捉 Webpack 构建的性能信息
  context: path.resolve(process.cwd()),
  entry: getEntry(),
  devtool: isDev ? 'inline-source-map' : 'hidden-source-map',
  output: {
    path: path.join(__dirname, 'public/dist'),
    publicPath: ASSET_PATH,
    filename: isDev ? '[name].js' : libraryName + '.min.js',
    pathinfo: isDev,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    overlay: true,
    hot: true,
    port: PORT_ENV,
    stats: {
      modules: false,
      colors: true
    }
  },
  plugins: getPlugins(),
  module: {
    loaders: webpackLoaders()
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src/'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  }
};
