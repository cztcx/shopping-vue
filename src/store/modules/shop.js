import {getShopByUserId, getGoodsByShopID, getGoodsDownByShopID, GoodsDown, GoodsUp} from '../../api/shopApi'

const state = () => {
  return {
    data: {},
    goods: {},
    goodsDown: {}
  }
}

const mutations = {
  SET_DATA: (state, data) => {
    state.data = data
  },
  SET_GOODS: (state, data) => {
    state.goods = data
  },
  SET_GOODSDOWN: (state, data) => {
    state.goodsDown = data
  }
}

const actions = {

  getShopByUserId ({commit}, userId) {
    return new Promise((resolve, reject) => {
      console.log(userId)
      getShopByUserId(userId).then(response => {
        const {data} = response
        console.log(data)
        commit('SET_DATA', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getGoodsByShopID ({commit}, shopId) {
    return new Promise((resolve, reject) => {
      console.log(shopId)
      getGoodsByShopID(shopId).then(response => {
        const {data} = response
        console.log(data)
        commit('SET_GOODS', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getGoodsDownByShopID ({commit}, shopId) {
    return new Promise((resolve, reject) => {
      console.log(shopId)
      getGoodsDownByShopID(shopId).then(response => {
        const {data} = response
        console.log(data)
        commit('SET_GOODSDOWN', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  GoodsDown ({commit}, shopId) {
    return new Promise((resolve, reject) => {
      console.log(shopId)
      GoodsDown(shopId).then(response => {
        const {data} = response
        console.log(data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  GoodsUp ({commit}, shopId) {
    return new Promise((resolve, reject) => {
      console.log(shopId)
      GoodsUp(shopId).then(response => {
        const {data} = response
        console.log(data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
