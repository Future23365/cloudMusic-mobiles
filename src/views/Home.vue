<template>
  <div id="home">
    我是发现
    <div class="swiper-main">
      <Swiper class="wrapper"
        :data="bannersData"
        :scrollX=true
        :scrollY=false
        :probeType=2
        :autoPlay=true
        :momentum=false
        :snap="swiperOptions.snap"
        @scrollToEnd="getIndex"
        ref="swiperChild"
      >
      <ul class="content" :style="{width: swiperLength}">
        <li v-for="(item, index) in bannersData" :key="index"><img :src="item.pic" alt=""></li>
      </ul>
      </Swiper>
      <div class="pager">
        <ul>
          <li v-for="(item, index) in bannersData" :key="index" :class="swiperIndex === index ? 'chooseSwiper' : ''" @click="setIndex(index)"></li>
        </ul>
      </div>
    </div>
    <div class="menu">
      <span><span class="iconfont icon-gedan"></span>歌单</span>
      <span><span class="iconfont icon-paixingbang"></span>排行榜</span>
      <span><span class="iconfont icon-diantai"></span>电台</span>
    </div>
    <div>发现好歌单</div>
    <div class="find-songsheet">
      <Swiper class="wrapper-songsheet"
        :data="songsheetData"
        :scrollX=true
        :scrollY=false
        :probeType=2
        :momentum=false
        :snap="swiperOptions.snapSheet"
        ref="swiperChildsongsheet"
      >
      <ul class="content-songsheet">
        <li v-for="(item, index) in songsheetData" :key="index"><div><img :src="item.coverImgUrl" alt=""><br>{{item.name}}</div></li>
      </ul>
      </Swiper>
    </div>
    <a href="/">aa</a>
  </div>

</template>

<script>
import { getBanner, getHighquality } from '@/request/getdata';
import Swiper from '@/components/Swiper';
export default {
  name: 'Home',
  components: {
    Swiper
  },
  data() {
    return {
      bannersData: [],
      songsheetData: [],
      vertical:'vertical',
      swiperOptions: {},
      swiperIndex: 0,
    }
  },
  methods: {
    //获取轮播图数据
    getBannerData() {
      getBanner().then(res => {
        // console.log(res)
        this.bannersData = res.banners;
      });
      this.swiperOptions.snap = {
        loop: true,
        threshold: 0.2,
      }
    },
    //获取精品歌单
    getHotlistData() {
      getHighquality(6).then(res => {
        console.log(res)
        this.songsheetData = res.playlists;
        this.swiperOptions.snapSheet = {
        loop: false,
        threshold: 0.2,
      }
      })
    },
    //轮播图小圆点位置更换
    getIndex(index) {
      this.swiperIndex = index;
      if(this.swiperIndex >= this.bannersData.length) {
        this.swiperIndex = 0;
      }
    },
    //点击小圆点调用子组件事件
    setIndex(index) {
      this.$refs.swiperChild._setIndex(index)
    },
  },
  created() {
    this.getBannerData()
  },
  mounted() {
    // this.getBannerData();
    this.getHotlistData();
  },
  computed: {
    swiperLength: function() {
      return `${(this.bannersData.length + 2) * 100}vw`
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  ul {
    padding: 0;
    margin: 0;
    li {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
  min-height: 100vh;
  
  .swiper-main {
    position: relative;
    .wrapper {
      height: 1.5rem;
      overflow: hidden;
      width: 100vw;
      ul {
        width: 1200vw;
        height: 1.5rem;
        li {
          float: left;
          img {
            width: 100vw;
          }
        }
      }
    }
    .pager {
      width: 100vw;
      position: absolute;
      display: flex;
      bottom: 0.1rem;
      justify-content: center;
      ul {
        li {
          float: left;
          width: 0.05rem;
          height: 0.05rem;
          background-color: #fff;
          margin-right: 0.02rem;
          border-radius: 50%;
        }
        .chooseSwiper {
          background: #666;
        }
      }
    }
  }
  .menu {
    display: flex;
    justify-content: space-around;
    &>span {
      // display: inline-block;
      display: flex;
      width: .6rem;
      height: .6rem;
      background-color: #6f60aa;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: .14rem;
      &>span {
        &::before {
          font-size: .14rem;
        }
      }
    }
  }
  .find-songsheet {
    .wrapper-songsheet {
      width: 100vw;
      height: 1.6rem;
      overflow: hidden;
      .content-songsheet {
        height: 1.6rem;
        overflow: hidden;
        width: 200vw;
        li {
          float: left;
          width: 33.3vw;
          display: flex;
          justify-content: space-around;
          div {
            width: 30vw;
            font-size: .10rem;
            img {
              width: 30vw;
              height: 1.25rem;
            }
          }
          
        }
        
      }
    }
  }
}

</style>