<!--store 处理-->
<template>
  <div>
    <!--
      $route.path 是当前路由对象的路径，会被解析为绝对路径
      to 路由跳转地址
    -->
    <router-link
      v-if="$route.path !== '/handler-store/log-store'"
      to="/handler-store/log-store">去 log-store 新增</router-link>

    <div v-if="$route.path === '/handler-store/log-store'"></div>

    <!--子路由-->
    <router-view></router-view>

    <!--该组件内容-->
    <div style="margin: 50px; padding: 20px; border: 1px solid #ccc;">{{ plans }}</div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
      name: 'HandlerData',

      /**
       * 从 store 中获取数据
       * /
      /*computed: {
          plans () {
              return this.$store.state.counter
          }
      },*/
      // 使用 mapState 辅助函数
      computed: mapState({
          plans: state => state.counter
      }),
      // 若计算属性名与 state 子节点名相同，可传入字符串数组 mapState(['counter'])
//      computed: mapState(['counter']),

      methods: {
          deletePlan (idx) {
//            // 减去总时间
//            this.$store.dispatch('deTotalTime', this.plans[idx].totalTime)
//            // 删除该计划
//            this.$store.dispatch('deletePlan', idx)
          }
      },
    beforeMount () {
          this.$store.dispatch('storeFindStore')
          // 需要 import store from './store'
//      store.dispatch('FETCH_LIST_DATA', 'top').then(() => {
//          console.log( this.$store.getters.activeItems )
//      })
//    this.axios.get('https://hacker-news.firebaseio.com').then((response) => {
//        console.log(response.data)
//    })
    }
  }
</script>
