<template>
  <div id="home">
    我是发现
    <div class="swiper-main">
      <Swiper class="wrapper"
        :data="bannersData"
        :scrollX=true
        :probeType=2
        :autoPlay=true
        :momentum=false
        :eventPassthrough="vertical"
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
    <div class="title">发现好歌单</div>
    <div class="find-songsheet">
      <Swiper class="wrapper-songsheet"
        :data="songsheetData"
        :scrollX=true
        :probeType=2
        :eventPassthrough="vertical"
        :snap="swiperOptions.snapSheet"
        ref="swiperChildsongsheet"
      >
        <div class="content-songsheetpar">
          <ul class="content-songsheet">
            <li v-for="(item, index) in songsheetData" :key="index"><div><img :src="item.coverImgUrl" alt=""><br>{{item.name}}</div></li>
          </ul>
        </div>
      </Swiper>
    </div>
    <div class="title">发现新音乐</div>
    <div class="find-songs">
      <Swiper class="wrapper-songs"
        :data="newSongData.a"
        :scrollX=true
        :probeType=1
        :momentum=false
        :eventPassthrough="vertical"
        :snap="swiperOptions.snapSongs"
        ref="swiperChildsongs"
      >
        <ul class="content-songs">
          <li>
            <div v-for="(item, index) in newSongData.a" :key="index">
              <img :src="item.picUrl" alt="">
              <div>
                <span>{{item.name}}</span><br>
                <span v-for="(jtem, jndex) in item.song.artists" :key="jndex">{{jtem.name}}</span>
              </div>
            </div>
          </li>
          <li>
            <div v-for="(item, index) in newSongData.b" :key="index">
              <img :src="item.picUrl" alt="">
              <div>
                <span>{{item.name}}</span><br>
                <span v-for="(jtem, jndex) in item.song.artists" :key="jndex">{{jtem.name}}</span>
              </div>
            </div>
          </li>
          <li>
            <div v-for="(item, index) in newSongData.c" :key="index">
              <img :src="item.picUrl" alt="">
              <div>
                <span>{{item.name}}</span><br>
                <span v-for="(jtem, jndex) in item.song.artists" :key="jndex">{{jtem.name}}</span>
              </div>
            </div>
          </li>
        </ul>
      </Swiper>
    </div>
    <div class="title">发现新专辑</div>
    <div class="find-album">
      <Swiper class="wrapper-album"
        :data="albumData"
        :scrollX=true
        :probeType=2
        :eventPassthrough="vertical"
        :snap="swiperOptions.snapAlbum"
        ref="swiperChildalbum"
      >
        <div class="content-albumpar">
          <ul class="content-album">
            <li v-for="(item, index) in albumData" :key="index"><div><img :src="item.blurPicUrl" alt=""><br>{{item.name}}</div></li>
          </ul>
        </div>
      </Swiper>
    </div>
    <div class="title">发现新视频</div>
    <a href="/">aa</a>
  </div>

</template>

<script>
import { getBanner, getHighquality, getsongNew, getNewwest } from '@/request/getdata';
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
      newSongData: {a: [], b: [], c: []},
      albumData: [],
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
        // console.log(res)
        this.songsheetData = res.playlists;
        this.swiperOptions.snapSheet = {
          loop: false,
          threshold: 0.1,
        }
        // let that = this;
        // setInterval(function() {
        //   console.log(that.$refs.swiperChildsongsheet._setRefresh())
        // }, 100)
        // this.$refs.swiperChildsongsheet._setRefresh();
      })
    },
    //获取推荐新音乐
    getNewsongData() {
      getsongNew().then(res => {
        console.log(res);
        this.newSongData.a = res.result.slice(0,3);
        this.newSongData.b = res.result.slice(3,6);
        this.newSongData.c = res.result.slice(6,9);
        this.swiperOptions.snapSongs = {
          loop: false,
          threshold: 0.1,
        }
      })
    },
    //获取新专辑
    getAlbumData() {
      getNewwest().then(res => {
        console.log(res);
        this.albumData = res.albums;
        this.swiperOptions.snapAlbum = {
          loop: false,
          threshold: 0.1,
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
    this.getBannerData();
    this.getHotlistData();
    this.getNewsongData();
    this.getAlbumData();
    
    
  },
  mounted() {
    // this.getBannerData();
    
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
      width: 33.3vw;
      height: 1.6rem;
      // overflow: hidden;
      .content-songsheetpar {
        height: 1.6rem;
        width: 133.3vw;
        .content-songsheet {
          height: 1.6rem;
          // overflow: hidden;
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
  .title {
    margin-top: 0.2rem;
  }
  .find-songs {
    .wrapper-songs {
      height: 1.8rem;
      width: 100vw;
      .content-songs {
        width: 300vw;
        height: 1.8rem;
        li {
          width: 100vw;
          float: left;
          div {
            height: 0.5rem;
            width: 100vw;
            margin-bottom: 0.1rem;
            padding: 0 0.0619rem;
            vertical-align: top;
            img {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 0.04rem;
            }
            div {
              // background-color: #666;
              display: inline-block;
              width: 100vw - 18.6666667vw;
            }
          } 
        }
      }
    }
  }

  .find-album {
    .wrapper-album {
      width: 33.3vw;
      height: 1.6rem;
      // overflow: hidden;
      .content-albumpar {
        height: 1.6rem;
        width: 333.3vw;
        .content-album {
          height: 1.6rem;
          // overflow: hidden;
          width: 400vw;
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
}

</style>