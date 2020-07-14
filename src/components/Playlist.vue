<template>
  <div id="playlist" @touchstart="touS">
    这里是歌单
  </div>
</template>

<script>
export default {
  name: 'Playlist',
  methods: {
    touS(e) {
      e.preventDefault();
    }
  }
}
</script>

<style lang="scss" scoped>
#playlist {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: #666;
}
</style>