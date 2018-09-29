<style lang="less">
</style>
<template>
  <div class="store-example">
  </div>
</template>

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
