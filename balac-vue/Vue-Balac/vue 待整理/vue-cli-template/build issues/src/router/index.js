import MyComponents from '../components/views'
import MyVuexs from '../components/vuexs'
import Home from '../components/Home'

const routers = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    name: '首页',
    component: Home
  },
  {
    path: '/my-components',
    name: '组件实现',
    component: MyComponents,
    children: [
      {
        path: 'markdown',                     // Markdown 编辑器组件
        // 懒加载
        component: resolve => require(['../components/views/Markdown.vue'], resolve)
      },
      {
        path: 'component-to-component-emit',  // 父子组件之间的事件传递
        // 懒加载
        component: resolve => require(['../components/views/ComponentEventParent.vue'], resolve)
      }
    ]
  },
  {
    path: '/my-vuexs',
    name: 'vuex实现',
    component: MyVuexs,
    // LogTime属于我们TimeEntries组件的一个子路由，所以我们依旧需要配置下我们的路由，并且利用webpack让它懒加载，减少我们首屏加载的流量
    children: [
      {
        path: 'counter',
        component: resolve => require(['../components/vuexs/Counter.vue'], resolve)
      }
    ]
  },
  {
    path: '/animation',
    name: '动画实现'
  }
]

export default routers;