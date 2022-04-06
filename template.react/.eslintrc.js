module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      arrowFunctions: true,
      classes: true,
      modules: true,
      defaultParams: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true,
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // js
    indent: 0,
    'arrow-body-style': 0,
    'no-plusplus': 0, // 不使用++
    'no-confusing-arrow': 0,
    'no-console': 0,
    'no-const-assign': 2, // 尽量使用const而不是let或var
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-return-assign': 0,
    'no-prototype-builtins': 0,
    'no-restricted-syntax': 0,
    'no-use-before-define': 0, // 后置定义常用
    'no-unused-expressions': 0, // 不允许有没用的表达式，影响(bool) &&
    'object-curly-newline': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0, // 导入alias
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'comma-dangle': 0,
    'consistent-return': 0, // 函数需要有确定的返回，影响用return跳出foreach
    'jsx-a11y/click-events-have-key-events': 0, // 带有点击事件的组件需要有key
    'jsx-a11y/no-static-element-interactions': 0, // 不使用静态元素交互
    'max-classes-per-file': 0, // 每页最多只允许一个class
    'operator-linebreak': 0, // 操作符换行
    'nonblock-statement-body-position': 0,
    'generator-star-spacing': 0, // 在*后不需要加空格，随prettier样式
    'max-len': 0, // 每行最多155个字符
    'class-methods-use-this': 0,
    camelcase: 0, // 变量必须使用驼峰
    semi: [2, 'never'],
    // react
    'react/function-component-definition': 0, // 允许匿名函数作为组件
    'react/jsx-wrap-multilines': 0, // 允许{}中不加()
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
    'react/no-array-index-key': 0, // 不要使用index作为key，不然找不到
    'react/react-in-jsx-scope': 0, // react组件必须在jsx范围，影响剪头函数
    'react/jsx-filename-extension': 0, // react组件文件必须用jsx后缀
    'react/jsx-one-expression-per-line': 0, // jsx中每行只能有一个表达式
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/jsx-curly-newline': 0,
  },
}
