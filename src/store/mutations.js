import { SET_USER_STATUS, SET_VIEW_NAME, GET_ROUTER_LIST, GET_TABLE_DATA, SET_PAGE_DATA, DELETE_TABLE_DATA, POP_TABLE_DATA, POP_ALL_TABLE_DATA, ADD_NEW_FLOOR_TABLE_DATA, SET_FLOOR_INFO_DATA, ADD_FLOOR_MANAGER_INFO, SET_HOS_INFO_DATA, CHANGE_USER_INFO, CHANGE_USER_IMG, CHANGE_USER_EMAIL, CHANGE_USER_PHONE, CHANGE_INFO_TIME } from './mutation-types'
// eslint-disable-next-line no-unused-vars
import { setStoreKeyValues } from '../utils/sessionStorage'

export const mutations = {
  [CHANGE_INFO_TIME]  (state, payload) {
    state.user.updated = payload
  },
  [CHANGE_USER_EMAIL] (state, payload) {
    state.user.email = payload
  },
  [CHANGE_USER_PHONE] (state, payload) {
    state.user.phone = payload
  },
  [CHANGE_USER_IMG] (state, payload) {
    state.user.imge = payload
  },
  [CHANGE_USER_INFO] (state, payload) {
    setStoreKeyValues('userInfo', payload)
  },
  [SET_USER_STATUS] (state, payload) {
    // 将后端传入的值存放在vuex中
    state.user = payload
    setStoreKeyValues('userInfo', payload)
  },
  [SET_VIEW_NAME] (state, payload) {
    // 动态修改视图名称
    state.viewName = payload
  },
  [GET_ROUTER_LIST] (state, payload) {
    state.asyncRouter = payload
  },
  [GET_TABLE_DATA] (state, payload) {
    state.tableData = payload
  },
  [SET_PAGE_DATA] (state, payload) {
    state.pageForm.pageSize = payload.pageSize
    state.pageForm.total = payload.recordNum
  },
  [DELETE_TABLE_DATA] (state, payload) {
    state.tableData.splice(payload, 1)
  },
  [POP_TABLE_DATA] (state, payload) {
    for (let i = 0; i < state.tableData.length + 1; i++) {
      if (state.tableData[i].stuNum === payload) {
        state.tableData.splice(i, 1)
      }
    }
  },
  [POP_ALL_TABLE_DATA] (state, payload) {
    state.tableData.splice(payload, 1)
  },
  [ADD_NEW_FLOOR_TABLE_DATA] (state, payload) {
    state.tableData.push({
      floorName: payload.floorName,
      floorDetail: payload.floorDetail
    })
  },
  [SET_FLOOR_INFO_DATA] (state, payload) {
    state.floorInfoList = payload
  },
  [ADD_FLOOR_MANAGER_INFO] (state, payload) {
    state.tableData.push(payload)
  },
  [SET_HOS_INFO_DATA] (state, payload) {
    state.selectHosByFloorNameList = payload
  }
}
