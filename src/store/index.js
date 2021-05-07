import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import userModule from './modules/user'
import managerModule from './modules/manager'
import goodsModule from './modules/goods'
import imgModule from './modules/img'
import cartModule from './modules/cart'
import addressModule from './modules/address'
import orderModule from './modules/order'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    addressModule,
    userModule,
    managerModule,
    goodsModule,
    imgModule,
    cartModule,
    orderModule
  },
  getters,
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
    }
  }
})
export default store
