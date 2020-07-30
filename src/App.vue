<template>
  <div id="app">
    <keep-alive exclude="VideoPlay,Detail">
      <router-view></router-view>
    </keep-alive>
    <audio :src="songUrl" ref="audio" @durationchange="setAllTime" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>


export default {
  data() {
    return {};
  },
  methods: {
    setAllTime() {
      this.$store.commit("setAlltime", this.$refs.audio.duration);
      console.log('设置事件');
      console.log(this.$store.state.allTime)
    },
    updateTime() {
      // console.log(this.$refs.audio.currentTime);
      this.$store.commit("setrealTime", this.$refs.audio.currentTime)
    }
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
  // overflow: hidden;
}
</style>
