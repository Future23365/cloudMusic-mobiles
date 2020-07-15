<template>
  <div id="enter">
    <Header></Header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "@/views/Header";
export default {
  name: "Enter",
  components: {
    Header
  },
}
</script>

<style lang="scss" scoped>

</style>