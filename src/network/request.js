import axios from 'axios'
import { getStoreValue } from '../utils/storage'

// 方式四 axios 网络请求封装
export function request (config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:9786',
    timeout: 60000
  })

  // 请求拦截
  instance.interceptors.request.use(param => {
    // 如果storage里面有token则将其加到http请求的header中，进行校验token是否有效
    if (getStoreValue('token')) {
      param.headers.Authorization = getStoreValue('token')
    }
    console.log(param)
    return param
  }, error => {
    console.log(error)
  })
  // 返回拦截
  instance.interceptors.response.use(value => {
    console.log('返回拦截器')
    console.log(value.data)
    return value.data
  }, error => {
    console.log(error)
  })

  return instance(config)
}
// request({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res.data.data.banner)
// }).catch(err => {
//   console.log(err)
// })

// 方式三
// export function request (config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//
//     instance(config).then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }
//
// request({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res.data.data.banner)
// }).catch(err => {
//   console.log(err)
// })

// 方式二
// export function request (config) {
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//
//   instance(config.baseconfig).then(res => {
//     config.success(res)
//   }).catch(err => {
//     config.failure(err)
//   })
// }
//
// request({
//   baseconfig: {
//     url: '/home/multidata'
//   },
//   success: function (res) {
//     console.log(res.data.data.banner)
//   },
//   failure: function (err) {
//     console.log(err)
//   }
// })
// 方式1
// export function request (config, success, failure) {
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//
//   return instance(config).then(res => {
//     success(res)
//   }).catch(err => {
//     failure(err)
//   })
// }
//
// request({
//   url: '/home/multidata'
// }, res => {
//   console.log(res.data.data.banner)
// }, err => {
//   console.log(err)
// })
