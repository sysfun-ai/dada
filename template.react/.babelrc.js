module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@linaria'],
  plugins: [
    ['import', { libraryName: 'antd', style: true }, 'antd'],
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false, // default: true
      },
    ],
  ],
}
