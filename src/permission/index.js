// 根据权限动态加载路由表
// eslint-disable-next-line import/no-duplicates
import router from '../router'
import store from '../store'
import { Message } from 'element-ui'
// eslint-disable-next-line no-unused-vars
import { getStoreValues } from '../utils/sessionStorage'
import { setStoreKeyValue, getStoreValue } from '../utils/storage'
// eslint-disable-next-line no-unused-vars,import/no-duplicates
import { asyncRouter, routes } from '../router'
// eslint-disable-next-line no-unused-vars
import { adminList, userList } from '../data/routerData'
// import { StringUtils, NumberUtils } from 'utils/TypeUtils'
let addRouFlag = false

router.beforeEach((to, from, next) => {
  if (to.query.page) {
    // if (StringUtils(to.query.page)) {
    setStoreKeyValue('stuPage', to.query.page)
    // }
  }
  if (to.query.floorPage) {
    // if (NumberUtils(to.query.floorPage))
    setStoreKeyValue('floorPage', to.query.floorPage)
  }
  if (to.query.empPage) {
    // if (NumberUtils(to.query.empPage)) {
    setStoreKeyValue('empPage', to.query.empPage)
    // }
  }
  if (to.query.hostelPage) {
    setStoreKeyValue('hostelPage', to.query.hostelPage)
  }
  if (to.query.recordPage) {
    setStoreKeyValue('recordPage', to.query.recordPage)
  }
  if (to.query.hosChangePage) {
    setStoreKeyValue('hosChangePage', to.query.hosChangePage)
  }
  if (to.query.authManagerPage) {
    setStoreKeyValue('authManagerPage', to.query.authManagerPage)
  }
  document.title = to.meta.title
  // 检查storage中是否有token字段 判定用户是否登录
  const token = getStoreValue('token')
  if (token) {
    next()
    if (!addRouFlag) {
      addRouFlag = true
      // 鉴权
      // 登录后从vuex里获得用户updated
      // const role = ['admin']
      // const role = store.getters.getRoles
      // if (to.path !== '/login') {
      //   // router.go(0)
      //   var role = getStoreValues('userInfo').enname
      //   // var role = store.getters.user.enname
      // }
      // if (role) {
      //   var roleList = []
      //   roleList.push(role)
      //   // 根据角色去获得对应的路由表
      //   // console.log(getRoutes)
      //   console.log('角色' + roleList)
      //   let routerList
      //   if (role === 'admin') {
      //     routerList = adminList
      //   }
      //   if (role === 'user') {
      //     routerList = userList
      //   }
      //   const getRoutes = baseRoleGetRouters(asyncRouter, roleList)
      //   console.log('sss' + routerList)
      //   // 与固定的路由和获得路由组合，动态加载到vue-router里面
      //   store.dispatch('getRouterList', routerList).then(() => {
      //     router.addRoutes(getRoutes.concat(routes))
      //     router.push({ path: to.path })
      //   }).catch(() => {
      //     Message.error('登录出错，请重新登录')
      //     next('/')
      //   })
      // } else {
      //   // Message.error('网络延时，请重新登录')
      //   // next('/login')
      //   // 如果未拿到值就再次刷新直到取到role角色值
      //   if (to.path !== '/login') {
      //     router.go(0)
      //   }
      // }
    }
  } else {
    // 用户没登录，跳转到登录页面
    if (to.path === '/login') { // 如果是登录页面路径，就直接next()
      next()
    } else { // 不然就跳转到登录
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  if (to.path !== '/login') {
    // router.go(0)
    var role = getStoreValues('userInfo').enname
    // var role = store.getters.user.enname
  }
  if (role) {
    var roleList = []
    roleList.push(role)
    // 根据角色去获得对应的路由表
    // console.log(getRoutes)
    console.log('角色' + roleList)
    let routerList
    if (role === 'admin') {
      routerList = adminList
    }
    if (role === 'user') {
      routerList = userList
    }
    const getRoutes = baseRoleGetRouters(asyncRouter, roleList)
    // 与固定的路由和获得路由组合，动态加载到vue-router里面
    store.dispatch('getRouterList', routerList).then(() => {
      router.addRoutes(getRoutes.concat(routes))
      router.push({ path: to.path })
    }).catch(() => {
      Message.error('登录出错，请重新登录')
      router.push('/')
    })
  } else {
    // Message.error('网络延时，请重新登录')
    // next('/login')
    // 如果未拿到值就再次刷新直到取到role角色值
    if (to.path !== '/login') {
      router.go(0)
    }
  }
})

function hasPermission (route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
// 根据用户的角色取到该用户对应的路由
// eslint-disable-next-line no-unused-vars
function baseRoleGetRouters (allRoutes, roles) {
  // allRoutes是动态路由表
  // roles是取到的用户角色，数组
  const rightRoutes = allRoutes.filter((route, index) => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = baseRoleGetRouters(route.children, roles)
      }
      return true
    }
    return false
  })
  return rightRoutes
}
