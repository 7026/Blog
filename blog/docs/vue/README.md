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

1.  props

2. eventBus(同上） 

3. $emit 

4. Vuex 

5. storage 

6. provide/inject（优点是不用层层传递了）

   - provide/inject：简单的来说->父组件通过provider来提供变量，然后在子组件中通过inject来注入变量

     :::warning 

     注意：不论子组件有多深，只要调用了inject那么就可以注入provider中的数据。而不是局限于只能从当前父组件的prop属性来获取数据。

     :::

   使用方法

   1. 定义一个parent component

      ```vue
      <template>
        <div>
          <childOne></childOne>
        </div>
      </template>
      <script>
      import childOne from '../components/test/ChildOne'
        export default {
          name: "Parent",
          provide: {
            for: "demo"
          },
          components:{
            childOne
          }
        }
      ```

      - 在这里我们父组件中provide for这个变量。

   2. 定义一个子组件

      ```vue
      <template>
        <div>
          {{demo}}
          <childtwo></childtwo>
        </div>
      </template>
      <script>
        import childtwo from './ChildTwo'
        export default {
          name: "childOne",
          inject: ['for'],
          data() {
            return {
              demo: this.for
            }
          },
          components: {
            childtwo
          }
        }
      </script>
      ```

      

   3. 定义另一个组件

      ```vue
      <template>
        <div>
          {{demo}}
        </div>
      </template>
      <script>
        export default {
          name: "childTwo",
          inject: ['for'],
          data() {
            return {
              demo: this.for
            }
          }
        }
      </script>
      ```

      > 在2个组件中我们使用inject注入了provide提供的变量for，并将它提供给了data属性

      > 从上面的这个例子可以看出，只要父组件中调用了，那么在这个组件生效的生命周期内，所有的子组件都可以调用inject来注入父组件的值。

      

