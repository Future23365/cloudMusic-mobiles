<template>
  <div id="playpage">
    <Back :text="text" :inf="inf"></Back>
    <div class="img" :style="{backgroundImage: getBgcimg(al.picUrl)}"></div>
    <div class="main">
      <div class="img-lyric">
        <img :src="al.picUrl" alt="" :class="songPlay ? '' : 'paused'">
        <div class="menu">
          <span class="iconfont icon-iconfontzhizuobiaozhun023146"></span>
          <span class="iconfont icon-jianyi" @click="goSongComment"></span>
          <span>|</span>
        </div>
      </div>
      <div class="detail-play">
        <div class="progress">111111111111111111111111111111111111111111111111111111111111111</div>
        <span class="iconfont icon-xunhuan"></span>
        <span class="iconfont icon-shangyiqu101"></span>
        <span class="iconfont " :class="songPlay ? 'icon-zanting' : 'icon-play_icon'" @click="play"></span>
        <span class="iconfont icon-xiayiqu101"></span>
        <span class="iconfont icon-bofangliebiao"></span>
      </div>
    </div>
    
  </div>
</template>

<script>
import Back from "@/components/Back";
export default {
  name: 'Playpage',
  components: {
    Back
  },
  data() {
    return {
    }
  },
  computed: {
    //标题文字为歌曲名字
    text: function() {
      return this.$store.state.songName;
    },
    //副文字为歌手
    inf: function() {
      let arr = this.$store.state.songArtist;
      let str = '';
      for(let i of arr) {
        str = str + i.name;
      }
      return str;
    },
    //读取专辑信息
    al: function() {
      return this.$store.state.songAl;
    },
    //读取是否播放
    songPlay: function() {
      return this.$store.state.songPlay;
    }
  },
  methods: {
    //歌曲播放地址字符串
    getBgcimg(url) {
      return `url(${url})`
    },
    //设置播放
    play() {
      this.$store.commit('setPlay');
    },
    goSongComment() {
      this.$router.push({
        path: '/Comment'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#playpage {
  position: relative;
  #back {
    background-color: transparent;
  }
  .img {
    position: absolute;
    margin-top: -0.3rem;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    filter: blur(0.9rem) brightness(80%);
    z-index: -1;
  }
  .main {
    margin-top: -0.3rem;
    width: 100vw;
    height: 100vh;
    .img-lyric {
      width: 100vw;
      height: 90%;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2rem;
        height: 2rem;
        margin-top: -1.3rem;
        margin-left: -1rem;
        border-radius: 50%;
        animation: rotateimg 15s linear infinite;
      }
      .menu {
        position: absolute;
        width: 100vw;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        margin-bottom: 0.2rem;
        span {
          margin: 0 0.1rem;
          &::before {
            font-size: 0.2rem;
          }
        }
      }
      .paused {
        animation-play-state: paused;
      }
      @keyframes rotateimg {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
    .detail-play {
      box-sizing: border-box;
      width: 100vw;
      height: 10%;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        &::before {
          font-size: 0.3rem;
        }
      }
      .progress {
        position: absolute;
        bottom: 10%;
        left: 0;
        width: 100vw;

      }
    }
  }
  
}
</style>