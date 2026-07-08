---
title: 生命周期函数
date: 2020-11-012
tags:
  - React
categories:
  - React
img:
  - /abstract/16.png
---

:::tip 介绍
生命周期函数指在某一个时刻组件会自动调用执行的函数
:::

<!-- more -->

##  Initialization

```js
// 最开始执行 vue created(){}
constructor(props) {
  super(props)
  this.state = {
    inputValue: '',
    list: []
  }
  this.handleInputChange = this.handleInputChange.bind(this)
  this.handleButtonClick = this.handleButtonClick.bind(this)
  this.handleDel = this.handleDel.bind(this)
}
```

## Mounting

```js
// 在组建即将被挂载到页面前自动执行,只在挂载时候执行
  componentWillMount() {}

  render() {}

// 在组件被挂载到页面之后自动执行,只在挂载时候执行
  componentDidMount() {}
```

## Updation

```js
// 组件更新之前自动执行
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
    // 如果是return false  组件不会更新    return false
  }
// 组件更新之前自动执行,在shouldComponentUpdate后执行
  // 如果在shouldComponentUpdate后执行 返回 true  执行  返回false  则不执行
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
// 组件更新完成后执行
  componentDidUpdate() {
    console.log('componentWillUpdate')
  }
  // 当一个组件 从父组件接收参数
  // 如果这个组件第一次存在于父组件中，不会执行
  //如果这个组件之前已经存在于父组件中，才会执行
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }
```

## Unmounting

<img :src="$withBase('/img/React/2.png')" alt="mixureSecure">





## React v16.4 生命周期



<img :src="$withBase('/img/React/3.png')" alt="mixureSecure">

React16废弃的三个生命周期函数

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

> 注：目前在16版本中componentWillMount，componentWillReceiveProps，componentWillUpdate并未完全删除这三个生命周期函数，而且新增了UNSAFE_componentWillMount，UNSAFE_componentWillReceiveProps，UNSAFE_componentWillUpdate三个函数，官方计划在17版本完全删除这三个函数，只保留UNSAVE_前缀的三个函数，目的是为了向下兼容，但是对于开发者而言应该尽量避免使用他们，而是使用新增的生命周期函数替代它们

取而代之的是两个新的生命周期函数

- static getDerivedStateFromProps
- getSnapshotBeforeUpdate

我们将React的生命周期分为三个阶段，然后详细讲解每个阶段具体调用了什么函数，这三个阶段是：

- 挂载阶段
- 更新阶段
- 卸载阶段

**getSnapshotBeforeUpdate**

> getSnapshotBeforeUpdate(prevProps, prevState)

这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，请返回null，不写的话控制台会有警告

<img :src="$withBase('/img/React/4.png')" alt="mixureSecure">

还有这个方法一定要和componentDidUpdate一起使用，否则控制台也会有警告

<img :src="$withBase('/img/React/5.png')" alt="mixureSecure">

[查看 React v16.4 生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)