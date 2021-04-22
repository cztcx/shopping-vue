import Cookies from 'js-cookie'

const TokenKey = 'User'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
const NickName = 'NikeName'

export function getNickName () {
  return Cookies.get(NickName)
}

export function setNickName (nickName) {
  return Cookies.set(NickName, nickName)
}

export function removeNickName () {
  return Cookies.remove(NickName)
}
