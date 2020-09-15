<template>
  <div id="enter">
    <Header></Header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
    <Songsheet></Songsheet>
  </div>
</template>

<script>
import Header from "@/views/Header";
import Player from "@/components/Player";
import Songsheet from "@/components/Songsheet";
export default {
  name: "Enter",
  components: {
    Header,
    Player,
    Songsheet
  },
}
</script>

<style lang="scss" scoped>

</style>