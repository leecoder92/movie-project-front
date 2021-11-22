import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueProfile from 'vue-profile'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')

Vue.use(VueProfile, 'vue-profile')
