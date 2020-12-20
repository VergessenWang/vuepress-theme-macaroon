// 使用异步函数也是可以的
// export default ({
//     Vue, // VuePress 正在使用的 Vue 构造函数
//     options, // 附加到根实例的一些选项
//     router, // 当前应用的路由实例
//     siteData, // 站点元数据
//     isServer // 当前应用配置是处于 服务端渲染 或 客户端
// }) => {
//     // ...做一些其他的应用级别的优化
// }

// import ElementUI from 'element-ui'
// import Translation from '@theme/plugins/Translation'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

// export default ({
//   Vue, // the version of Vue being used in the VuePress app
//   options, // the options for the root Vue instance
//   router, // the router instance for the app
//   siteData, // site metadata
// }) => {
//   Vue.use(ElementUI)
//   Vue.use(Translation)
// }


// import Vuex from 'vuex'
// import { sync } from 'vuex-router-sync'

// import createStore from './store'
// import types from './store/types'

import Layout from './layouts/Layout'

export default ({
    Vue,
    options,
    router
}) => {
    // Vue.use(Vuex)

    //   const store = createStore()
    //   sync(store, router)

    router.addRoutes([
        // { path: '/category/:category?', component: Layout },
        // { path: '/_posts/', component: Layout },
        // { path: '/tags/:tag?', component: Layout }
    ])

    //   router.beforeResolve((to, from, next) => {
    //     // If this isn't an initial page load.
    //     if (to.name) {
    //       // Start the route progress bar.
    //       store.commit(types.LOAD_START)
    //     }

    //     next()
    //   })

    //   router.afterEach(() => {
    //     // Complete the animation of the route progress bar.
    //     store.commit(types.LOAD_END)
    //   })

    //   options.store = store
}