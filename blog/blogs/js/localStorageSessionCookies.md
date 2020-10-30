---
title: localStorage和session、cookies区别
date: 2020-10-28
tags:
  - JS
categories:
  - JS
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
---## 简介

::: theorem cookie：
由网景公司的前雇员在 1993 年发明。它的主要用于保存登陆信息，比如登陆某个网站市场可以看到'记住密码’，这就是通过在 cookie 中存入一段辨别用户身份的数据来实现的。

:::

::: theorem sessionStorage：

会话，是可以将一部分数据在当前会话中保存下来，刷新页面数据依旧存在。但是页面关闭后，sessionStorage 中的数据就会被清空。

:::

::: theorem localStorage：

是 HTML5 标准中新加入的技术，当然早在 IE6 时代就有一个 userData 的东西用于本地存储，而当时考虑到浏览器的兼容性，更通用的方案是使用 flash。如今 localStorage 被大多数浏览器所支持。

:::

## 三者区别

::: theorem 1. 储存大小

cookie：一般有不超过 4K（因为每次 http 请求都会携带 cookie、所以 cookie 只适合保存很小的数据，如会话标识）

sessionStorage:5M 或者更大。

localStorage:5M 或者更大。

:::

::: theorem 2. 数据有效期

cookie：一般由服务器生成，可以设置失效时间；若没有设置时间，关闭浏览器 cookie 失效，若设置了时间， cookie 就会放在硬盘里，过期才失效。

sessionStorage：仅在当前浏览器窗口关闭之前有效，关闭页面或者浏览器会被清除

localStorag：永久有效，窗口或者浏览器关闭也会一直保存，除非手动永久清除，因此用作持久数据

:::

## 作用域

::: theorem 作用域

cookie：在所有同源窗口中都是共享的

sessionStorage：在同一个浏览器窗口是共享的（不同浏览器、同一个页面也是不共享的）

localStorage：在所有的同源窗口都是共享的。

:::

## 通信

::: theorem 通信

cookie：十种携带在同源的 http 请求中，即使不需要，故 cookie 在浏览器和服务器之间来回传递；如果使用 cookie 保存过多数据会造成性能问题。

sessionStorage：尽在客户端（即浏览器）中保存，不参与和服务器的通信；不会自动把数据发送给服务器，仅在本地保存。

localStorage：尽在客户端（即浏览器）中保存，不参与和服务器的通信；不会自动把数据发送给服务器，仅在本地保存。

:::

## 易用性

::: theorem 易用性

cookie：需要自己进行封装，原生的 cookie 接口不够友好。

sessionStorage：原生接口可以接受，可以封装来对 Object 和 Array 有更好的支持

localStorage：原生接口可以接受，可以封装来对 Object 和 Array 有更好的支持

:::

## 应用场景

::: theorem 应用场景

cookie：判断用户是否登录过网站，以便实现下次自动登录或记住密码；保存事件信息等

sessionStorage：敏感账号一次性登录；单页面用的较多（sessionStorage 可以保证打开页面时 sessionStorage 的数据为空）

localStorage：常用于长期登录（判断用户是否已登录），适合长期保存在本地的数据

:::
