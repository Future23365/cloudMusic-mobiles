<template>
  <div id="back">
    <span class="iconfont icon-fanhui" @click="goBack"></span>{{text}}
  </div>
</template>

<script>
export default {
  name: 'Back',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  }
}
</script>

<style lang="scss" scoped>
#back {
  // position: absolute;
  position: sticky;
  top: 0;
  left: 0;
  padding: 0.05rem 0;
  z-index: 2;
  color: #fff;
  height: 0.2rem;
  line-height: 0.2rem;
  background-color: #DD001B;
  span {
    &::before {
      margin: 0 0.1rem;
      font-size: 0.12rem;
    }
  }
}
</style>