const getters = {
  token: state => state.userModule.token,
  nickName: state => state.userModule.nickName,
  id: state => state.userModule.id,
  address: state => state.addressModule.data
}
export default getters
