<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/views/Header";

export default {
  components: {
    Header
  },
  data() {
    return {};
  },
  mounted() {}
};
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
