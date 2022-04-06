const { merge } = require('webpack-merge')
const common = require('./webpack.base.conf.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  infrastructureLogging: {
    colors: true,
    appendOnly: true,
    level: 'info',
  },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    // open: true, // 自动打开浏览器
    compress: true, // gzip 压缩
    port: 9000, // 端口号,
    host: '0.0.0.0', // 主机号
    devMiddleware: {
      stats: 'minimal',
    },
    client: {
      logging: 'info',
      overlay: true,
      progress: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:60001',
        pathRewrite: { '^/api': '/api' },
      },
      '/avatars': {
        target: 'http://localhost:60001',
        pathRewrite: { '^/avatars': '/avatars' },
      },
      '/asset': {
        target: 'http://localhost:60001',
        pathRewrite: { '^/asset': '/asset' },
      },
    },
  },
})
