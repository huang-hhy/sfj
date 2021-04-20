import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return sessionStorage.getItem('token') ? sessionStorage.getItem('token') : false
}

export function setToken(token) {
  sessionStorage.setItem('token', token)
}

export function setDeskTop(desktop) {
  sessionStorage.setItem('desktop', desktop)
}

export function getDeskTop() {
  return sessionStorage.getItem('desktop') || ''
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

