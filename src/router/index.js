import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home'
import Index from '../components/Index'
import Login from '../views/login/loginPage'
import Register from '../views/register/index'
import {getToken, clearToken} from '../utils/session'
import ShopOrder from '../views/shop/shopOrder'
import SetUp from '../views/shop/setUp'
import Personal from '../views/personal/index'
import Order from '../views/personal/order'
import GoodsList from '../views/goodsList/index'
import Details from '../views/details/index'
import Manage from '../views/manage/index'
import Approve from '../views/manage/approve'
import ShopManage from '../views/manage/shopManage'
import ApproveHistory from '../views/manage/approveHistory'
import ShopManageHistory from '../views/manage/shopManageHistory'
import ShopGoods from '../views/shop/shopGoods'
import AddGood from '../views/shop/addGood'
import OffShelfGoods from '../views/shop/offShelfGoods'
import HasSendOut from '../views/shop/hasSendOut'
import OrderHistory from '../views/shop/orderHistory'
import Update from '../views/personal/update'
import Cart from '../views/cart/index'
import Replace from '../views/goodsList/replace'
import Address from '../views/personal/address'
import UOrderHistory from '../views/personal/orderHistory'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    children: [
      {
        path: '/manage/approve',
        name: 'Approve',
        component: Approve
      },
      {
        path: '/manage/approveHistory',
        name: 'ApproveHistory',
        component: ApproveHistory
      },
      {
        path: '/manage/shopManage',
        name: 'ShopManage',
        component: ShopManage
      },
      {
        path: '/manage/shopManageHistory',
        name: 'ShopManageHistory',
        component: ShopManageHistory
      }
    ]
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
        path: '/index/shop',
        name: 'Shop',
        component: () => import('@/views/shop/index'),
        children: [
          {
            path: '/index/shop/shopOrder',
            name: 'ShopOrder',
            component: ShopOrder
          },
          {
            path: '/index/shop/hasSendOut',
            name: 'HasSendOut',
            component: HasSendOut
          },
          {
            path: '/index/shop/setUp',
            name: 'SetUp',
            component: SetUp
          },
          {
            path: '/index/shop/shopGoods',
            name: 'ShopGoods',
            component: ShopGoods
          },
          {
            path: '/index/shop/addGood',
            name: 'AddGood',
            component: AddGood
          },
          {
            path: '/index/shop/offShelfGoods',
            name: 'OffShelfGoods',
            component: OffShelfGoods
          },
          {
            path: '/index/shop/orderHistory',
            name: 'OrderHistory',
            component: OrderHistory
          }
        ]
      },
      {
        path: '/index/personal',
        name: 'Personal',
        component: Personal,
        children: [
          {
            path: '/index/personal/order',
            name: 'Order',
            component: Order
          },
          {
            path: '/index/personal/update',
            name: 'Update',
            component: Update
          },
          {
            path: '/index/personal/address',
            name: 'Address',
            component: Address
          },
          {
            path: '/index/personal/orderHistory',
            name: 'UOrderHistory',
            component: UOrderHistory
          }
        ]
      },
      {
        path: '/index/goodsList',
        name: 'GoodsList',
        reload: true,
        component: GoodsList
      },
      {
        path: '/index/details',
        name: 'Details',
        component: Details
      },
      {
        path: '/index/cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: '/index/replace',
        name: 'Replace',
        component: Replace
      }
    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
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
  } else {
    if (to.path === '/login') {
      clearToken()
    }
  }
  next()
})

export default router
