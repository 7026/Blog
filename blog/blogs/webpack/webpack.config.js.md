---
title: webpack.config.js   配置变量
date: 2020-11-12
tags:
  - Webpack
categories:
  - Webpack
img:
  - /abstract/19.jpg
---

:::tip 介绍
mode、plugins、module、reslove
:::

<!-- more -->

```js
module.exports = {
  mode: 'development',
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    // 省略文件后缀名
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

