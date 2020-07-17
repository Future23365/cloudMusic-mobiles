<template>
  <div id="enter">
    <Header></Header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import Header from "@/views/Header";
import Player from "@/components/Player";
export default {
  name: "Enter",
  components: {
    Header,
    Player
  },
}
</script>

<style lang="scss" scoped>

</style>