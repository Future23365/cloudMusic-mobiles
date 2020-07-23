<template>
  <div id="searchresult">
    <Swiper
    :scrollX="true"
    :scrollY="false"
    class="swiper"
    >
      <nav>
        <span>综合</span>
        <span>单曲</span>
        <span>视频</span>
        <span>歌手</span>
        <span>专辑</span>
        <span>歌单</span>
        <span>电台</span>
        <span>用户</span>
    </nav>
    </Swiper>
    <!-- {{value}} -->
    <Comprehensive v-show="resultType === '综合'"></Comprehensive>
  </div>
</template>

<script>
import Swiper from "@/components/Swiper";
import Comprehensive from "@/components/Comprehensive"
export default {
  name: 'SearchResult',
  components: {
    Swiper,
    Comprehensive
  },
  data() {
    return {
      resultType: '综合',
    }
  },
  // watch: {
  //   value: function() {

  //   }
  // }
}
</script>

<style lang="scss" scoped>
#searchresult {
  margin-top: 0.4rem;
  .swiper {
    width: 100vw;
    height: 0.2rem;
    nav {
      height: 0.2rem;
      width: 4.8rem;
      // overflow: hidden;
      span {
        float: left;
        width: 0.4rem;
        margin-left: 0.2rem;
        line-height: 0.2rem;
        text-align: center;
      }
    }
  }
}
</style>