<template>
  <div id="back">
    <span class="iconfont icon-fanhui" @click="goBack"></span>
    <div>
      <span>{{text}}</span>
      <span>{{inf}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Back',
  props: {
    text: {
      type: String,
      default: ''
    },
    inf: {
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
  background-color: #fc3a3a;
  span {
    &::before {
      float: left;
      margin: 0 0.1rem;
      font-size: 0.12rem;
    }
  }
  div {
    height: 0.2rem;
    // width: 1rem;
    float: left;
    display: flex;
    // margin-left: 0.14rem;
    flex-direction: column;
    justify-content: center;
    span {
      margin: 0;
      font-size: 0.1rem;
      line-height: 0.12rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>