---
title: Vuex
date: 2020-05-27
---

## 简介

1. Vuex通常在src/store文件夹内

2. Vuex 包括

   - state 存放状态
   - mutations state成员操作
   - getter 加工state成员给外界
   - actions 异步操作
   - modules 模块化状态管理

3. 初始化store下index.js中的内容

   ```js
   import Vue from 'vue'
   import Vuex from 'vuex'
   //挂载Vuex
   Vue.use(Vuex)
   //创建VueX对象
   const store = new Vuex({
       state:{
           //存放的键值对就是所要管理的状态
           name:'helloVueX'
       }
   })
   export default store
   ```

   

4. 挂载store到当前项目中。main.js

   ```js
   import Vue from 'vue'
   import App from './App'
   import router from './router'
   import store from './store'
   Vue.config.productionTip = false
   new Vue({
     el: '#app',
     router,
     store,  //store:store 和router一样，将我们创建的Vuex实例挂载到这个vue实例中
     render: h => h(App)
   })
   ```

5. 在组件中使用Vuex

   ```vue
   <template>
       <div id='app'>
           name:
           <h1>{{ $store.state.name }}</h1>
       </div>
   </template>
   ...,
   methods:{
       add(){
         console.log(this.$store.state.name)
       }
   },
   ...
   ```

   :::warning 

   注意，请不要在此处更改state中的状态的值

   :::

   

## 工作流程

如下图：

​		 <img :src="$withBase('/img/vue/002.png')" alt="mixureSecure">

- 首先，Vue组件如果调用某个VueX的方法过程中需要向后端请求时或者说出现异步操作时，需要dispatch VueX中actions的方法，以保证数据的同步。可以说，action的存在就是为了让mutations中的方法能在异步操作中起作用。
- 如果没有异步操作，那么我们就可以直接在组件内提交状态中的Mutations中自己编写的方法来达成对state成员的操作。注意，s不建议在组件中直接对state中的成员进行操作，这是因为直接修改(例如：this.$store.state.name = 'hello')的话不能被VueDevtools所监控到。

### Mutations

> Mutations是操作state数据放啊的集合，比如数据的修改、增加、删除等等

#### 使用方法

- mutations 方法都有默认形参([state] [,payload])

- state 是当前Vuex对象中的state

- payload是该方法在被调用时传递参数使用的

  - 例：我们编写一个方法，当被执行时，能把下列中的name值修改为”jack“，我们只需要这样做

    ```js
    // index.js
    
    import Vue from 'vue'
    import Vuex from 'vuex'
    
    Vuel.use(Vuex)
    
    const store = new Vuex({
        state:{
            name:'helloVuex'
        },
        mutations:{
            edit(state){
                state.name='jack'
            }
        }
    })
    
    export default store
    ```

  - 而在组件中，我们需要这样去调用这个mutation——例如在App.vue的某个method中：

    ```js
    this.$store.commit('edit')  
    ```

  

#### 传值

> 在实际生产过程中，会遇到需要在提交某个mutation是需要携带一些参数给方法使用

- 单个值提交时

  ```js
  this.$store.commit('edit',15)
  ```

  

- 当需要多参提交时，推荐把它们放在一个对象中来提交：

  ```js
  this.$store.commit('edit',{age：15，sex:'男'})
  ```

- 接收挂载参数时:

  ```js
  edit(state,payload){
      state.name = 'jack'
      console.log(payload) // 15或{age:15,sex:'男'}
  }
  ```

- 另一种提交方式

  ```js
  this.$store.commit({
      type:'edit',
      payload:{
          age:15,
          sex:'男'
      }
  })
  ```

- 增删state中的成员

  - 为了配合Vue的响应式数据，我们在Mutations方法中，应当使用Vue提供的方法进行操作。如果使用delete或者xx.xx = xx的形式去删或者增，则Vue不能对数据进行实时响应。

  - Vue.set 为某个对象设置成员的值，若不存在则新增

  - 例如对state对象中添加一个age成员

    ```js
    Vue.set(state,'age',15)
    ```

  - Vue.delete删除成员

  - 将刚刚添加age成员删除

    ```js
    Vue.delete(state,'age')
    ```

### Getters

> 可以对state中的成员加工后传递给外界

`Getters`中的方法有两个默认参数

- state当前VueX对象中的状态对象

- getters当前getters对象，用于将getters下的其他getter拿来用

  ```js
  getters:{
    nameInfo(state){
      return "姓名” + state.name
    },
    fullInfo(state,getters){
      return getters.nameInfo + '年龄' + state.age
    }
  }
  ```

  

#### 组件中调用

```js
this.$store.getters.fullInfo
```



### Actions

> 由于直接在mutation方法中进行异步操作，将会引起数据失效。所以提供了Actions来专门进行一步操作，最终提交`mutation`方法。

`Actions`中的方法有两个默认参数

- `context`上下文(相当于箭头函数中的this)对象
- `payload`挂载参数

例如,我们在两秒钟后执行上文中的`edit`方法
由于`setTimeout`是异步操作，所以需要使用`actions`

```js
actions:{
        aEdit(context,payload){
            setTimeout(()=>{
                context.commit('edit',payload)
            },2000)
        }
    }
```

<a>https://www.jianshu.com/p/2e5973fe1223</a>

