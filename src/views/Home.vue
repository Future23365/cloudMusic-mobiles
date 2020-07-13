<template>
  <div id="home">
    <div class="swiper-main">
      <Swiper
        class="wrapper"
        :data="bannersData"
        :scrollX="true"
        :probeType="2"
        :autoPlay="true"
        :momentum="false"
        :eventPassthrough="vertical"
        :snap="swiperOptions.snap"
        @scrollToEnd="getIndex"
        ref="swiperChild"
      >
        <ul class="content" :style="{ width: swiperLength }">
          <li v-for="(item, index) in bannersData" :key="index">
            <img :src="item.pic" alt="" @click="bannerClick(item)"/>
            <div class="typeTitle" :style="{backgroundColor: item.typeTitle === '独家' ? '#ed1941' : ''}">{{ item.typeTitle }}</div>
          </li>
        </ul>
      </Swiper>
      <div class="pager">
        <ul>
          <li
            v-for="(item, index) in bannersData"
            :key="index"
            :class="swiperIndex === index ? 'chooseSwiper' : ''"
            @click="setIndex(index)"
          ></li>
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
      <Swiper
        class="wrapper-songsheet"
        :data="songsheetData"
        :scrollX="true"
        :probeType="2"
        :eventPassthrough="vertical"
        :snap="swiperOptions.snapSheet"
        ref="swiperChildsongsheet"
      >
        <div class="content-songsheetpar">
          <ul class="content-songsheet">
            <li v-for="(item, index) in songsheetData" :key="index">
              <div>
                <img :src="item.coverImgUrl" alt="" />
                <br />{{ item.name }}
                <span class="sheet-playcount"><span class="iconfont icon-bofang"></span>{{localeString(item.playCount)}}</span>
              </div>
            </li>
          </ul>
        </div>
      </Swiper>
    </div>
    <div class="title">发现新音乐</div>
    <div class="find-songs">
      <Swiper
        class="wrapper-songs"
        :data="newSongData.a"
        :scrollX="true"
        :probeType="1"
        :momentum="false"
        :eventPassthrough="vertical"
        :snap="swiperOptions.snapSongs"
        ref="swiperChildsongs"
      >
        <ul class="content-songs">
          <li v-for="(jtem, jndex) in newSongData" :key="jndex">
            <div v-for="(item, index) in jtem" :key="index">
              <img :src="item.picUrl" alt="" />
              <div>
                <span>
                  {{ item.name }}
                  <br />
                  <span v-for="(jtem, jndex) in item.song.artists" :key="jndex">
                  {{ jtem.name }}
                  </span>
                </span>
                <span class="iconPlay"><span></span></span>
              </div>
            </div>
          </li>
        </ul>
      </Swiper>
    </div>
    <div class="title">发现新专辑</div>
    <div class="find-album">
      <Swiper
        class="wrapper-album"
        :data="albumData"
        :scrollX="true"
        :probeType="2"
        :eventPassthrough="vertical"
        :snap="swiperOptions.snapAlbum"
        ref="swiperChildalbum"
      >
        <div class="content-albumpar">
          <ul class="content-album">
            <li v-for="(item, index) in albumData" :key="index">
              <div>
                <img :src="item.blurPicUrl" alt="" />
                <br />
                {{ item.name }}
                <span>{{item.artist.name}}</span>
              </div>
            </li>
          </ul>
        </div>
      </Swiper>
    </div>
    <div class="title">推荐MV</div>
    <div class="find-mv">
      <Swiper
        class="wrapper-mv"
        :data="mvData"
        :scrollX="true"
        :probeType="2"
        :eventPassthrough="vertical"
        :snap="swiperOptions.snapMv"
        ref="swiperChildmv"
      >
        <ul class="content-mv">
          <li v-for="(item, index) in mvData" :key="index">
            <div>
              <img :src="item.picUrl" alt="" />
              <br />
              {{ item.name }}
              <div>{{item.artistName}}</div>
            </div>
            <span class="iconMv"><span></span></span>
          </li>
        </ul>
      </Swiper>
    </div>
    <a href="/">aa</a>
  </div>
</template>

