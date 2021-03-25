import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Index from '../components/Index'
import Login from '../views/login/loginPage'

Vue.use(Router)

export const routes = [
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
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: routes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
