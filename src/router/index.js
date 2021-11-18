import Vue from 'vue'
import VueRouter from 'vue-router'
<<<<<<< Updated upstream
import Home from '../views/movies/Home.vue'
import Recommendation from '@/views/movies/Recommendation.vue'
import Community from '@/views/movies/Community.vue'
=======
import Home from '../views/Home.vue'
import Recommendation from '@/views/Recommendation.vue'
import Community from '@/views/Community.vue'
import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'
>>>>>>> Stashed changes

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/recommendation',
    name: 'Recommendation',
    component: Recommendation,
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
