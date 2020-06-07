// 个人中心模块
import { request } from './request'
import { clearStoreValue } from '../utils/storage'
import store from '../store'
import { getStoreValues, setStoreKeyValues } from '../utils/sessionStorage'
import { createTime } from '../utils/TimeUtils'

export function updateImg (val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/authManagerService/uploadImg',
    data: val
  })
}

export function updateImgLogic (obj, val) {
  updateImg(val).then(res => {
    if (res.code === 200) {
      // console.log(val)
      store.dispatch('changeUserImg', res.data.imgUrl).then(r => {
        obj.$notify({
          title: '成功',
          message: '图片上传成功',
          type: 'success'
        })
      })
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

export function updatePass (val) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/authManagerService/changeUserSecret',
    data: {
      ids: store.getters.getUserInfo.id,
      oldPass: val.oldPass,
      newPass: val.newPass,
      reNewPass: val.reNewPass
    }
  })
}

export function updatePassLogic (obj, val) {
  updatePass(val).then(res => {
    if (res.code === 200) {
      console.log(val)
      store.dispatch('changeUserInfo', val).then(r => {
        obj.$notify({
          title: '成功',
          message: '表单提交成功',
          type: 'success'
        })
      })
      obj.innerDrawer = false
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
  obj.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  }).close()
}

export function updateUserInfo (val, time) {
  return request({
    method: 'POST',
    url: '/nacos-user-provider/authManagerService/updateTwo',
    data: {
      id: store.getters.getUserInfo.id,
      email: val.email,
      phone: val.phone,
      updated: time
    }
  })
}

export function updateUserInfoLogic (obj, val) {
  setStoreKeyValues('val', val)
  var time = createTime('yyyy-MM-dd hh:mm:ss')
  updateUserInfo(val, time).then(res => {
    if (res.code === 200) {
      store.dispatch('changeUserInfo', { val: getStoreValues('val'), time: time }).then(r => {
        obj.$notify({
          title: '成功',
          message: '表单提交成功',
          type: 'success'
        })
      })
      obj.innerDrawer = false
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
  obj.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  }).close()
}
