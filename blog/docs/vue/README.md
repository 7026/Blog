---
title: 总结
date: 2020-10-23 16:39:36
---

## 兄弟组件传值

### 方法

1. 子传父，父传子。

2. Vuex

3. eventBus

   - 首先我们的需求是这样的，页面上由top，left，main，bottom四个组件构成。需要将top中的值传到left中。

     <img :src="$withBase('/img/Vue/001.jpg')" alt="mixureSecure">

   - 首先创建一个eventBus.js，位置随便

     ```js
     import Vue from 'vue
     export default new Vue()
     ```

   - 在top组件中。引用eventBus.js

   - 在methods里面定义一个函数

     ```js
      methods:{
             changesize(){
                 eventBus.$emit('add',this.arg)
             }
         }
     ```

   - 点击这个事件触发

   - 在left组件中引入eventBus.js

     ```js
      create(){
             eventBus.$on('add',(message)=>{
                 //一些操作，message就是从top组件传过来的值
                 console.log(message)
             })
         }
     ```

     ## 父子组件传值

     

     

