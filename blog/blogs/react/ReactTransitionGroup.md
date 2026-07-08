---
title: React Transition Group   
date: 2020-11-09
tags:
  - React
categories:
  - React
img:
  - /abstract/14.jpg
---

:::tip 介绍
简单使用方法
:::

<!-- more -->

```react
function App() {
const [inProp, setInProp] = useState(false);
return (
<div>
<CSSTransition in={inProp} timeout={200} classNames="my-node">
<div>
{"I'll receive my-node-* classes"}
</div>
</CSSTransition>
<button type="button" onClick={() => setInProp(true)}>
Click to Enter
</button>
</div>
);}

// my-node 为动画class 样式的名称头
/*
* 使用时 设置三个参数 in={inProp} timeout={200} classNames="my-node"
*/
例：
.my-node-enter {
opacity: 0;
}
.my-node-enter-active {
opacity: 1;
transition: opacity 200ms;
}
.my-node-exit {
opacity: 1;
}
.my-node-exit-active {
opacity: 0;
transition: opacity 200ms;
}
```

