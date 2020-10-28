---
title: localStorage和session、cookies区别
date: 2020-10-28
tags:
  - JS
categories:
  - JS
---

## 简介

::: theorem cookie：
由网景公司的前雇员在1993年发明。它的主要用于保存登陆信息，比如登陆某个网站市场可以看到'记住密码’，这就是通过在cookie中存入一段辨别用户身份的数据来实现的。

:::

::: theorem sessionStorage：

会话，是可以将一部分数据在当前会话中保存下来，刷新页面数据依旧存在。但是页面关闭后，sessionStorage中的数据就会被清空。

:::

::: theorem localStorage：

是HTML5标准中新加入的技术，当然早在IE6时代就有一个userData的东西用于本地存储，而当时考虑到浏览器的兼容性，更通用的方案是使用flash。如今localStorage被大多数浏览器所支持。

:::

## 三者区别



::: theorem 1. 储存大小

cookie：一般有不超过4K（因为每次http请求都会携带cookie、所以cookie只适合保存很小的数据，如会话标识）

sessionStorage:5M或者更大。

localStorage:5M或者更大。

:::

::: theorem 2. 数据有效期

cookie：一般由服务器生成，可以设置失效时间；若没有设置时间，关闭浏览器cookie失效，若设置了时间，				cookie就会放在硬盘里，过期才失效。

sessionStorage：仅在当前浏览器窗口关闭之前有效，关闭页面或者浏览器会被清除

localStorag：永久有效，窗口或者浏览器关闭也会一直保存，除非手动永久清除，因此用作持久数据

:::

