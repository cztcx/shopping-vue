
import {add, deleteImg} from '../../api/imgApi'

const state = () => {
  return {
    data: {}
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // 创建新商品
  add ({commit}, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      add(data).then(response => {
        const {data} = response
        console.log(data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteImg ({commit}, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      deleteImg(data).then(response => {
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
