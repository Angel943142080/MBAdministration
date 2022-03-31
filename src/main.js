/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-09-29 10:08:00
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */

import { createApp } from 'vue'
import App from './App.vue'
// import 'default-passive-events'
const app = createApp(App)

// 引入element-plus
import ElementPlus, { ElMessage } from 'element-plus'
import * as ElIcons from '@element-plus/icons'
import './assets/style/element-variables.scss'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts'

// 引入中文语言包
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 引入jsonp插件  请求腾讯API
import { jsonp } from 'vue-jsonp'
app.config.globalProperties.$jsonp = jsonp

// 引入路由
import router from './router'

// 引入store
import store from './store'

// 权限控制
import './permission'

// 引入svg图标注册脚本
import 'vite-plugin-svg-icons/register'

// 全局引入样式
import './style/_flex.scss'
import './style/_common.scss'

// 注册全局组件
import * as Components from './global-components'
Object.entries(Components).forEach(([key, component]) => {
  app.component(key, component)
})

// 注册自定义指令
import * as Directives from '@/directive'
Object.values(Directives).forEach(fn => fn(app))
for (const name in ElIcons) {
  app.component(name, ElIcons[name])
}
// 错误日志
import useErrorHandler from './error-log'
useErrorHandler(app)
// vue3 给原型上挂载属性
app.config.globalProperties.$echarts = echarts
// console.log(ElMessage.success({
//   message: 'Congrats, this is a success message.',
//   type: 'success',
// }))
// provide('message', ElMessage)
app.config.globalProperties.$message = ElMessage
app
  .use(ElementPlus, {
    locale,
  })
  .use(store)
  .use(router)
  .mount('#app')
