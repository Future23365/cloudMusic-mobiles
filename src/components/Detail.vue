<template>
  <div id="detail">
    <Back :text="'歌单'"></Back>
    <div class="header">
      <div class='img' :style="{backgroundImage: getBgc(detailData.coverImgUrl)}"></div>
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
        <div class="des" @click="showCover = !showCover">{{detailData.description}}</div>
        <div class="cover" :class="showCover ? '' : 'cover-show'">
          <div class='img' :style="{backgroundImage: getBgc(detailData.coverImgUrl)}"></div>
          <span @click="showCover = !showCover" class="x">X</span>
          <div class="up">
            <img :src="detailData.coverImgUrl" alt="">
            <div class="name">{{detailData.name}}</div>
          </div>
          <div class="down">
            <div class="title-cover">
              <span>标签</span>
              <span v-for="(item, index) in detailData.tags" :key="index">{{item}}</span>
            </div>
            <div class="description">
              {{detailData.description}}
            </div>
          </div>
        </div>
      </div>
      <div class="menu">
        <span>评论</span>
        <span>下载</span>
        <span>多选</span>
      </div>
    </div>
    
    <div class="playall">
      播放全部(共{{songAllData.length}}首)
      <div class="touchmask"></div>
    </div>
    <div class="songs">
        <Swiper
        class="wrapper-songs"
        :data="songAllData"
        :probeType="2"
        >
          <ul class="content-songs">
            <li v-for="(item, index) in songAllData" :key="index" @click="setPlaysong(item.id)">
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
    <Player></Player>
  </div>  
</template>

<script>
import Back from "@/components/Back";
import Card from "@/components/Card";
import { stringLocale } from "@/tool/tools";
import { getUserPlaylistDetail, getSongDetailall, getAlbum } from "@/request/getdata";
import Swiper from "@/components/Swiper";
import Player from "@/components/Player";
export default {
  name: 'Detail',
  components: {
    Back,
    Card,
    Swiper,
    Player
  },
  data() {
    return {
      detailData: [],
      songAllData: [],
      isDown: false,
      beforePosition: 0,
      showCover: false
    }
  },
  methods: {
    localeString(value) {
      return stringLocale(value)
    },
    //获取歌单详情
    getDetailData(id) {
      if(this.$route.query.type === '歌单') {
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
      }else if(this.$route.query.type === '专辑') {
        getAlbum(id).then(res => {
          console.log(res);
          this.detailData = {}
          this.detailData.coverImgUrl = res.album.picUrl;
          // this.detailData.playCount = 
          this.detailData.name = res.album.name;
          this.detailData.creator = {};
          this.detailData.creator.avatarUrl = res.album.artist.picUrl;
          this.detailData.creator.nickname = res.album.artist.name;
          this.detailData.description = res.album.description;
          console.log(this.detailData);
          let arr = []
          for(let item of res.songs) {
            arr.push(item.id)
          }
          getSongDetailall(arr).then(res => {
            console.log(res);
            this.songAllData = res.songs;
          })
        })
      }
      
    },
    getBgc(str) {
      return `url("${str}")`;
    },
    setPlaysong(id) {
      this.$store.dispatch('requestSongdata', id);
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
  // background-color: #8a8c8e;
  #back {
    background-color: transparent;
  }
  .header {
    position: relative;
    height: 1.66rem;
    padding-top: 0.3rem;
    margin-top: -0.3rem;
    > .img {
      position: absolute;
      z-index: -1;
      top: 0.3rem;
      right: 0;
      width: 100vw;
      height: 1.66rem;
      overflow: hidden;
      filter: blur(0.7rem);
    }
    #card {
      display: inline-block;
      width: 1.26rem;
      height: 1.26rem;
      margin-left: 0.2rem;
    }
    >.title {
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
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba($color: #777, $alpha: 0.9);
        overflow: hidden;
        z-index: 2;
        color: #fff;
        .img {
          position: absolute;
          z-index: -1;
          top: 0;
          right: 0;
          width: 200vw;
          height: 200vh;
          // overflow: hidden;
          // background-size: cover;
          background-position: 50% 50%;
          filter: blur(100px);
          // background-color: #555;
        }
        .x {
          position: absolute;
          // float: right;
          top: 0.1rem;
          right: 0.1rem;
          // margin-top: 0.15rem;
          // margin-right: 0.15rem;
          font-size: 0.2rem;
        }
        .up {
          height: 40%;
          width: 100vw;
          // display: flex;
          // flex-direction: column;
          // // flex-wrap: wrap;
          // justify-content: space-around;
          // // align-items: space-around;
          // align-content: center;
          // align-self: center;
          text-align: center;
          img {
            // display: block;
            height: 1.6rem;
            width: 1.6rem;
            margin-top: 10%;
            // margin: 0 auto;
          }
          .name {
            font-size: 0.16rem;
            margin-top: 0.2rem;
            
          }
        }
        .down {
          width: 100vw;
          height: 60%;
          overflow: auto;
          > div {
            margin: 0 0.2rem;
          }
          .title-cover {
            margin-bottom: 0.2rem;
            span {
              margin-right: 0.2rem;
            }
            
          }
          .description {
            white-space: pre-wrap;
            margin-bottom: 0.2rem;
          }
        }
      }
      .cover-show {
        display: none;
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
  }
  
  .playall {
    position: sticky;
    box-sizing: border-box;
    padding-left: 0.2rem;
    height: 0.3rem;
    top: 0.3rem;
    left: 0;
    width: 100%;
    line-height: 0.3rem;
    overflow: hidden;
    border-top: 1px solid #999;
    border-top-left-radius: 0.15rem;
    border-top-right-radius: 0.15rem;
    // background-color: #fff;
  }
  .songs {
    // background-color: #fff;
    overflow: hidden;
    
    .wrapper-songs {
      position: relative;
      box-sizing: border-box;
      width: 100vw;
      height: calc(100vh - 2.26rem);
      // margin-bottom: 0.4rem;
      overflow: hidden;
      .content-songs {
        padding-bottom: 0.4rem;
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
  }
}
</style>