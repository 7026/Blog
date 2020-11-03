---
title: 简单介绍
date: 2020-10-21
tags:
  - briefNotes
categories:
  - briefNotes
sticky:
  - description: true
img:
  - /Users/mac/Desktop/Object/vue/Blog/blog/.vuepress/public/avatar2.png
---

:::tip 介绍
开始全栈生活
:::

<!-- more -->

## vuepress 创建自己的开发者文档 静态图片引用问题解决

1. 安装

2. VuePress 遵循 “约定优于配置” 的原则，按照官网设置目录结构

3. 在 md 中加入静态图片的问题，在 md 文件中可以使用下面的方式应用静态图片，下面 imgs 文件夹在 public 文件件下 目录如下

```js
<img :src="$withBase('/img/001.png')" alt="mixureSecure">
```

<img :src="$withBase('/img/BriefNotes/B001.png')" alt="mixureSecure">
