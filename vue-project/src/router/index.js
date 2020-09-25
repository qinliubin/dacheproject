import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'
import Index from '../view/admin/index'
import Shouye from '../view/home/shouye'
import homeindex from '../view/home/homeindex'
import zhuce from '../view/home/zhuce'
import login from '../view/home/login'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {path: '/admin/index', name: 'Index', component: Index},
    {path: '/home/shouye', name: 'Shouye', component: Shouye},
    {path: '/home/homeindex', name: 'homeindex', component: homeindex},
    {path: '/home/zhuce', name: 'zhuce', component: zhuce},
    {path: '/home/login', name: 'logiin', component: login}

  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
})
