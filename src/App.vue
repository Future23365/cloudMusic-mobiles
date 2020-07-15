<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import Enter from "@/views/Enter"

export default {
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="scss">
ul {
  padding: 0;
  margin: 0;
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 320px;
  min-height: 640px;
}
</style>
