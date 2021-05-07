const token = 'token'
const userName = 'userName'
const isSeller = 'isSeller'
const id = 'ID'

export function setToken (value) {
  sessionStorage.setItem(token, value)
}

export function getToken () {
  return sessionStorage.getItem(token)
}

export function setUserName (value) {
  sessionStorage.setItem(userName, value)
}

export function getUserName () {
  return sessionStorage.getItem(userName)
}

export function setIsSeller (value) {
  sessionStorage.setItem(isSeller, value)
}

export function getIsSeller () {
  return sessionStorage.getItem(isSeller)
}
export function setId (value) {
  sessionStorage.setItem(id, value)
}

export function getId () {
  return sessionStorage.getItem(id)
}

export function clearToken () {
  return sessionStorage.clear()
}
