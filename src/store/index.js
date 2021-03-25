import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import userModule from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userModule
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
