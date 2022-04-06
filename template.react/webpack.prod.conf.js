const { merge } = require('webpack-merge')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const common = require('./webpack.base.conf.js')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp(`\\.(${['js', 'css', 'png', 'md'].join('|')})$`),
      threshold: 1024,
      minRatio: 0.8,
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: true,
        terserOptions: {
          sourceMap: true,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all', // initial、async和all
      minSize: 30000, // 形成一个新代码块最小的体积
      maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
      maxInitialRequests: 3, // 最大初始化请求数
      automaticNameDelimiter: '~', // 打包分割符
      cacheGroups: {
        vendors: {
          // 基本框架
          chunks: 'all',
          test: /(react|react-dom|react-dom-router|babel-polyfill|antd|mobx)/,
          priority: 100,
          name: 'vendors',
        },
        'async-commons': {
          // 其余异步加载包
          chunks: 'async',
          minChunks: 2,
          name: 'async-commons',
          priority: 90,
        },
        commons: {
          // 其余同步加载包
          chunks: 'all',
          minChunks: 2,
          name: 'commons',
          priority: 80,
        },
      },
    },
  },
})
