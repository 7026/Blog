---
title: React动态引入组件
date: 2021-05-23
tags:
  - React
categories:
  - React
img:
  - /abstract/18.jpg
---

:::tip 介绍
React组件导入的两种方式(动态导入组件的实现)
:::

<!-- more -->

# React组件导入的两种方式(动态导入组件的实现)

###  一、react组件两种导入方式

> React 组件可以通过两种方式导入另一个组件

1. import（常用）同步

   ```js
   import component from './component'
   ```

   

2. require（异步，动态处理）

   ```js
   const component = require('./component')
   ```

   

#### **两种方式有什么区别?**

- 提出的规范不同
  import是ES6语法,reuqire是CommonJs提出的.

- import会通过babel转换成CommonJS规范。
  下面两行代码是等价的

  ```js
  import component from './component'
  // => 
  const component = require('./component')
  ```

  > 推荐统一规范一种导入方式,防止混乱
  > 当然,不同情况使用的方式也是不一样的.
  > 下面详细介绍两种导入方式对应的情况(注意这里不介绍按需加载,可看[《前端性能优化之按需加载》](https://www.cnblogs.com/soyxiaobi/p/9535292.html))

#### 二、两种方式对应的情况

1. import xxx from 'xxx'
   一般来说使用import就够了.但是要注意import需要放在定义组件的外部。这就导致一个问题:

如果我需要通过动态路径动态加载组件(这里并非指按需加载),在class里面(ES6)语法使用import会报下面错误:

> Module build failed: SyntaxError: 'import' and 'export' may only appear at the top level

这时候使用require方法能很好解决

2. var xxx = require('xxx')
   这里需要注意的是:
   用`import`引入的组件只需要**export default**即可
   而通过`require`引入的组件需要底部生命**module.exports = component**

用例子解释一下:
需求场景: 现在有大量的子组件存放在对应文件夹(如下)

```js
firstComponent
    /index
secordComponent
    /index
thirdComponent
    /index
...
```

但是我在父组件每次只需加载其中一个即可,我不想一次性导入大量的子组件,然后加判断筛选出对应组件。这样代码可能会非常多、杂(比如我有20个子组件,那么我要写20个import);
于是我通过require动态载入

```js
//父组件
renderDetail(mode,pageType){
    let dynamicDetail = require(`../components/content/${pageType}/index`)
    return dynamicDetail
}

render(){
    //const { pageType } = this.props; 这里的pageType是判断加载哪个子组件的条件
    
    //我们先假设一个
    pageType = firstComponent;  //存在firstComponent这么一个文件夹里面有一个index.js组件
    
    let DynamicDetail = this.renderDetail(pageType);    //动态拿到这个组件
    
    return(
        <div className="detailWried">
            <DynamicDetail />
        </div>
    )
}

//子组件
import React from 'react'

export default class firstComponent extends React.Component{
    render(){
        return(
            <div>
                NavMenu
            </div>
        )
    }
}

module.exports = firstComponent;
```

这样我就可以实现动态加载组件的功能了.把pageType替换成动态的即可,pageType的值则按照用户操作动态改变即可。例如用户选择第二个组件的时候:`pageTpey = secordComponent`

注意这里可能会遇到一个问题:
把require里面的路径替换成变量的话,

```js
let path = `../../../../components/content/${mode}/children/${pageType}/index`
let dynamicDetail = require(path)
```

会报以下错

```js
//终端
Critical dependency: the request of a dependency is an expression

//浏览器
can't  require module'.'
```

在require使用字符串变量即可(字符串变量可真的是一个好方便东西)

至此！两个导入组件的方式介绍完毕！
