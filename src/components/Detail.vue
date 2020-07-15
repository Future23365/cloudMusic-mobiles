<template>
  <div id="detail">
    <Back :text="'歌单'" ref="back"></Back>
    <div class="header" ref="header">
      <Card
      :showPlaycount="true"
      :showDes="false"
      :showartistName="false"
      :showName="false"
      :dataPlaycount="localeString(detailData.playCount)"
      :dataImg="detailData.coverImgUrl"
      :imgWidth="'1.26rem'"
      :imgHeight="'1.26rem'"
      ></Card>
      <div class="title">
        <div>
          <h3>{{detailData.name}}</h3>
          <div class="user">
            <img :src="detailData.creator && detailData.creator.avatarUrl" alt="" v-show="!!detailData.creator">
            <span>{{detailData.creator && detailData.creator.nickname}}</span>
          </div>
        </div>
        <div class="des">{{detailData.description}}</div>
      </div>
    </div>
    <div class="menu" ref="menu">
        <span>评论</span>
        <span>下载</span>
        <span>多选</span>
      </div>
    <div class="songs" @touchstart="moveStart" @touchmove="moveEvent">
        <div class="header" ref="header2">
          播放全部(共{{songAllData.length}}首)
          <div class="touchmask"></div>
          </div>
        <Swiper
        class="wrapper-songs"
        :data="songAllData"
        :probeType="2"
        :pulldown="true"
        :listenScroll="true"
        @scroll="setZIndex"
        :class="isDown ? 'down' : ''"
        >
          <ul class="content-songs">
            <li v-for="(item, index) in songAllData" :key="index">
              <span>{{index + 1}}</span>
              <span>
                <div>{{item.name}}</div>
                <div><span v-for="(jtem, jndex) in item.ar" :key="jndex">{{jtem.name}}</span></div>
              </span>
              <span>|</span>
            </li>
          </ul>
      </Swiper>
    </div>
  </div>  
</template>

<script>
import Back from "@/components/Back";
import Card from "@/components/Card";
import { stringLocale } from "@/tool/tools";
import { getUserPlaylistDetail, getSongDetailall } from "@/request/getdata";
import Swiper from "@/components/Swiper";
export default {
  name: 'Detail',
  components: {
    Back,
    Card,
    Swiper
  },
  data() {
    return {
      detailData: [],
      songAllData: [],
      isDown: false,
      beforePosition: 0
    }
  },
  methods: {
    localeString(value) {
      return stringLocale(value)
    },
    getDetailData(id) {
      getUserPlaylistDetail(id).then(res => {
        console.log(res)
        this.detailData = res.playlist;
        let arr = []
        for(let item of res.playlist.trackIds) {
          arr.push(item.id)
        }
        getSongDetailall(arr).then(res => {
          console.log(res);
          this.songAllData = res.songs;
        })
      })
    },
    moveEvent(e) {
      
      // console.log(e)
      // console.log(this.$refs.aab.getBoundingClientRect().y);
      // console.log(window.scrollY)
      //获取滚动的最大距离
      let offTop = this.$refs.header.clientHeight + this.$refs.menu.clientHeight + this.$refs.header2.clientHeight + this.$refs.header2.clientTop + this.$refs.back.$el.clientHeight;
      // console.log('点击的位置', this.beforePosition)
      // console.log('现在的位置', e.changedTouches[0].pageY)
      if(this.beforePosition >= e.changedTouches[0].pageY) {
        console.log('触发')
        if(window.scrollY >= offTop) {
          console.log('到底部');
          this.isDown = true;
        }
      }
      
      
    },
    moveStart(e) {
      this.beforePosition = e.changedTouches[0].pageY;
    },
    setZIndex(e) {
      console.log('上拉', e)
      if(e.y > -10) {
        this.isDown = false;
      }
      
    }
  },
  created() {
    this.getDetailData(this.$route.query.id);
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 0;
  padding: 0;
}
#detail {
  width: 100vw;
  height: 100vh;
  // background-color: #888;
  .header {
    #card {
      display: inline-block;
      width: 1.26rem;
      height: 1.26rem;
      margin-left: 0.2rem;
    }
    .title {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      float: right;
      justify-content: space-between;
      width: 100vw - 38.9333333vw;
      height: 1.26rem;
      padding-left: 0.2rem;
      vertical-align: top;
      .user {
        height: 0.2rem;
        margin-top: 0.1rem;
        img {
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 50%;
          vertical-align: sub;
        }
        span {
          margin-left: 0.05rem;
        }
      }
      .des {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: 0.4rem;
        &::after {
          position: absolute;
          content: '>';
          top: 0;
          right: 0.2rem;
        }
      }
    }
  }
  .menu {
    height: 0.4rem;
    display: flex;
    justify-content: space-around;
    align-self: cetner;
    padding-left: 0.2rem;
    line-height: 0.4rem;
  }
  .songs {
    .header {
      position: relative;
      box-sizing: border-box;
      padding-left: 0.2rem;
      height: 0.2rem;
      width: 100%;
      border-top: 1px solid #999;
      border-radius: 0.5rem;
    }
    .wrapper-songs {
      position: relative;
      z-index: -1;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      .content-songs {
        li {
          height: 0.4rem;
          margin-bottom: 0.2rem;
          overflow: hidden;
           > span {
            // display: inline-block;
            line-height: 0.4rem;
            text-align: center;
            float: left;
            &:nth-of-type(n) {
              width: 10%;
              height: 0.4rem;
              // line-height: 0.4rem;
            }
            &:nth-of-type(2) {
              width: 80%;
              line-height: 0.2rem;
              text-align: left;
              div {
                height: 0.2rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
    .down {
      z-index: 0;
    }
  }
}
</style>