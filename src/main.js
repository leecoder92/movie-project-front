import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueProfile from 'vue-profile'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')

Vue.use(VueProfile, 'vue-profile')
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
