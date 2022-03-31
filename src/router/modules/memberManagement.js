// 会员管理

const Layout = () => import('@/layout/index.vue')
const Member = () => import('@/views/memberManagement/index.vue')

export default [
  {
    path: '/memberManagement',
    component: Layout,
    name: 'memberManagement',
    meta: {
      title: '会员管理',
    },
    icon: 'diamonds',
    alwaysShow: true,
    children: [
      {
        path: 'member',
        name: 'member',
        component: Member,
        meta: {
          title: '会员',
        },
      },
    ],
  },
]
