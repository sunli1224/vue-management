// 本地存储模块封装
import storage from 'good-storage'

// 获取一个本地存储的value值
export function getStoreValue (key) {
  return storage.get(key)
}
// 设置本地存储值
export function setStoreKeyValue (key, value) {
  return storage.set(key, value)
}
// 清除指定的本地存储
export function clearStoreValue (key) {
  return storage.remove(key)
}
// 获取所有的本地存储
export function getAllStoreValue () {
  return storage.getAll()
}
