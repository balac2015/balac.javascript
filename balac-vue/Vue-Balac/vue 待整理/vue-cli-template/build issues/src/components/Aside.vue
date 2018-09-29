<!--左侧栏-->
<style scoped lang="less">
  @font-color-active: #0099c9;
  @border-color: #ddd;

  .aside {
    max-width: 200px;
    width: 100%;
    height: 100%;
    border-right: 1px solid @border-color;
    text-align: left;

  > ul {
      padding: 50px 0 50px 15px;
    }

  a {
    display: inline-block;
    width: 100%;
    height: 35px;
    line-height: 35px;
    font-weight: bold;
    text-indent: 10px;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
  }
  .router-link-active {
    color: @font-color-active;
    border-color: @border-color;
  }
  }
</style>
<template>
  <aside id="aside" class="aside">
    <ul>
      <li v-for="page in pages" v-if="page.name">
        <router-link :to="page.path">{{page.name}}</router-link>
      </li>
    </ul>
  </aside>
</template>
<script>
  import routes from '../router';

  export default {
    data () {
      return {
        pages: routes
      };
    },
    mounted () {
        console.log( routes )
    }
  }
</script>
