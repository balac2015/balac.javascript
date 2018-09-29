<!--
  子组件触发父组件事件
-->
<template>
  <div id="counter-event-example">
    <p>{{ total }}</p>
    <button-counter v-on:increment="incrementTotal"></button-counter>
    <button-counter v-on:increment="incrementTotal"></button-counter>
  </div>
</template>
<script>
  import ButtonCounter from './ComponentEventChild.vue';

  export default {
//      el: '#counter-event-example',
    components: {
      ButtonCounter
    },
    data: function () {
      return {
        total: 0
      };
    },
    methods: {
      incrementTotal: function () {
        this.total += 1;
      }
    }
  };
</script>
