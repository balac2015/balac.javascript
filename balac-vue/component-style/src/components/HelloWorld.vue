<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p @click="handlerClick">
      For guide and recipes on how to configure / customize this project,<br>
      check out the
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'


@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  handlerClick (): void {
    console.log('click')
    
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  background: var(--background-color);
}
</style>
