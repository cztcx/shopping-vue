import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home'
import Index from '../components/Index'
import Login from '../views/login/loginPage'
import {getToken} from '../utils/auth'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    redirect: '/index/home',
    component: Index,
    children: [
      {
        path: '/index/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/index/store',
        name: 'Store',
        component: () => import('@/views/store/index')
      }
    ]

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

router.beforeEach(function (to, from, next) {
  if (!getToken()) {
    if (to.path !== '/login') {
      return next('/login')
    }
  }
  next()
})

export default router
