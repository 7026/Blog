---
title: elementUI
date: 2020-10-22
tags:
  - Vue
categories:
  - Vue
img:
  - /abstract/6.jpg
---

:::tip 介绍
elementUI
:::

<!-- more -->

## input 禁止输入空格

```vue
<el-input
  v-model="form.phone"
  maxlength="11"
  oninput="value=value.replace(/[^\d]/g,'')"
/>
```
