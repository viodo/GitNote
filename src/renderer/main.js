import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import '@/icons'
import 'normalize.css'
import '@/styles/index.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios

Vue.use(ElementUI, {size: 'small'})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
