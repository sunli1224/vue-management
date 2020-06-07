import sessionStorage from 'sessionstorage'
// 获取一个本地存储的value值
export function getStoreValues (key) {
  return JSON.parse(sessionStorage.getItem(key))
}
// 设置本地存储值
export function setStoreKeyValues (key, value) {
  return sessionStorage.setItem(key, JSON.stringify(value))
}
// 清除指定的本地存储
export function clearStoreValue (key) {
  return sessionStorage.removeItem(key)
}
// 获取所有的本地存储
export function clearAll () {
  return sessionStorage.clear()
}
