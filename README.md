# 昆明大保系统

![](https://img.shields.io/badge/license-MIT-0.svg)
![](https://img.shields.io/badge/download-40M-0.svg)
![](https://img.shields.io/badge/language-zh-0.svg)
![](https://img.shields.io/badge/platform-win/mac-0.svg)
![](https://img.shields.io/badge/node@latest->=8.9.0(推荐使用8.16.0)-0.svg)

## 项目

### 安装依赖

```
npm install
```

### development 模式启动

```
npm run serve
```

### production 模式构建

```
npm run build
```

### production 模式打包体积分析

```
npm run analyze
```

### eslint 检查

```
npm run lint
```

### 组件生成

```
npm run new:comp
```

### 页面组件生成

```
npm run new:view
```

## 编码规范

1. 编码规则
1. 缩进使用两个空格；
1. 字符串使用单引号，除非是为了避免转义；
1. 不出现未使用的变量；
1. 函数参数列表的括号前有一个空格；
1. 始终用===，不使用==；
1. 中辍操作符前后要有一个空格；
1. else 与它的大括号同行；
1. if 语句如果包含多个执行体语句则使用大括号；若只有一条执行语句，可并行无括号，也可用大括号，但不可换行无大括号。
1. 不要有多个连续空行；
1. 三元表达式如果是多行，则？和：放在各自的行上；
1. 变量和函数的名字使用 camelCase（驼峰）格式；
1. 文件夹名字和组件名字使用 camelCase（驼峰）格式；
1. 模板中组件名使用 kebab-case 格式
1. 逗号必须放在当前行的末尾；
1. 键名和键值之间要有空格；
1. 组件名应该倾向于完整单词而不是缩写

## 需要二次封装的组件
1. 不同的 echart 图标【含柱图、扇形图、百分比图】
2. 公共UI框架 【header、slide等】
3. input 及其他 element 组件(调换成 UI 设计风格)
4. header 模块功能【含首页大屏的header（不考虑）与其他模块的 header】
5. 公共的css【含 small widget】
6. 封装地图组件

## 代码提交须知

1.  强制提交代码：git add . && git commit --no-verify -m "代码规范强制提交测试"（**不推荐使用**）;
2.  提交代码 `git add .` && `git commit -m "上传代码"`，如果不按照规范书写 commit 的日志会提示报错:

        	I: message may not be empty [subject-empty]
        	II: type may not be empty [type-empty]

    下面输入正确的 commit 日志信息：注意冒号后面要留空格: `git commit -m "feat(): 新增页面"`

## 参考文档

[https://cli.vuejs.org/zh/config/#pluginoptions](https://cli.vuejs.org/zh/config/#pluginoptions 'vue cli 使用说明')

[https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint 'eslint 配置')

[http://www.likecs.com/show-66970.html](http://www.likecs.com/show-66970.html 'eslint,pre-commit... 配置')

[https://blog.csdn.net/wei371522/article/details/84070803](https://blog.csdn.net/wei371522/article/details/84070803 'commitlint+husky规范commit 日志')
