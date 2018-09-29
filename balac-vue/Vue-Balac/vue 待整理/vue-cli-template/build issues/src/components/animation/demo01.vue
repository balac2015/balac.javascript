<template>
  <div id="demo">
    <button v-on:click="show = !show">Toggle</button>
    <transition name="vue-transition-fade">
      <p v-if="show">hello</p>
    </transition>
    <transition name="vue-transition-slide-fade">
      <p v-if="show">hello</p>
    </transition>
    <transition name="vue-animation">
      <p v-if="show">Look at me!</p>
    </transition>

    <transition
      name=""        name 可重置 v- 的前缀

      enter-class="" enter-action-class="" leave-class="" leave-action-class=""   这4个特性自定义过渡类名

      v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-on:enter-cancelled="enterCancelled"  JavaScript 钩子
      v-on:before-leave="beforeLeave" v-on:leave="leave" v-on:after-leave="afterLeave" v-on:leave-cancelled="leaveCancelled"
    ></transition>
  </div>
</template>
<script>
  export default {
      data () {
          return {
              show: true
          }
      },
      methods: {
          // --------
          // 进入中
          // --------
          beforeEnter: function (el) {},
          enter: function (el, done) {},  // 此回调函数是可选项的设置，与 CSS 结合使用
          afterEnter: function (el) {},
          enterCancelled: function (el) {},

          // --------
          // 离开中
          // --------
          beforeLeave: function (el) {},
          leave: function (el, done) {},
          afterLeave: function (el) {},
          leaveCancelled: function (el) {}
      }
  }
</script>
<style>
  /**
   * 过渡 transition
   * v-enter 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除
   * v-enter-active 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移
   * v-leave 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除
   * v-leave-active 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除
   * <transition name="my-transition"> 可重置 v- 前缀

   * 动画 animation
   * 区别：动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。
   */

  .vue-transition-fade-enter-active, .vue-transition-fade-leave-active {
    transition: opacity .5s;
  }
  .vue-transition-fade-enter, .vue-transition-fade-leave {
    opacity: 0;
  }
  .vue-transition-slide-fade-enter-active {
    transition: all .3s ease;
  }
  .vue-transition-slide-fade-leave-active {
    transition: all .8s cubic-bezier(1, .5, .8, 1);
  }
  .vue-transition-slide-fade-enter, .vue-transition-slide-fade-leave {
    transform: translateX(10px);
    opacity: 0;
  }

  .vue-animation-enter-active {
    animation: bounce-in .5s;
  }
  .vue-animation-leave-active {
    animation: bounce-out .5s;
  }
  @keyframes bounce-in {
    0% { transform: scale(0); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
  }
  @keyframes bounce-out {
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(0); }
  }
</style>
