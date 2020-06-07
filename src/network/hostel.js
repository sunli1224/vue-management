import { request } from './request'
import { clearStoreValue } from '../utils/storage'
import store from '../store'
import PubSub from 'pubsub-js'
import { restObj } from '../utils/objUtils'

export function changeHostelInfo (id, val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/hostelservice/updateOne',
    data: {
      hosId: id,
      hosNum: val.hosNum,
      floorName: val.floorName
    }
  })
}

export function changeHostelInfoLogic (obj, id, val) {
  changeHostelInfo(id, val).then(res => {
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
    restObj(this)
    PubSub.publish('resetBtn', true)
  }).catch(err => {
    console.log(err)
  })
}

export function searchByFloorName (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/hostelservice/searchFloorName/' + val
  })
}

export function searchByHosNum (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/hostelservice/searchHostelNum/' + val
  })
}

export function searchContentLogic (obj, searchType, searchContent) {
  if (searchContent !== '') {
    if (searchType === 'hosNum') {
      searchByHosNum(searchContent).then((res) => {
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
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
    if (searchType === 'floorName') {
      searchByFloorName(searchContent).then((res) => {
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

export function deleteSomeHostelInfo (val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/hostelservice/deleteSome',
    data: val
  })
}

export function deleteSomeHostelInfoLogic (obj, val) {
  deleteSomeHostelInfo(val).then(res => {
    if (res.code === 200) {
      if (val !== null) {
        store.dispatch('popAllHostelTableData', val).then(() => {
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

export function delOneHostelInfo (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/hostelservice/deleteOne/' + val
  })
}

export function delOneHostelInfoLogic (obj, val) {
  delOneHostelInfo(val).then(res => {
    if (res.code === 200) {
      store.dispatch('popHosTableData', val).then(() => {
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

export function pagingHelperHostel (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/hostelservice/hostelPaging/' + val
  })
}

export function pagingHelperHostelLogic (obj, val) {
  obj.$router.push({ path: '/home/hostel', query: { hostelPage: val } })
  pagingHelperHostel(val).then((res) => {
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

export function insertOneHostel (payload) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/hostelservice/insertOne',
    data: payload
  })
}

export function insertOneHostelLogic (obj, hostelInfo) {
  insertOneHostel(hostelInfo).then(res => {
    if (res.code === 200) {
      obj.$message({
        message: '插入成功',
        type: 'success'
      })
      obj.$router.go(0)
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
