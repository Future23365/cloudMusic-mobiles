<template>
  <div id="playpage">
    <Back :text="text" :inf="inf"></Back>
    <div class="img" :style="{backgroundImage: getBgcimg(al.picUrl)}"></div>
    <div class="main">
      <div class="img-lyric">
        <img :src="al.picUrl" alt="" :class="songPlay ? '' : 'paused'">
      </div>
      <div class="detail-play">
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
import Back from "@/components/Back"
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
    text: function() {
      return this.$store.state.songName;
    },
    inf: function() {
      let arr = this.$store.state.songArtist;
      let str = '';
      for(let i of arr) {
        str = str + i.name;
      }
      return str;
    },
    al: function() {
      return this.$store.state.songAl;
    },
    songPlay: function() {
      return this.$store.state.songPlay;
    }
  },
  methods: {
    getBgcimg(url) {
      return `url(${url})`
    },
    play() {
      this.$store.commit('setPlay');
    },
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
    }
  }
  
}
</style>