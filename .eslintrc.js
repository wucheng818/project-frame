/*
 * @Author: liuhuitao
 * @Date: 2019-08-06 9:44:20
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-18 09:44:32
 * @description: eslint 配置(每次提交代码前执行 npm run lint,自动纠正不规则代码文件)
 * @source：https://eslint.org/docs/rules/quotes
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow debugger during development
    indent: ['error', 2], // 使用2个空格缩进
    eqeqeq: ['error', 'always'], // 使用恒等
    semi: ['error', 'always', { omitLastInOneLineBlock: true }], // 总是使用分号，忽略花括号在同一行（内容也就在同一行了）的语句块中的最后一个分号
    'no-alert': 'error', // 禁止使用alert，confirm，prompt
    'arrow-parens': ['error', 'always'], // 箭头函数，总是使用圆括号
    quotes: ['error', 'single'], // 总是使用单引号
    'object-shorthand': ['error', 'always'], // 对象字面量中方法和属性使用简写语法
    'generator-star-spacing': 'off', // Generators 不会对*的前后添加空格做要求
    'no-var': 'error' // 不能使用var声明变量
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      // 添加ES特性支持，使之能够识别ES6语法
      jsx: true
    }
  },
  globals: {
    _: true
  }
};
