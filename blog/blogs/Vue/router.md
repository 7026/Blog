---
title: 验证token route 跳转
date: 2020-10-22
tags:
  - Vue
categories:
  - Vue
---

:::tip 介绍
验证token route 跳转
:::
<!-- more -->

## token route 跳转正确办法

```javascript
router.beforeEach((to, from, next) => {
    if (store.state.user.token) {
        next()
    } else {
         // 这就是跳出循环的关键
        if (to.path === '/login') {
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将要跳转路由的path作为参数，传递到登录页面
            })
        }
    }
})
```

### 关于next()

- next() 和next(‘/‘)是不一样的。 

- next() 是不会再次触发 router.beforeEach

- next(‘/') 会再次触发 router.beforeEach，这样 不加判断会无限循环 router.beforeEach

  ```javascript
    if (to.path === '/login') {
       next()
      } else {
         next({
          path: '/login',
           query: { redirect: to.fullPath } // 将要跳转路由的path作为参数，传递到登录页面  
       })
     }
  ```

  