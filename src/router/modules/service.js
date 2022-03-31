// 服务管理
const Layout = () => import('@/layout/index.vue')
const Repair = () => import('@/views/service/index.vue') //维修服务
const CleaningService = () => import('@/views/service/CleaningService.vue') //保洁服务

export default [
  {
    path: '/service',
    component: Layout,
    name: 'service',
    meta: {
      title: '服务管理',
    },
    icon: 'customerService',
    alwaysShow: true,
    children: [
      {
        path: 'repair',
        name: 'repair',
        component: Repair,
        meta: {
          title: '维修服务',
        },
      },
      {
        path: 'cleaningService',
        name: 'cleaningService',
        component: CleaningService,
        meta: {
          title: '保洁服务',
        },
      },
    ],
  },
]
