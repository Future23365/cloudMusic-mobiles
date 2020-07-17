<template>
  <div class="sidebar" @touchstart="touchMove">
    <div class="main">
      <div class="rebak" @touchstart="reBack">返回</div>
      设置主题颜色
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    touchMove(e) {
      e.preventDefault();
    },
    reBack() {
      this.$emit('isRE');
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  // background-color: rgba($color: #666, $alpha: 0.5);
  .main {
    width: 80%;
    height: 100%;
    background-color: #666;
  }
}
</style>