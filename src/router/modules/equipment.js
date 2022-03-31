// 设备管理

const Layout = () => import('@/layout/index.vue')
const DoorLock = () => import('@/views/equipment/index.vue') //智能门锁
const WaterMeter = () => import('@/views/equipment/WaterMeter.vue') //智能水表
const WattHourMeter = () => import('@/views/equipment/WattHourMeter.vue') //智能电表
const Drag = () => import('@/views/equipment/Drag.vue') //测试拖拽

export default [
  {
    path: '/equipment',
    component: Layout,
    name: 'equipment',
    meta: {
      title: '设备管理',
    },
    icon: 'equipment',
    alwaysShow: true,
    children: [
      {
        path: 'doorLock',
        name: 'doorLock',
        component: DoorLock,
        meta: {
          title: '智能门锁',
        },
      },
      {
        path: 'waterMeter',
        name: 'waterMeter',
        component: WaterMeter,
        meta: {
          title: '智能水表',
        },
      },
      {
        path: 'wattHourMeter',
        name: 'wattHourMeter',
        component: WattHourMeter,
        meta: {
          title: '智能电表',
        },
      },
      {
        path: 'drag',
        name: 'drag',
        hidden: true,
        component: Drag,
        meta: {
          title: '拖拽',
        },
      },
    ],
  },
]
