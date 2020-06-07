import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('views/index/index')
const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const Floor = () => import('views/floor/Floor')
const Student = () => import('views/student/Student')
const FloorManager = () => import('views/floormanager/FloorManager')
const Hostel = () => import('views/hostel/Hostel')
const HostelChange = () => import('views/hostelchange/HostelChange')
const HostelSearch = () => import('views/hostelsearch/HostelSearch')
const AuthManager = () => import('views/authmanager/AuthManager')
const Record = () => import('views/record/Record')
const Error = () => import('views/pagerror/404')
Vue.use(VueRouter)

export const routes = [
  {
    path: '/404',
    component: Error,
    meta: {
      title: '找不到页面'
    }
  },
  {
    path: '',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录页'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export const asyncRouter = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/student',
        component: Student,
        meta: {
          index: '1-1',
          moudle: '学生管理',
          title: '学生管理',
          roles: ['user', 'admin']
        }
      },
      {
        path: '/home/floor',
        component: Floor,
        meta: {
          index: '2-1',
          moudle: '楼宇管理',
          title: '楼宇管理',
          roles: ['user', 'admin']
        }
      },
      {
        path: '/home/floormanager',
        component: FloorManager,
        meta: {
          index: '2-2',
          moudle: '楼宇管理',
          title: '楼宇管理员管理',
          roles: ['user', 'admin']
        }
      },
      {
        path: '/home/hostel',
        component: Hostel,
        meta: {
          index: '3-1',
          moudle: '宿舍管理',
          title: '宿舍管理',
          roles: ['user', 'admin']
        }
      },
      {
        path: '/home/hostelchange',
        component: HostelChange,
        meta: {
          index: '4-1',
          moudle: '寝室调换',
          title: '寝室调换',
          roles: ['user', 'admin']
        }
      },
      {
        path: '/home/hostelsearch',
        component: HostelSearch,
        meta: {
          index: '4-2',
          moudle: '寝室调换',
          title: '寝室查询',
          roles: ['user', 'admin']
        }
      },
      {
        path: '/home/authmanager',
        component: AuthManager,
        meta: {
          index: '5-1',
          moudle: '权限管理',
          title: '权限管理',
          roles: ['admin']
        }
      },
      {
        path: '/home/record',
        component: Record,
        meta: {
          index: '6-1',
          moudle: '缺勤管理',
          title: '缺勤记录',
          roles: ['user', 'admin']
        }
      },
      {
        path: '/home/index',
        component: Index,
        meta: {
          index: '7-1',
          moudle: '数据面板',
          title: '数据面板',
          roles: ['user', 'admin']
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default router