<script>
import {
  getBanner,
  getHighquality,
  getsongNew,
  getNewwest,
  getPersonalizedMv
} from "@/request/getdata";
import { stringLocale } from "@/tool/tools"
import Swiper from "@/components/Swiper";
export default {
  name: 'Home',
  components: {
    Swiper
  },
  data() {
    return {
      bannersData: [],
      songsheetData: [],
      newSongData: { a: [], b: [], c: [] },
      albumData: [],
      mvData: [],
      vertical:'vertical',
      swiperOptions: {},
      swiperIndex: 0
    };
  },
  methods: {
    //获取轮播图数据
    getBannerData() {
      getBanner().then(res => {
        console.log(res);
        this.swiperOptions.snap = {
          loop: true,
          threshold: 0.2
        };
        this.bannersData = res.banners;
      });
    },
    //获取精品歌单
    getHotlistData() {
      getHighquality(6).then(res => {
        console.log(res)
        this.swiperOptions.snapSheet = {
          loop: false,
          threshold: 0.1
        };
        this.songsheetData = res.playlists;
      });
    },
    //获取推荐新音乐
    getNewsongData() {
      getsongNew().then(res => {
        console.log(res);
        this.swiperOptions.snapSongs = {
          loop: false,
          threshold: 0.1
        };
        this.newSongData.a = res.result.slice(0, 3);
        this.newSongData.b = res.result.slice(3, 6);
        this.newSongData.c = res.result.slice(6, 9);
      });
    },
    //获取新专辑
    getAlbumData() {
      getNewwest().then(res => {
        console.log(res);
        this.albumData = res.albums;
        this.swiperOptions.snapAlbum = {
          loop: false,
          threshold: 0.1
        };
      });
    },
    //获取推荐MV
    getRecommentMv() {
      getPersonalizedMv().then(res => {
        console.log(res);
        this.swiperOptions.snapMv = {
          loop: false,
          threshold: 0.1
        };
        this.mvData = res.result;
      });
    },
    //轮播图小圆点位置更换
    getIndex(index) {
      this.swiperIndex = index;
      if (this.swiperIndex >= this.bannersData.length) {
        this.swiperIndex = 0;
      }else if (this.swiperIndex < 0) {
        this.swiperIndex = this.bannersData.length - 1;
      }
    },
    //点击小圆点调用子组件事件
    setIndex(index) {
      this.$refs.swiperChild._setIndex(index);
    },
    //banner的点击事件
    bannerClick(item) {
      if(item.url !== null) {
        window.location.assign(item.url);
      }
    },
    localeString(value) {
      return stringLocale(value)
    }
  },
  created() {
    this.getBannerData();
    this.getHotlistData();
    this.getNewsongData();
    this.getAlbumData();
    this.getRecommentMv();
  },
  mounted() {
    // this.getBannerData();
  },
  computed: {
    swiperLength: function() {
      return `${(this.bannersData.length + 2) * 100}vw`;
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  overflow: hidden;
  // background-color: #7bbfea;
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
          position: relative;
          float: left;
          height: 1.5rem;
          img {
            height: 1.5rem;
            width: 100vw;
            border-radius: 0.05rem
          }
          .typeTitle {
            position: absolute;
            padding: 0.05rem;
            bottom: 0;
            right: 0;
            background-color: skyblue;
            opacity: 0.9;
            border-radius: 0.05rem 0;
            font-size: 0.12rem;
            line-height: 0.14rem;
            color: #fff;
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
    margin: 0.15rem 0;
    & > span {
      // display: inline-block;
      display: flex;
      width: 0.6rem;
      height: 0.6rem;
      background-color: #6f60aa;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 0.14rem;
      & > span {
        &::before {
          font-size: 0.14rem;
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
              position: relative;
              width: 30vw;
              font-size: 0.1rem;
              img {
                width: 30vw;
                height: 1.25rem;
                border-radius: 0.04rem;
              }
              .sheet-playcount {
                position: absolute;
                top: 0;
                right: 0;
                padding: 0.02rem;
                font-size: 0.12rem;
                color: #f6f5ec;
                & > span {
                  margin-right: 0.02rem;
                  &::before {
                    font-size: 0.12rem;
                  }
                  
                }
              }
            }
          }
        }
      }
    }
  }
  .title {
    margin-top: 0.2rem;
    margin-bottom: 0.1rem;
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
              // display: inline-block;
              width: 100vw - 18.6666667vw;
              float: right;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .iconPlay {
                width: 0.22rem;
                height: 0.22rem;
                // text-align: center;
                // line-height: 0.24rem;
                margin-right: 0.0619rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 2px solid #f6f5ec;
                border-radius: 50%;
                span {
                  // display: inline-block;
                  height: 0;
                  width: 0;
                  margin-right: -0.03rem;
                  border: 0.06rem solid transparent;
                  border-left:0.12rem solid #6f60aa;
                  border-right: 0;
                  // border-radius: 0.02rem;
                }
              }
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
              position: relative;
              width: 30vw;
              font-size: 0.1rem;
              img {
                width: 30vw;
                height: 1.25rem;
                border-radius: 0.04rem;
              }
              span {
                position: absolute;
                right: 0;
                bottom: -0.13rem;
                padding: 0.02rem;
                vertical-align: bottom;
                font-size: 0.08rem;
                color: #fff;
                background-color: rgba($color: #d3d7d4, $alpha: 1);
              }
            }
          }
        }
      }
    }
  }
  .find-mv {
    overflow: hidden;
    .wrapper-mv {
      width: 100vw;
      // height: 2.1rem;
      overflow: hidden;
      // padding-bottom: 0.02rem;
      .content-mv {
        // height: 2.1rem;
        overflow: hidden;
        width: 400vw;
        li {
          position: relative;
          float: left;
          width: 100vw;
          // height: 2.1rem;
          // display: flex;
          // justify-content: space-around;
          div {
            width: 300vw;
            font-size: 0.1rem;
            // height: 2.1rem;
            img {
              width: 100vw;
              height: 2rem;
              border-radius: 0.04rem;
            }
            div {
              color: #666;
              font-size: 0.08rem;
            }
          }
          .iconMv {
            position: absolute;
            right: 0;
            top: 1.7181rem;
            width: 0.22rem;
            height: 0.22rem;
            margin-right: 0.0619rem;
            display: flex;
            justify-content: center;
            align-items: center;
            // border: 2px solid #f6f5ec;
            background-color: rgba($color: #d3d7d4, $alpha: 1);
            border-radius: 50%;
            span {
              // display: inline-block;
              height: 0;
              width: 0;
              margin-right: -0.03rem;
              border: 0.06rem solid transparent;
              border-left:0.12rem solid #6f60aa;
              border-right: 0;
              // border-radius: 0.02rem;
            }
          }
        }
      }
    }
  }
}

</style>