import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/movies/Home.vue'
import Recommendation from '@/views/movies/Recommendation.vue'

import Community from '@/views/community/Community.vue'
import CreateArticle from '@/views/community/CreateArticle.vue'
import ArticleDetail from '@/views/community/ArticleDetail.vue'
import UpdateArticle from '@/views/community/UpdateArticle.vue'

import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'


Vue.use(VueRouter)

const routes = [
  {
    path: '/movies',
    name: 'Home',
    component: Home,
  },
  {
    path: '/movies/recommendation',
    name: 'Recommendation',
    component: Recommendation,
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
  },
  {
    path: '/community/create',
    name: 'CreateArticle',
    component: CreateArticle,
  },
  {
    path: '/community/:articleId',
    name: 'ArticleDetail',
    component: ArticleDetail,
  },
  {
    path: '/community/:articleId/update',
    name: 'UpdateArticle',
    component: UpdateArticle,
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
