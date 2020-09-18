import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import router from '../router'
import Index from '../view/admin/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin',
      name: 'Index',
      component: Index
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
})
