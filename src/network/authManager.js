import { request } from './request'
import { clearStoreValue } from '../utils/storage'
import store from '../store'
import PubSub from 'pubsub-js'
import { restObj } from '../utils/objUtils'

import { createTime } from '../utils/TimeUtils'

export function changeAuthManagerInfo (id, val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/authManagerService/updateOne',
    data: {
      id: id,
      username: val.username,
      password: val.password,
      email: val.email,
      phone: val.phone,
      name: val.name,
      updated: createTime('yyyy-MM-dd hh:mm:ss')
    }
  })
}

export function changeAuthMangerInfoLogic (obj, id, val) {
  changeAuthManagerInfo(id, val).then(res => {
    if (res.code === 200) {
      obj.$message({
        message: '修改成功',
        type: 'success'
      })
      obj.addNewFloor = false
      setTimeout(() => {
        history.go(0)
      }, 50)
    }
    if (res.code === 5001) {
      clearStoreValue('token')
      obj.$message({
        message: '登录失效，请重新登录',
        type: 'warning'
      })
      obj.$router.push('/login')
    }
    if (res.code === 401) {
      clearStoreValue('token')
      obj.$message({
        message: '网络错误',
        type: 'warning'
      })
    }
    if (res.code === 500) {
      obj.$message({
        message: res.message,
        type: 'warning'
      })
    }
    // 重置btn组件
    PubSub.publish('resetBtn', true)
    restObj(this)
  }).catch(err => {
    console.log(err)
  })
}

export function insertOneUserInfo (payload) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/authManagerService/insertOne',
    data: {
      username: payload.username,
      password: payload.password,
      email: payload.email,
      phone: payload.phone,
      name: payload.name,
      created: payload.created,
      updated: payload.created
    }
  })
}

export function insertOneUserInfoLogic (obj, val) {
  insertOneUserInfo(val).then(res => {
    if (res.code === 200) {
      console.log(val)
      store.dispatch('addUserInfo', val).then(r => {
        obj.$message({
          message: '插入成功',
          type: 'success'
        })
      })
      obj.addNewFloor = false
    }
    if (res.code === 5001) {
      clearStoreValue('token')
      obj.$message({
        message: '登录失效，请重新登录',
        type: 'warning'
      })
      obj.$router.push('/login')
    }
    if (res.code === 401) {
      clearStoreValue('token')
      obj.$message({
        message: '网络错误',
        type: 'warning'
      })
    }
    if (res.code === 500) {
      obj.$message({
        message: res.message,
        type: 'warning'
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

export function searchUserInfo (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/authManagerService/searchUser/' + val
  })
}

export function searchUserInfoLogic (obj, searchType, searchContent) {
  if (searchContent !== '') {
    if (searchType === 'username') {
      searchUserInfo(searchContent).then((res) => {
        if (res.code === 5001) {
          clearStoreValue('token')
          obj.$message({
            message: '登录失效，请重新登录',
            type: 'warning'
          })
          obj.$router.push('/login')
        }
        if (res.code === 401) {
          clearStoreValue('token')
          obj.$message({
            message: '网络错误',
            type: 'warning'
          })
          // obj.$router.push('/login')
        }
        if (res.code === 200) {
          obj.$store.dispatch('getTableData', res.data.stuList).then(r => {
            obj.searchContent = ''
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}

export function delSomeUserInfo (val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/authManagerService/delSome',
    data: val
  })
}

export function delSomeUserInfoLogic (obj, val) {
  delSomeUserInfo(val).then(res => {
    if (res.code === 200) {
      if (val !== null) {
        store.dispatch('popAllUserInfoTableData', val).then(() => {
          obj.$message({
            message: '删除成功',
            type: 'success'
          })
        }).catch((err) => {
          console.log(err)
        })
      }
    }
    if (res.code === 5001) {
      clearStoreValue('token')
      obj.$message({
        message: '登录失效，请重新登录',
        type: 'warning'
      })
      obj.$router.push('/login')
    }
    if (res.code === 401 || res.code === 500) {
      clearStoreValue('token')
      obj.$message({
        message: '网络错误',
        type: 'warning'
      })
      // obj.$router.push('/login')
    }
  }).catch(err => {
    console.log(err)
  })
}

export function delOneUserInfo (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/authManagerService/delOne/' + val
  })
}

export function delOneUserInfoLogic (obj, val) {
  delOneUserInfo(val).then(res => {
    if (res.code === 200) {
      store.dispatch('popUserTableInfo', val).then(() => {
        obj.$message({
          message: '删除成功',
          type: 'success'
        })
      }).catch((err) => {
        console.log(err)
      })
    }
    if (res.code === 5001) {
      clearStoreValue('token')
      obj.$message({
        message: '登录失效，请重新登录',
        type: 'warning'
      })
      obj.$router.push('/login')
    }
    if (res.code === 401) {
      clearStoreValue('token')
      obj.$message({
        message: '网络错误',
        type: 'warning'
      })
      // obj.$router.push('/login')
    }
  }).catch(err => {
    console.log(err)
  })
}

export function pagingUserInfo (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/authManagerService/paging/' + val
  })
}

export function pagingUserInfoLogic (obj, val) {
  obj.$router.push({ path: '/home/authmanager', query: { authManagerPage: val } })
  pagingUserInfo(val).then((res) => {
    if (res.code === 5001) {
      clearStoreValue('token')
      obj.$message({
        message: '登录失效，请重新登录',
        type: 'warning'
      })
      obj.$router.push('/login')
    }
    if (res.code === 401) {
      clearStoreValue('token')
      obj.$message({
        message: '网络错误',
        type: 'warning'
      })
      // obj.$router.push('/login')
    }
    if (res.code === 200) {
      res.data.stuList.forEach(item => {
        item.password = '****'
        item.created = item.created.substr(0, 16)
        item.updated = item.updated.substr(0, 16)
      })
      obj.$store.dispatch('getTableData', res.data.stuList).then(r => {
        obj.$store.dispatch('setPageData', res.data).then(r => {
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }).catch((err) => {
    console.log(err)
    obj.$message({
      message: '请求失败',
      type: 'warning'
    })
  })
}
