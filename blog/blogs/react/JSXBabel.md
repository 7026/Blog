---
title: JSX  Babel  使用配置
date: 2020-11-09
tags:
  - React
categories:
  - React
img:
  - /abstract/15.jpg
---

:::tip 介绍
符合 xml 规范的 JS 语法；（语法格式相对来说，要比HTML严谨很多）
:::

<!-- more -->

## 什么是JSX语法：

> 就是符合 xml 规范的 JS 语法；（语法格式相对来说，要比HTML严谨很多）

### **如何启用 jsx 语法？**

- 安装 ``babel`` 插件

- 运行``cnpm i babel-core babel-loader babel-plugin-transform-runtime -D``

  运行``cnpm i babel-preset-env babel-preset-stage-0 -D``

- 安装能够识别转换jsx语法的包`` babel-preset-react``

- 运行``cnpm i babel-preset-react -D``

- 添加 .babelrc 配置文件

  ```js
  {
  "presets": ["env", "stage-0", "react"],
  "plugins": ["transform-runtime"]
  }
  ```

- 添加babel-loader配置项：

  ```js
  module: { //要打包的第三方模块
    rules: [
      	{ test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
      ]
  }
  ```

### **jsx 语法的本质：**

:::warning 

并不是直接把 jsx 渲染到页面上，而是 内部先转换成了 ``createElement`` 形式，再渲染的；

:::

### **在 jsx 中混合写入 js 表达式**：

:::warning 

在 jsx 语法中，要把 JS代码写到 { } 中

:::

- 渲染数字
- 渲染字符串
- 渲染布尔值
- 为属性绑定值
- 渲染jsx元素
- 渲染jsx元素数组
- 将普通字符串数组，转为jsx数组并渲染到页面上【两种方案】

### **在 jsx 中 写注释**：

> 推荐使用{ /* 这是注释 */ }

### **为 jsx 中的元素添加class类名**：

> 需要使用className 来替代 class；htmlFor替换label的for属性

:::warning 

#### 在JSX创建DOM的时候，所有的节点，必须有唯一的根元素进行包裹；

:::

:::warning 

#### 在 jsx 语法中，标签必须 成对出现，如果是单标签，则必须自闭和!

:::

> 当 编译引擎，在编译JSX代码的时候，如果遇到了<那么就把它当作 HTML代码去编译，如果遇到了 {} 就把 花括号内部的代码当作 普通JS代码去编译；

```json
//package.json

"devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.41.0",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^3.8.2"
  },
```

