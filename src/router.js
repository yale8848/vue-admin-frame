import Vue from 'vue'
import Router from 'vue-router'
import Gank from './views/Gank.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/gank/:category',
      name: 'gank',
      component: Gank
    }
  ]
})
