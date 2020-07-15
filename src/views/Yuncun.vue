<template>
  <div id="yuncun">
    <div class="hotwall" @click="goHotwall">
      <span class="title">云村热评墙</span>
      <span class="date">
        <div>{{new Date().toString().split(' ')[1]}}.</div>
        <div>{{new Date().toString().split(' ')[2]}}</div>
        </span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Yuncun',
  data() {
    return {

    }
  },
  methods: {
    goHotwall() {
      this.$router.push('/Home/Yuncun/Hotwall');
    }
  },
}
</script>

<style lang="scss" scoped>
#yuncun {
  padding: 0.0619rem;

  .hotwall {
    position: relative;
    width: 100%;
    height: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #6950a1;
    color: #fff;
    // filter:blur(0.005rem);
    border-radius: 0.02rem;
    // &::before {
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 0.5rem;
    //   filter:blur(0.005rem);
    // }
    span {
      position: relative;
      margin: 0 0.1rem;
    }
    .title {
      &::after {
        content: '';
        position: absolute;
        right: -0.06rem;
        top: 0.03rem;
        width: 0.06rem;
        height: 0.06rem;
        border: 2px solid #fff;
        border-left-color: transparent;
        border-bottom-color: transparent;
        transform: rotate(45deg);
      }
    }
    .date {
      div {
        &:nth-of-type(1) {
          font-size: 0.1rem;
        }
        &:nth-of-type(2) {
          font-size: 0.14rem;
        }
      }
    }
  }
}
</style>