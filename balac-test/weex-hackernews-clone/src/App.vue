<template>
  <div @androidback="back">
    <image :src="logo" class="logo"></image>
    <router-view style="flex:1"></router-view>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        logo: './assets/logo.png'
      };
    },
    methods: {
      back: function () {
        this.$router.back()
      }
    }
  }
</script>
