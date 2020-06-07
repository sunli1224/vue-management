import { request } from './request'
import { clearStoreValue } from '../utils/storage'
import store from '../store'
import PubSub from 'pubsub-js'

export function changeFloorInfo (id, val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/floorService/updateOne',
    data: {
      floorId: id,
      floorName: val.floorName,
      floorDetail: val.floorDetail
    }
  })
}

export function changeFloorInfoLogic (obj, id, val) {
  changeFloorInfo(id, val).then(res => {
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
/**
 * 分页服务axios
 * @param page 页数
 * @returns {AxiosPromise} axios异步对象
 */
export function pagingHelperAxios (page) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/floorService/floorPaging/' + page
  })
}

export function pagingHelperFloorLogic (obj, val) {
  obj.$router.push({ path: '/home/floor', query: { floorPage: val } })
  pagingHelperAxios(val).then((res) => {
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
          setTimeout(() => {
          }, 1000)
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

/**
 * 删除单个楼宇信息axios
 * @param floorId 楼宇id
 * @returns {AxiosPromise} axios服务
 */
export function delOneRecord (floorId) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/floorService/delfloorinfo/' + floorId
  })
}

export function delOneRecordLogic (obj, floorId) {
  delOneRecord(floorId).then((res) => {
    if (res.code === 200) {
      store.dispatch('popFloorTableData', floorId).then(() => {
        // console.log(store.state.tableData)
      }).catch((err) => {
        console.log(err)
      })
      obj.$message({
        message: '删除成功',
        type: 'success'
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

/**
 * 批量删除楼宇信息
 * @param idList 楼宇信息id集合
 * @returns {AxiosPromise} axios对象
 */
export function deleteAllRecord (idList) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/floorService/delallfloorinfo',
    data: idList
  })
}

export function deleteAllRecordLogic (obj, floorIdList) {
  deleteAllRecord(floorIdList).then((res) => {
    if (res.code === 200) {
      if (floorIdList !== null) {
        store.dispatch('popAllFloorTableData', floorIdList).then(() => {
          // console.log(store.state.tableData)
        }).catch((err) => {
          console.log(err)
        })
      }
      obj.$message({
        message: '删除成功',
        type: 'success'
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

export function insertOne (floorName, floorDetail) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/floorService/insertfloor',
    data: {
      floorName: floorName,
      floorDetail: floorDetail
    }
  })
}

export function insertOneLogic (obj, floorName, floorDetail) {
  insertOne(floorName, floorDetail).then((res) => {
    if (res.code === 200) {
      store.dispatch('addNewFloorTableData', {
        floorName: floorName,
        floorDetail: floorDetail
      }).then(r => {
        obj.$message({
          message: '插入成功',
          type: 'success'
        })
        obj.addNewFloor = false
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
    }
    if (res.code === 500) {
      obj.$message({
        message: res.message,
        type: 'warning'
      })
    }
  }).catch((err) => {
    console.log(err)
  })
}

export function searchContents (searchContent) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/floorService/searchfloor/' + searchContent
  })
}

export function searchContentLogic (obj, searchType, searchContent) {
  if (searchContent !== '') {
    if (searchType === 'floorName') {
      searchContents(searchContent).then((res) => {
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
        if (res.code === 200) {
          obj.$store.dispatch('getTableData', res.data.floorList).then(r => {
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
