const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const AntdDayjsPlugin = require('antd-dayjs-webpack-plugin')

const paths = require('./config/paths')

const dev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: paths.appSrc,
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].[contenthash:6].bundle.js',
    assetModuleFilename: 'assets/[hash][ext]',
    clean: true,
  },
  cache: {
    // 使用持久化缓存
    type: 'filesystem', // memory:使用内容缓存 filesystem：使用文件缓存
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: '@linaria/webpack-loader' },
        ],
      },
      {
        oneOf: [
          // css support
          {
            test: /\.css$/i,
            exclude: /\.modules\.css$/i,
            use: [
              { loader: MiniCssExtractPlugin.loader },
              {
                loader: 'css-loader',
                options: { sourceMap: dev },
              },
              { loader: 'postcss-loader' },
            ],
          },
          // less support, antd theme vars modify
          {
            test: /\.less$/i,
            exclude: /\.modules\.less$/i,
            use: [
              { loader: MiniCssExtractPlugin.loader },
              {
                loader: 'css-loader',
                options: { sourceMap: dev },
              },
              { loader: 'postcss-loader' },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                      'primary-color': '#F37F89',
                      'link-color': '#F37F89',
                      'success-color': '#1C5530',
                    },
                  },
                },
              },
            ],
          },
          // css module support
          {
            test: /\.modules\.css$/i,
            use: [
              { loader: MiniCssExtractPlugin.loader },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                },
              },
              { loader: 'postcss-loader' },
            ],
          },
          // less module support
          {
            test: /\.modules.less$/i,
            use: [
              { loader: MiniCssExtractPlugin.loader },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                },
              },
              { loader: 'postcss-loader' },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(md?)$/i,
        type: 'asset/source',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.(bmp|gif|jpe?g|png|ico|eot|svg|ttf|woff|woff2?)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },
  plugins: [
    LodashModuleReplacementPlugin,
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new AntdDayjsPlugin(),
    new MiniCssExtractPlugin({ ignoreOrder: true }),
  ],
  resolve: {
    modules: [paths.appNodeModules],
    extensions: ['.js', '.jsx'],
    alias: { '@': paths.appSrc },
  },
}
