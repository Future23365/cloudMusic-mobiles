<template>
  <div id="player" @click="goPlaypage">
    <div class="inf">
      <img :src="songAl.picUrl" alt="">
      <div>
        <span class="name">{{songName}}</span>
        <span class="artist" v-for="(item, index) in songArtist" :key="index">{{item.name}}</span>
      </div>
    </div>
    <div class="buttons">
      <span class="iconfont icon-play_icon" @click.stop="play"></span>
      <span class="iconfont icon-bofangliebiao"></span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Player',
  data() {
    return {
      
    }
  },
  methods: {
    getSongData(id) {
      console.log(id)
    },
    play() {
      this.$store.commit('setPlay');
    },
    goPlaypage() {
      this.$router.push('/Playpage')
    }
  },
  computed: mapState({
    songId: state => state.songId,
    songName: state => state.songName,
    songArtist: state => state.songArtist,
    songAl: state => state.songAl
  })
}
</script>

<style lang="scss" scoped>
#player {
  display: flex;
  Width: 100vw;
  height: 0.4rem;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  background-color: #DD001B;
  .inf {
    img {
      width: 0.3rem;
      height: 0.3rem;
      vertical-align: middle;
      margin-left: 0.1rem;
      border-radius: 50%;
    }
    div {
      display: inline-block;
      vertical-align: middle;
      margin-left: 0.05rem;
      color: #fff;
      .name {
        display: block;
        margin-bottom: 0.02rem;
        font-size: 0.14rem;
      }
      .artist {
        font-size: 0.1rem;
        color: #ddd;
      }
    }
  }
  .buttons {
    span {
      &::before {
        font-size: 0.3rem;
      }
    }
  }
}
</style>