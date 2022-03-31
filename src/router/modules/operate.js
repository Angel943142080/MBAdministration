// 运营管理

const Layout = () => import('@/layout/index.vue')
const Selected = () => import('@/views/operate/Selected.vue') //精选管理
const Manbai = () => import('@/views/operate/Manbai.vue') //漫柏社区管理
const RentHouse = () => import('@/views/operate/RentHouse.vue') //租房管理
const Activity = () => import('@/views/operate/Activity.vue') //活动管理
const PartyBuilding = () => import('@/views/operate/PartyBuilding.vue') //党建管理
const Policy = () => import('@/views/operate/Policy.vue') //政策解读管理
const Integral = () => import('@/views/operate/Integral.vue') //积分管理
const Firstheart = () => import('@/views/operate/Firstheart.vue') //漫初心管理
const Life = () => import('@/views/operate/Life.vue') //漫生活管理
const Clean = () => import('@/views/operate/Clean.vue') //保洁服务管理
const StoreEntry = () => import('@/views/housingResources/StoreEntry.vue') //门店录入
// const NewStores = () => import('@/views/housingResources/NewStores.vue') //门店新增
const ListingEntry = () => import('@/views/housingResources/ListingEntry.vue') //房源录入

export default [
  {
    path: '/operate',
    component: Layout,
    name: 'operate',
    meta: {
      title: '运营管理',
    },
    icon: 'operate',
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
        path: 'selected',
        name: 'selected',
        component: Selected,
        meta: {
          title: '精选管理',
        },
      },
      {
        path: 'manbai',
        name: 'manbai',
        component: Manbai,
        meta: {
          title: '漫柏社区管理',
        },
      },
      {
        path: 'rentHouse',
        name: 'rentHouse',
        component: RentHouse,
        meta: {
          title: '租房管理',
        },
      },
      {
        path: 'activity',
        name: 'activity',
        component: Activity,
        meta: {
          title: '活动管理',
        },
      },
      {
        path: 'firstheart',
        name: 'firstheart',
        component: Firstheart,
        meta: {
          title: '漫初心管理',
        },
      },
      {
        path: 'life',
        name: 'life',
        component: Life,
        meta: {
          title: '漫生活管理',
        },
      },
      {
        path: 'clean',
        name: 'clean',
        component: Clean,
        meta: {
          title: '保洁服务管理',
        },
      },
      {
        path: 'integral',
        name: 'integral',
        component: Integral,
        meta: {
          title: '积分管理',
        },
      },
      {
        path: 'partyBuilding',
        name: 'partyBuilding',
        component: PartyBuilding,
        hidden: true, //隐藏
        meta: {
          title: '党建管理',
        },
      },
      {
        path: 'policy',
        name: 'policy',
        component: Policy,
        hidden: true, //隐藏
        meta: {
          title: '政策解读管理',
        },
      },
    ],
  },
]
