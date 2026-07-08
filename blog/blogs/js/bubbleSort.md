---
title: 项目 通用工具类
date: 2021-05-16
tags:
  - JS
categories:
  - JS
img:
  - /abstract/2.jpeg

---

:::tip 几种排序方式
冒泡法排序，插入法排序
:::

<!-- more -->

##  给出以下数组，并进行排序处理

var arr = new Array('1','3','8','2','3','5');

1. 插入法排序

   ```js
   Array.prototype.csSort = function() {
       var newarr = this;
       /** 1、 插入法排序
       * 插入发排序，即那数组的后边一项和前面一项对比，如果后面一项小于前面
       * 一项，则将两者位置互换，从数组第2个元素开始对比；如下示例
       */
       for (let i = 1; i < newarr.length; i++) {
           for (let j = i; j > 0; j--) {
               if (newarr[j] < newarr[j-1]) {
                   let pre = newarr[j];
                   newarr[j] = newarr[j-1];
                   newarr[j-1] = pre;
               };
           };
       };
       return newarr;
   }
   console.log(arr.csSort().toString());
   ```

2.  冒泡法排序

   ```js
   Array.prototype.csSort = function() {
       var newarr = this;
       /** 2、 冒泡法排序
       * 插入发排序，即那数组的前一项和后一项对比，如果前面一项小于后面
       * 一项，则将两者位置互换，从数组第1个元素开始对比；如下示例
       */
       for (let i = 0; i < newarr.length; i++) {
           for (let j = 0; j < newarr.length; j++) {
               if (newarr[j] > newarr[j+1]) {
                   let pre = newarr[j];
                   newarr[j] = newarr[j+1];
                   newarr[j+1] = pre;
               };
           };
       };
       return newarr;
   }
   console.log(arr.csSort().toString());
   ```

   
