import Vue from 'vue'
import axios from 'axios'
export const eventHub = new Vue()
export const storageManager = {
  getStorage: (key, transfer) => {
    let value = ''
    transfer
      ? (value = JSON.parse(window.localStorage.getItem(key)))
      : (value = window.localStorage.getItem(key))
    return value
  },
  setStorage (key, value) {
    return new Promise((resolve, reject) => {
      try {
        if (typeof value === 'object') {
          window.localStorage.setItem(key, JSON.stringify(value))
        } else {
          window.localStorage.setItem(key, value)
        }
        resolve()
      } catch (e) {
        alert('请关闭浏览器的隐身模式或无痕浏览！')
      }
    })
  },
  removeStorage: data => {
    if (data instanceof Array) {
      for (let i in data) {
        window.localStorage.removeItem(data[i])
      }
    } else {
      window.localStorage.removeItem(data)
    }
  }
}

/* ajax请求 */
export const apiData = (method, url, params) => {
  const token = storageManager.getStorage('token', false)
  const requireType = ['post', 'put', 'patch']
  return axios({
    url: url,
    method: method, // default
    // baseURL: 'https://some-domain.com/api/',
    data: requireType.indexOf(method) !== -1 ? params : '',
    params: requireType.indexOf(method) === -1 ? params : '',
    timeout: 120000,
    responseType: 'json',
    headers: { 'x-auth-token': token }
    /* 是否跨域 */
    // withCredentials: domain, // default
  })
}
