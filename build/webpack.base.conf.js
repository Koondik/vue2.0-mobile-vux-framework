var path = require('path');
var utils = require('./utils');

var projectRoot = path.resolve(__dirname, '../');
const vuxLoader = require('vux-loader');

var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var px2rem = require('postcss-px2rem');
var postcssImport = require('postcss-import'); //对根css或scss文件的@import引用文件一样能够进行autoprefixer

let webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test :/\.(css|scss)$/,
        use : [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: (loader) => [
                require('postcss-px2rem')({remUnit:16}),
                require('postcss-import')({root: loader.resourcePath}),
                require('autoprefixer')({ browsers: ['iOS >= 7', 'Android >= 4.1']}), //CSS浏览器兼容
                require('cssnano')()  //压缩css
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
};


module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})
