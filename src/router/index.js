import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Index from '../components/Index'
import Login from '../views/login/loginPage'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/store',
      name: 'Store',
      component: () => import('@/views/store/index')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

export default router
