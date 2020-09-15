<template>
  <div class="songsheet" :style="{'bottom': sheetBottom}">

  </div>
</template>

<script>
export default {
  name: 'Songsheet',
  data() {
    return {

    }
  },
  computed: {
    sheetBottom: function() {
      return this.$store.state.sheetBottom;
    }
  },
  
}
</script>

<style lang="scss" scoped>
.songsheet {
  position: fixed;
  width: 100vw;
  height: 40vh;
  background-color: #345;
  left: 0;
  bottom: -40vh;
}
</style>