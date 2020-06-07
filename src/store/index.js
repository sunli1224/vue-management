// vuex使用
import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions'
import { moudles } from './modules/modules'
import createLogger from 'vuex/dist/logger'
// 在控制台打印日志，以便更好的观察状态的变化
import { personSex, personPostion, personRole } from '../data/dataConstruction'
// eslint-disable-next-line no-unused-vars
import { getStoreValues } from '../utils/sessionStorage'

Vue.use(Vuex)
// 设置只有在开发环境的时候才打印日志
const debug = process.env.NODE_ENV !== 'production'
const state = {
  user: {
    id: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    imge: '',
    created: '',
    updated: '',
    name: '',
    enname: ''
  },
  viewName: '',
  asyncRouter: [],
  tableData: [], // 表格内容
  pageForm: {
    // 每页多少条数据
    pageSize: null,
    // 分页总记录数
    total: null
  },
  personSex: personSex,
  personPostion: personPostion,
  personRole: personRole,
  floorInfoList: [],
  selectHosByFloorNameList: []
}

const getters = {
  getPerSonRole: state => {
    return state.personRole
  },
  getHosList: state => {
    return state.selectHosByFloorNameList
  },
  getFloorInfoList: state => {
    return state.floorInfoList
  },
  getPersonPosition: state => {
    return state.personPostion
  },
  getPersonSex: state => {
    return state.personSex
  },
  getPageForm: state => {
    return state.pageForm
  },
  getUserInfo: state => { // 得到用户的信息
    return state.user
    // return getStoreValues('userInfo')
  },
  getViewName: state => { // 每个视图名称
    return state.viewName
  },
  getRoles: state => { // 获得用户所拥有的的权限
    return state.user.enname
  },
  getRouters: state => {
    return state.asyncRouter
  },
  getTableData: state => { // 得到所有的表格数据
    return state.tableData
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  moudles,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
