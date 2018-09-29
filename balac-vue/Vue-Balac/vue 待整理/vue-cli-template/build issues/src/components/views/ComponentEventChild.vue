<template>
  <button v-on:click="increment">{{ counter }}</button>
</template>
<script>
  export default {
    data: function () {
      return {
        counter: 0
      };
    },
    methods: {
      increment: function () {
        this.counter += 1;
        this.$emit('increment');
      }
    }
  };
</script>
