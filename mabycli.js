const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const getTheme = () => {
  let theme = {};
  // 获取主题颜色
  const pkgPath = path.resolve(__dirname, './package.json');
  const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};
  if (pkg.theme && typeof pkg.theme === 'string') {
    let cfgPath = pkg.theme;
    // relative path
    if (cfgPath.charAt(0) === '.') {
      cfgPath = path.resolve(__dirname, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
  } else if (pkg.theme && typeof pkg.theme === 'object') {
    theme = pkg.theme;
  }
  return theme;
};

const getLoaders = (loaders) => {
  const newLoaders = [];
  const theme = getTheme();
  const themeLoaders = {
    test: /\.less$/,
    include: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader', 'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            modifyVars: theme
          }
        }
      ]
    })
  };
  const svgLoader = {
    test: /\.svg$/,
    exclude: /node_modules/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
        },
      }
    ]
  }
  if (!theme) {
    return loaders;
  }
  loaders.forEach(loader => {
    const isLess = RegExp(loader.test).test('.less');
    const isSVG = RegExp(loader.test).test('.svg');
    if (!isSVG) {
      if (isLess) {
        loader.exclude = /node_modules/;
        loader.use = ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use:[
              {
                loader: 'typings-for-css-modules-loader',
                options: {
                  modules: true,
                  // namedExport: true
                  // 支持 import * as styles from './index.less'; 的写法
                  // https://medium.com/@sapegin/css-modules-with-typescript-and-webpack-6b221ebe5f10
                  namedExport: true,
                  // 支持驼峰
                  camelCase: true,
                  localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
                  sourceMap: true
                }
              },
              { loader: 'postcss-loader', options: { sourceMap: true } },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true,
                  namedExport: true,
                  javascriptEnabled: true,
                }
              }
            ]
          }
        )
      }
      newLoaders.push(loader);
    } else {
      newLoaders.push({
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }]
      })
    }
  });
  newLoaders.push(themeLoaders);
  newLoaders.push(svgLoader);
  return newLoaders;
};
const getExtractTextPlugin = (ExtractText) => {
  return {
    filename: ExtractText.filename,
    allChunks: true,
  };
};
module.exports = () => ({
  stylelint: true,
  port: 10056,
  vendors: [
    'react',
    'react-dom',
    'antd',
  ],
  loaders: getLoaders,
  extractTextPlugin: getExtractTextPlugin,
});
