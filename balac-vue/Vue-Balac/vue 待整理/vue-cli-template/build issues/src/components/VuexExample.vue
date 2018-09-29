<style lang="less">
</style>
<template>
  <div class="store-example">
  </div>
</template>
<!-- vuex 的使用，对应 store -->
<!--
 -- 更多：
        vue2.0 和 express 的全栈脚手架：https://github.com/joneqian/vue2-express

        基于 vue2 + vuex 构建一个具有 45 个页面的大型单页面应用：https://github.com/bailicangdu/vue2-elm

        Vue大型SPA项目的最佳实践：http://www.vue-js.com/topic/58c6c683a476ff95338400fd

        Vuex 2.0 源码分析：https://github.com/DDFE/DDFE-blog/issues/8


        下载实现：https://github.com/lin-xin/notepad（基于vue2.0+vuex+localStorage+sass+webpack，实现一个本地存储的记事本。兼容PC端和移动端。）
-->
<script>
    import { mapState, mapGetters } from 'vuex';

  export default {
    computed: mapState({}),
    methods: {
        // 提交 mutation 的几种方式
        mutationsHandler () {
            this.$store.commit('increment', 1);    // 调用 mutation

            this.$store.commit('decrement', {       // 载荷为对象
                amount: 1
            });

            this.$store.commit({                    // 提交 mutation 的另一中方式
                type: 'decrement',
                amount: 1
            });
        },
        // 提交 action 的几种方式
        actionHandler () {
            this.$store.dispatch('incrementAsync');

            this.$store.dispatch('incrementAsync', {
                amount: 10
            });

            this.$store.dispatch({
                type: 'incrementAsync',
                amount: 10
            });
        }
    }
  }
</script>
