// 房源管理模块
const Layout = () => import('@/layout/index.vue') //房源管理
const StoreEntry = () => import('@/views/housingResources/StoreEntry.vue') //门店录入
const NewStores = () => import('@/views/housingResources/NewStores.vue') //门店新增
const ListingEntry = () => import('@/views/housingResources/ListingEntry.vue') //房源录入
const ListAdd = () => import('@/views/housingResources/ListAdd.vue') //房源新增

export default [
  {
    path: '/housingResources',
    component: Layout,
    name: 'housingResources',
    meta: {
      title: '房源管理',
    },
    icon: 'house',
    alwaysShow: true,
    children: [
      {
        path: 'storeEntry',
        name: 'storeEntry',
        component: StoreEntry,
        // component: resolve => require(['@/views/housingResources/StoreEntry.vue'], resolve),
        meta: {
          title: '门店管理',
        },
      },
      {
        path: 'listingEntry',
        name: 'listingEntry',
        component: ListingEntry,
        // component: resolve => require(['@/views/housingResources/ListingEntry.vue'], resolve),
        meta: {
          title: '房源管理',
        },
      },
      {
        path: 'newStores',
        name: 'newStores',
        component: NewStores,
        // component: resolve => require(['@/views/housingResources/NewStores.vue'], resolve),
        hidden: true,
        meta: {
          title: '门店新增',
        },
      },
      {
        path: 'storeList',
        name: 'storeList',
        component: ListAdd,
        // component: resolve => require(['@/views/housingResources/StoreList.vue'], resolve),
        hidden: true,
        meta: {
          title: '房源新增',
        },
      },
    ],
  },
]
