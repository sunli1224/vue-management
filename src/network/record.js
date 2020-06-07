import { request } from './request'
import { clearStoreValue } from '../utils/storage'
import store from '../store'
import PubSub from 'pubsub-js'
export function changeRecordInfo (id, val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/recordService/updateOne',
    data: {
      recodId: id,
      stuNum: val.stuNum,
      stuName: val.stuName,
      floorName: val.floorName,
      hosName: val.hosName,
      recordDetail: val.recordDetail
    }
  })
}

export function changeRecordInfoLogic (obj, id, val) {
  changeRecordInfo(id, val).then(res => {
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
  }).catch(err => {
    console.log(err)
  })
}

export function searchHos (floorName) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/recordService/searchHos/' + floorName
  })
}

export function searchHosLogic (obj, floorName) {
  searchHos(floorName).then(res => {
    store.dispatch('setHosInfoData', res.data.stuList).then(res => {
    })
  }).catch(err => {
    console.log(err)
  })
}

export function insertOneRecord (payload) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/recordService/insertOne',
    data: {
      stuNum: payload.stuNum,
      stuName: payload.stuName,
      floorName: payload.floorName,
      hosName: payload.hosName,
      recordDetail: payload.recordDetail,
      recodTime: payload.recodTime
    }
  })
}

export function insertOneRecordLogic (obj, val) {
  insertOneRecord(val).then(res => {
    if (res.code === 200) {
      store.dispatch('addRecordInfo', val).then(r => {
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

export function searchStuName (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/recordService/searchName/' + val
  })
}

export function searchStuNumber (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/recordService/searchNum/' + val
  })
}

export function searchContentLogic (obj, searchType, searchContent) {
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

export function deleteSomeRecord (val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/recordService/delSome',
    data: val
  })
}

export function deleteSomeRecordLogic (obj, val) {
  deleteSomeRecord(val).then(res => {
    if (res.code === 200) {
      if (val !== null) {
        store.dispatch('popAllRecordTableData', val).then(() => {
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

export function deleteOneRecord (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/recordService/delOne/' + val
  })
}

export function deleteOneRecordLogic (obj, val) {
  deleteOneRecord(val).then(res => {
    if (res.code === 200) {
      store.dispatch('popRecordTableInfo', val).then(() => {
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

export function pagingHelperRecord (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/recordService/recordPaging/' + val
  })
}

export function pagingHelperRecordLogic (obj, val) {
  obj.$router.push({ path: '/home/record', query: { recordPage: val } })
  pagingHelperRecord(val).then((res) => {
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
        item.recodTime = item.recodTime.substr(0, 16)
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
