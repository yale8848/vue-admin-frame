import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import style from './assets/style.scss'

import _ from 'lodash'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueProgressBar from 'vue-progressbar'
import http from './util/http.js'


Vue.prototype._ = _

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VueProgressBar)


Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

