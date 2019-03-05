import Vue from 'vue'
import Router from 'vue-router'
import Gank from './views/Gank.vue'
import UserInfo from './views/UserInfo.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/gank/:category',
      name: 'gank',
      component: Gank
    },
		{
		  path: '/userInfo',
		  name: 'userInfo',
		  component: UserInfo
		},
  ]
})
