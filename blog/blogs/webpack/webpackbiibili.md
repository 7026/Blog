---
title: webpack  bilibili  山地人学习
date: 2020-11-12
tags:
  - Webpack
categories:
  - Webpack
img:
  - /abstract/20.jpg
---

:::tip 介绍
自学webpack  记录
:::

<!-- more -->

```js
//loaders：
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
  	index: './src/index.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
    plugins: [
      new HtmlWebpackPlugin({
      	template: './src/index.html'
      }),
      new ExtractTextWebpackPlugin({
      	template: './src/index.html'
      })
  ]
}
```

**【跟山地人学webpack】[进阶篇]Lesson10.30分钟全面掌握webpack从开发到上线全套配置**

package.json 文件 配置启动命令 以及相对运行环境

```json
"scripts": {
  "dev": "webpack --config webpack.dev.config.js",
  "build": "webpack --config webpack.prod.config.js"
},
```

相关依赖包

```json
"devDependencies": {
  "clean-webpack-plugin": "^3.0.0",
  "css-loader": "^3.2.0",
  "extract-text-webpack-plugin": "^4.0.0-beta.0",
  "file-loader": "^4.2.0",
  "html-webpack-plugin": "^3.2.0",
  "less": "^3.10.2",
  "less-loader": "^5.0.0",
  "style-loader": "^1.0.0",
  "webpack": "^4.39.2",
  "webpack-cli": "^3.3.7",
  "webpack-dev-server": "^3.8.0",
  "webpack-merge": "^4.2.1"
}
```

文件目录

<img :src="$withBase('/img/webpack/1.png')" alt="mixureSecure">

重复内容放入 webpack.base.config.js

```js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtracTextWebpackPlugin = require('extract-text-webpack-plugin')

const dist_dir = 'dist_dev'

module.exports = {
  entry: {
  	index: './src/index.js'
  },
  module: {
  rules: [
    {
      test: /\.css$/,
      use: ExtracTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    },
    {
      test: /\.less$/,
      use: ExtracTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
      })
    },
    {
      test: /\.{jpg|png|svg}$/,
      use: ['file-loader']
    }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Dev mode'
    }),
    // 样式文件打包到style.css
    new ExtracTextWebpackPlugin('style.css')
  ]
}
```

