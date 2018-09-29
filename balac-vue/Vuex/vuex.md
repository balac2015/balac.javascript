### vuex

    抽取出组件的共享状态，以一个全局单例模式模式管理。（适合大中型单页应用，在小项目中可使用 Event Bus）
  


vuex 购物车：
  http://xlbd.me/vue-vuex-shopping-cart/

  http://xiaoluoboding.github.io/vue-demo-collection/shopping-cart/#!/

  https://github.com/xiaoluoboding/vue-demo-collection/tree/master/shopping-cart

问题：多组件间的通信（组件实例的作用域是孤立的，借助共有的父组件通过自定义事件实现）：dispatch, broadcast, on

解决：vuex  