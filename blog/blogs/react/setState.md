---
title: setState 及时更新
date: 2020-11-12
tags:
  - React
categories:
  - React
img:
  - /abstract/18.jpg
---

:::tip 介绍
This.setState(). 为异步更新数据方法。
:::

<!-- more -->

This.setState(). 为异步更新数据方法。

this.setState执行后  再调用方法。不会及时更新

如果要及时更新。请使用以下方法：

```js
this.setState(
  {
    parentId: category._id,
    parentName: category.parentName
  },
  () => {
  	this.initList()
  }
)
```

