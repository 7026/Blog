---
title: scss  穿透
date: 2020-11-09
tags:
  - CSS
categories:
  - CSS
img:
  - /abstract/9.jpg
---

:::tip 介绍
**/deep/** 穿透
:::

<!-- more -->

## /deep/ 穿透

`当调用第三方UI组件库时 无法修改原生样式 可使用此方法`

```scss
.d-wrap /deep/.is-disabled > .el-input__inner {
  background-color: #fff;
  color: #000;
}
```
