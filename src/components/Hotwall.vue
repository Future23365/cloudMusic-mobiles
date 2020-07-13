<template>
  <div id="hotwall" >
    <div class="title">
      <span class="iconfont icon-fanhui" @click="goBack"></span>热评墙
    </div>
    <Swiper
        class="wrapper-hotwall"
        :data="hotwallData"
        :scrollX="true"
        :probeType="2"
        :eventPassthrough="vertical"
        :snap="swiperOptions.snapHotWall"
        ref="swiperChildhotwall"
      >
        <ul class="content-hotwall">
        </ul>
      </Swiper>
  </div>
</template>

<script>
import Swiper from "@/components/Swiper";
import { getHotwall } from "@/request/getdata";
export default {
  name: 'Hotwall',
  components: {
    Swiper
  },
  data() {
    return {
      hotwallData: [],
      swiperOptions: {},
      vertical:'vertical',
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.go(-1);
    },
    getHhoteallData() {
      getHotwall().then(res => {
        console.log(res);
        this.swiperOptions.snapHotwall = {
          loop: false,
          threshold: 0.1
        };
      })
    },
  },
  created() {
    this.getHhoteallData()
  }
}
</script>

<style lang="scss" scoped>
#hotwall {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: #666;
  line-height: 0.12rem;
  .title {
    margin: 0.05rem 0;
    span {
      &::before {
        margin: 0 0.02rem;
        font-size: 0.12rem;
      }
    }
  }
}
</style>