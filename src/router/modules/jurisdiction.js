// 权限管理

const Layout = () => import('@/layout/index.vue')
const Personnel = () => import('@/views/jurisdiction/index.vue') //人员管理
const Role = () => import('@/views/jurisdiction/Role.vue') //角色管理
const Department = () => import('@/views/jurisdiction/Department.vue') //部门管理
const Gongneng = () => import('@/views/jurisdiction/Gongneng.vue') //功能管理
const OperationLog = () => import('@/views/jurisdiction/OperationLog.vue') //操作日志
const Sort = () => import('@/views/jurisdiction/Sort.vue') //排序

export default [
  {
    path: '/jurisdiction',
    component: Layout,
    name: 'jurisdiction',
    meta: {
      title: '权限管理',
    },
    icon: 'personnel',
    alwaysShow: true,
    children: [
      {
        path: 'personnel',
        name: 'personnel',
        component: Personnel,
        meta: {
          title: '人员管理',
        },
      },
      {
        path: 'role',
        name: 'role',
        component: Role,
        meta: {
          title: '角色管理',
        },
      },
      {
        path: 'department',
        name: 'department',
        component: Department,
        meta: {
          title: '部门管理',
        },
      },
      {
        path: 'gongneng',
        name: 'gongneng',
        component: Gongneng,
        meta: {
          title: '功能管理',
        },
      },
      {
        path: 'operationLog',
        name: 'operationLog',
        component: OperationLog,
        meta: {
          title: '操作日志',
        },
      },
      {
        path: 'sort',
        name: 'sort',
        component: Sort,
        meta: {
          title: '排序',
        },
      },
    ],
  },
]
