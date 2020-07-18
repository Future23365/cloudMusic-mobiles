<template>
  <div id="app">
    <router-view></router-view>
    <audio :src="songUrl" ref="audio"></audio>
  </div>
</template>

<script>


export default {
  data() {
    return {};
  },
  computed: {
    songUrl: function() {
      return this.$store.state.songUrl;
    },
    isPlay: function() {
      return this.$store.state.songPlay;
    }
  },
  watch: {
    isPlay() {
      if(this.isPlay) {
        this.$refs.audio.play();
      }else {
        this.$refs.audio.pause();
      }
    }
  }
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
