import { request } from './request'
import { clearStoreValue } from '../utils/storage'

export function searchRemaingHos (val) {
  return request({
    method: 'GET',
    url: '/nacos-user-provider/hostelservice/searchRemaingHos/' + val
  })
}

export function searchContentLogic (obj, searchType, searchContent) {
  if (searchContent !== '') {
    if (searchType === 'floorName') {
      searchRemaingHos(searchContent).then((res) => {
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
