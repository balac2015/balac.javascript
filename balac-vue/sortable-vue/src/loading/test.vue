<template>
  <div v-loading.body="">
    loading
  </div>
</template>

<script>
  // import Draggable from './vue-draggable/index.vue'

  
  export default {
    name: 'app',
    components: {
      // Draggable,
    },
    data () {
      return {
        loading: true
      }
    }
  }
</script>