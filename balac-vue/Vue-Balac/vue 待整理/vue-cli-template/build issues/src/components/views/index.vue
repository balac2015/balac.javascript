<template>
	<div class="my-components">

    <!--
      $route.path 是当前路由对象的路径，会被解析为绝对路径
      to 路由跳转地址
    -->
    <router-link
      v-if="$route.path === '/my-components/markdown' || $route.path === '/my-components'"
      to="/my-components/markdown">Markdown 编辑器组件</router-link>

    <router-link
      v-if="$route.path === '/my-components/component-to-component-emit' || $route.path === '/my-components'"
      to="/my-components/component-to-component-emit">组件之间的数据传递</router-link>

    <!--子路由切换后的显示-->
    <router-view></router-view>

	</div>
</template>
<style>
  .my-components {
    padding: 20px;
    background-color: #fff;
  }
  .my-components a {
    padding: 10px 25px;
    border: 1px solid #ddd;
    text-decoration: none;
  }
  .my-components a:hover {
    background-color: #ddd;
  }
</style>
