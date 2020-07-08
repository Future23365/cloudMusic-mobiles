<template>
  <div id="header">
    <div class="menu">菜单</div>
    <div class="nav-bar">
      <span>我的</span>
      <span>发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="search">搜索</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  height: 0.35rem;
  line-height: 0.35rem;
  display: flex;
  justify-content: space-between;
  span {
    margin-right: 0.1rem;
    &:nth-of-type(4) {
      margin-right: 0;
    }
  }
}
</style>