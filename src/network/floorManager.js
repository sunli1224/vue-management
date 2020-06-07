import { request } from './request'
import { clearStoreValue } from '../utils/storage'
import store from '../store'
import PubSub from 'pubsub-js'

export function changeFloorManagerInfo (id, val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/floormanager/updateinfo',
    data: {
      empId: id,
      empName: val.empName,
      empPhone: val.empPhone,
      empNum: val.empNum,
      empSex: val.empSex,
      empAge: val.empSex,
      empAddress: val.empAddress,
      empPosition: val.empPosition
    }
  })
}

export function changeFloorManagerInfoLogic (obj, id, val) {
  changeFloorManagerInfo(id, val).then(res => {
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

export function insertOneFloorInfo (payload) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/floormanager/addinfo',
    data: {
      empName: payload.empName,
      empPhone: payload.empPhone,
      empNum: payload.empNum,
      empSex: payload.empSex,
      empAge: payload.empAge,
      empAddress: payload.empAddress,
      empPosition: payload.empPosition,
      floorName: payload.floorName
    }
  })
}
export function insertOneFloorInfoLogic (obj, empManagerInfo) {
  insertOneFloorInfo(empManagerInfo).then(res => {
    if (res.code === 200) {
      store.dispatch('addFloorManagerInfo', empManagerInfo).then(r => {
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

export function searchEmpNumContent (searchContent) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/floormanager/searchNum/' + searchContent
  })
}

export function searchEmpNameContent (searchContent) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/floormanager/searchName/' + searchContent
  })
}

export function searchContentLogic (obj, searchType, searchContent) {
  if (searchContent !== '') {
    if (searchType === 'empNum') {
      searchEmpNumContent(searchContent).then((res) => {
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
    if (searchType === 'empName') {
      searchEmpNameContent(searchContent).then((res) => {
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

export function deleteAllRecord (empIdList) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/floormanager/deletesome',
    data: empIdList
  })
}

export function deleteAllRecordLogic (obj, empIdList) {
  deleteAllRecord(empIdList).then((res) => {
    if (res.code === 200) {
      if (empIdList !== null) {
        store.dispatch('popAllEmpTableData', empIdList).then(() => {
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
  }).catch((err) => {
    console.log(err)
  })
}

export function deleteOneRecord (empId) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/floormanager/deloneinfo/' + empId
  })
}

export function deleteOneRecordLogic (obj, empId) {
  deleteOneRecord(empId).then((res) => {
    if (res.code === 200) {
      store.dispatch('popEmpTableData', empId).then(() => {
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
  }).catch((err) => {
    console.log(err)
  })
}

export function pagingHelperemp (ids) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/floormanager/floorManangerPaging/' + ids
  })
}

export function pagingHelperempLogic (obj, val) {
  obj.$router.push({ path: '/home/floormanager', query: { empPage: val } })
  pagingHelperemp(val).then((res) => {
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
