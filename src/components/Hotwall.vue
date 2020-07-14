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
        :snap="swiperOptions.snapHotwall"
        :momentum="false"
        ref="swiperChildhotwall"
      >
        <ul class="content-hotwall">
          <li class="content-hotwall-li" v-for="(item, index) in hotwallData" :key="index">
            <div class="img" :style="{backgroundImage: getBgcimg(item.simpleResourceInfo.songCoverUrl)}"></div>
            <div class="mai">
              <div class="user"><img :src="item.simpleUserInfo.avatar" alt="" />{{item.simpleUserInfo.nickname}}</div>
              <div class="pun">“</div>
              “{{item.content}}”
              <div class="song">
                <span>{{item.simpleResourceInfo.song.name}}</span>
                - <span v-for="(jtem, jndex) in item.simpleResourceInfo.song.ar" :key="jndex">{{jtem.name}}</span>
              </div>
              </div>
            </li>
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
      swiperOptions: {
        snapHotwall: {
          loop: false,
          threshold: 0.1
        }
      },
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
        this.hotwallData = res.data
      })
    },
    getBgcimg(size) {
      return `url(${size})`
    }
  },
  created() {
    this.getHhoteallData();
  }
}
</script>

<style lang="scss" scoped>
#hotwall {
  overflow: hidden;
  ul {
    padding: 0;
    margin: 0;
    li {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: #666;
  line-height: 0.12rem;
  font-size: 0.12rem;
  .title {
    position: absolute;
    margin: 0.05rem 0;
    z-index: 6;
    span {
      &::before {
        margin: 0 0.02rem;
        font-size: 0.12rem;
      }
    }
  }
  .wrapper-hotwall {
    // overflow: hidden;
    width: 100vw;
    height: 100vh;
    .content-hotwall {
      width: 3000vw;
      height: 100%;
      li {
        position: relative;
        float: left;
        display: flex;
        align-items: center;
        width: 100vw;
        height: 100vh;
        .img {
          width: 100vw;
          height: 100vh;
          background-size: cover;
          filter: blur(0.08rem) brightness(70%);
        }
        .mai {
          position: absolute;
          padding: 0.08rem;
          color: #fff;
          font-size: 0.16rem;
          // letter-spacing: 0.01rem;
          line-height: 0.2rem;
          .user {
            font-size: 0.12rem;
            margin-bottom: 0.2rem;
            img {
              width: 0.12rem;
              height: 0.12rem;
              border-radius: 50%;
              margin-right: 0.05rem;
            }
          }
          .pun {
            font-size: 0.4rem;
            margin: 0;
            height: 0;
            margin-bottom: 0.1rem;
            color: rgba($color: #d3d7d4, $alpha: 0.9);
          }
          .song {
            font-size: 0.1rem;
            margin-bottom: 0.5rem;
            color: rgba($color: #d3d7d4, $alpha: 0.9);
          }
        }
      }
      
    }
  }
}
</style>