import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import permission from './permission'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'
import VCharts from 'v-charts'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)

new Vue({
  router,
  store,
  permission,
  Blob,
  Export2Excel,
  render: h => h(App)
}).$mount('#app')
