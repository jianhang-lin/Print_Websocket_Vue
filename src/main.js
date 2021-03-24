import Vue from 'vue'
import App from './App.vue'
import global from "@/global";

Vue.config.productionTip = false
Vue.prototype.$global = global

new Vue({
  render: h => h(App),
}).$mount('#app')
