import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios  from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.filter('formatDate',(dateStr) => {
  const dt = new Date(dateStr)
  const y = paddingZero(dt.getFullYear())
  const m = paddingZero(dt.getMonth()+1)
  const d = paddingZero(dt.getDay())

  const mm = paddingZero(dt.getMinutes())
  const hh = paddingZero(dt.getHours())
  const ss = paddingZero(dt.getSeconds())

  return `${y}-${m}-${d} ${mm}:${hh}:${ss}`

})

function paddingZero(n) {
  return n < 10 ? '0'+ n : n
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
