import Vue from 'vue'
import Router from 'vue-router'
import {storageManager} from '../ulits/common.js'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: '',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: (resolve) => { return require(['../view/Login.vue'], resolve) },
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      component: resolve => require(['../view/Home.vue'], resolve),
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: resolve => require(['../view/Index.vue'], resolve)
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: (resolve) => { return require(['../view/HelloWorld.vue'], resolve) }
    },
    {
      path: '*',
      redirect: {
        path: '/login'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!storageManager.getStorage('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
