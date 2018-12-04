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
  if (!theme) {
    return loaders;
  }
  loaders.forEach(loader => {
    const isLess = RegExp(loader.test).test('.less');
    if (isLess) {
      loader.exclude = /node_modules/;
    }
  });
  loaders.push(themeLoaders);
  return loaders;
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
  loaders: getLoaders,
  extractTextPlugin: getExtractTextPlugin
});
