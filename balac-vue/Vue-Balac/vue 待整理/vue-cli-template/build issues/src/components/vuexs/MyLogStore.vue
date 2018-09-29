<template>
  <div>
    <button @click="add">新增计数</button>

    <router-link to="/handler-store">跳回 handler-store</router-link>
  </div>
</template>
<script>
  export default {
      name: 'LogData',
      methods: {
          add () {
              // 获取 store 中的数据
              var count = this.$store.state.counter

              // 修改 store 中的数据
              this.$store.dispatch('addCounter', ++count)

              // 退后路由
              // this.$router.go(-1)
          }
      }
  }
</script>
