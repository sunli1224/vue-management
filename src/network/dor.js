import { request } from './request'
import { clearStoreValue } from '../utils/storage'
import store from '../store'
import PubSub from 'pubsub-js'
import { restObj } from '../utils/objUtils'

export function changeDorInfo (id, val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/hostelChangeRecord/updateOne',
    data: {
      derId: id,
      detail: val.detail
    }
  })
}

export function changeDorInfoLogic (obj, id, val) {
  changeDorInfo(id, val).then(res => {
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

export function searchStuNumber (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/hostelChangeRecord/searchNum/' + val
  })
}

export function searchStuName (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/hostelChangeRecord/searchName/' + val
  })
}

export function searchStuNameLogic (obj, searchType, searchContent) {
  if (searchContent !== '') {
    if (searchType === 'stuNum') {
      searchStuNumber(searchContent).then((res) => {
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
    if (searchType === 'stuName') {
      searchStuName(searchContent).then((res) => {
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

export function insertOneDorInfo (payload) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/hostelChangeRecord/insertOne',
    data: {
      stuNum: payload.stuNum,
      stuName: payload.stuName,
      oldHosName: payload.oldHosName,
      oldFloorName: payload.oldFloorName,
      newHosName: payload.newHosName,
      newFloorName: payload.newFloorName,
      detail: payload.detail,
      recodTime: payload.recodTime
    }
  })
}

export function insertOneDorInfoLogic (obj, val) {
  insertOneDorInfo(val).then(res => {
    if (res.code === 200) {
      console.log(val)
      store.dispatch('addDorInfo', val).then(r => {
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

export function delSomeDorInfo (val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/hostelChangeRecord/delSome',
    data: val
  })
}

export function delSomeDorInfoLogic (obj, val) {
  delSomeDorInfo(val).then(res => {
    if (res.code === 200) {
      if (val !== null) {
        store.dispatch('popAllDorTableData', val).then(() => {
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

export function delOneDorInfo (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/hostelChangeRecord/delOne/' + val
  })
}

export function delOneInfoLogic (obj, val) {
  delOneDorInfo(val).then(res => {
    if (res.code === 200) {
      store.dispatch('popDorInfoTable', val).then(() => {
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

export function pagingHelperDorInfo (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/hostelChangeRecord/pagingInfo/' + val
  })
}

export function pagingHelperDorInfoLogic (obj, val) {
  obj.$router.push({ path: '/home/hostelchange', query: { hosChangePage: val } })
  pagingHelperDorInfo(val).then((res) => {
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
