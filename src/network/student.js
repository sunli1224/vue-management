import { request } from './request'
import { getStoreValue, setStoreKeyValue, clearStoreValue } from '../utils/storage'
import store from '../store'
import PubSub from 'pubsub-js'

export function addAll (val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/stuService/addAll',
    data: val
  })
}

export function addAllLogic (obj) {
  const val = getStoreValue('excelPath')
  addAll(val).then(res => {
    if (res.code === 200) {
      // console.log(val)
      // store.dispatch('changeUserImg', res.data.imgUrl).then(r => {
      // setStoreKeyValues('excelPath', res.data)
      obj.$notify({
        title: '成功',
        message: '添加成功',
        type: 'success'
      })
      clearStoreValue('excelPath')
      history.go(0)
      // })
    }
    if (res.code === 5001) {
      clearStoreValue('token')
      obj.$notify({
        title: '登录失效',
        message: '登录失效，请重新登录',
        type: 'warning'
      })
      obj.$router.push('/login')
    }
    if (res.code === 401) {
      clearStoreValue('token')
      obj.$notify({
        title: '网络错误',
        message: '网络错误',
        type: 'warning'
      })
    }
    if (res.code === 500) {
      obj.$notify({
        title: '错误',
        message: res.message,
        type: 'warning'
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

export function uploadOne (val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/stuService/uploadOne',
    data: val
  })
}

export function uploadOneLogic (obj, val) {
  uploadOne(val).then(res => {
    if (res.code === 200) {
      // console.log(val)
      // store.dispatch('changeUserImg', res.data.imgUrl).then(r => {
      setStoreKeyValue('excelPath', res.data)
      obj.$notify({
        title: '成功',
        message: 'excel上传成功',
        type: 'success'
      })
      // })
    }
    if (res.code === 5001) {
      clearStoreValue('token')
      obj.$notify({
        title: '登录失效',
        message: '登录失效，请重新登录',
        type: 'warning'
      })
      obj.$router.push('/login')
    }
    if (res.code === 401) {
      clearStoreValue('token')
      obj.$notify({
        title: '网络错误',
        message: '网络错误',
        type: 'warning'
      })
    }
    if (res.code === 500) {
      obj.$notify({
        title: '错误',
        message: res.message,
        type: 'warning'
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

export function changeStuInfo (id, val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/stuService/update',
    data: {
      stuId: id,
      stuName: val.stuName,
      stuNum: val.stuNum,
      stuSex: val.stuSex,
      stuProfession: val.stuProfession,
      stuClass: val.stuClass,
      stuSess: val.stuSess,
      stuPhoneNumber: val.stuPhoneNumber
    }
  })
}

export function changeStuInfoLogic (obj, id, val) {
  changeStuInfo(id, val).then(res => {
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
 * 搜索服务
 * @param stuNumber 学生学号
 * @returns {AxiosPromise} 异步axios对象
 */
export function searchStuNumberService (stuNumber) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/stuService/searchStuNumber/' + stuNumber
  })
}

/**
 * 搜索服务
 * @param stuName 学生姓名
 * @returns {AxiosPromise} 异步axios对象
 */
export function searchStuNameService (stuName) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/stuService/searchStuName/' + stuName
  })
}
export function searchServiceLogic (obj, searchType, searchContent) {
  if (searchContent !== '') {
    if (searchType === 'stuNum') {
      searchStuNumberService(searchContent).then((res) => {
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
            // setStoreKeyValue('stuNum', searchContent)
            // obj.$store.dispatch('setPageData', res.data)
            // stuList
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
    if (searchType === 'stuName') {
      searchStuNameService(searchContent).then((res) => {
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
            // setStoreKeyValue('stuName', searchContent)
            // obj.$store.dispatch('setPageData', res.data)
            // stuList
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

/**
 * 删除多个学生数据axios
 * @param stuList 学号集合
 * @returns {AxiosPromise} axios对象
 */
export function deleteAllRecord (stuList) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/stuService/delAll',
    data: stuList
  })
}

/**
 * 批量删除逻辑
 * @param obj this
 * @param stuList 学生学号集合
 */
export function deleteAllRecordLogic (obj, stuList) {
  deleteAllRecord(stuList).then((res) => {
    if (res.code === 200) {
      if (stuList !== null) {
        store.dispatch('popAllTableData', stuList).then(() => {
          console.log(store.state.tableData)
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

/**
 * 删除单个学生数据的axios
 * @param stuNumber 学号
 * @returns {AxiosPromise} axios对象
 */
export function deleteOneRecord (stuNumber) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/stuService/delete/' + stuNumber
  })
}

/**
 * 根据学号去删除相应的学生数据
 * @param obj this
 * @param stuNumber 学号
 */
export function deleteOneRecordLogic (obj, stuNumber) {
  // obj.$router.push({ path: '/home/Student', query: { stuNumber: stuNumber } })
  deleteOneRecord(stuNumber).then((res) => {
    if (res.code === 200) {
      store.dispatch('popTableData', stuNumber).then(() => {
        console.log(store.state.tableData)
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
 * 分页axios
 * @param page 页数
 * @returns {AxiosPromise} axios对象
 */
export function pageHelperAxios (page) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/stuService/stuManager/' + page
  })
}

/**
 * 分页逻辑请求
 * @param obj this
 * @param val 请求页号
 */
export function pageHelperAxiosLogic (obj, val) {
  obj.$router.push({ path: '/home/Student', query: { page: val } })
  pageHelperAxios(val).then((res) => {
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
