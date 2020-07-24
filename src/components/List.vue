<template>
  <div class="list">
    <span class="img"><slot name="img"></slot></span>
    <span class="inf">
      <div class="name"><slot name="inf-name"></slot></div>
      <div class="au"><slot name="inf-au"></slot></div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['data'],

}
</script>

<style lang="scss" scoped>
.list {
  box-sizing: border-box;
  width: 100vw;
  height: 0.5rem;
  padding: 0 0.1rem;
  overflow: hidden;
  // background-color: #666;
  display: flex;
  justify-content: start;
  // margin-bottom: 0.1rem;
  >span {
    float: left;
    height: 0.5rem;
  }
  .inf {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      // height: 0.25rem;
      font-size: 0.14rem;
      overflow: hidden;
      // line-height: 0.25rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .au {
      // height: 0.25rem;
      font-size: 0.12rem;
      overflow: hidden;
      // line-height: 0.25rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #777;
    }
  }
}
</style>