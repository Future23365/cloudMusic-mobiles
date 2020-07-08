<template>
  <div id="app">
    <Header></Header>
  </div>
</template>

<script>
import Header from "@/views/Header";

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 320px;
  min-height: 640px;
}
</style>
