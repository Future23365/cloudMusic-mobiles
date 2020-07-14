<template>
  <div id="card">
    <span class="playcount" v-if="showPlaycount"><span class="iconfont icon-bofang"></span>{{localeString(dataPlaycount)}}</span>
    <img :src="dataImg" alt="" :style="{'width': imgWidth, 'height': imgHeight}">
    <span class="time" v-if="showTime">{{transTime(dataTime / 1000)}}</span>
    <div class="name">{{dataName}}</div>
    <div class="artistname">{{dataArtistName}}</div>
  </div>  
</template>

<script>
import { stringLocale, tochance } from "@/tool/tools";
export default {
  name: 'Card',
  props: {
    showPlaycount: {
      type: Boolean,
      default: false
    },
    showTime: {
      type: Boolean,
      default: false
    },
    showartistName: {
      type: Boolean,
      default: false
    },
    dataPlaycount: {
      type: Number,
      default: 0
    },
    dataImg: {
      type: String,
      default: ''
    },
    dataTime: {
      type: Number,
      default: 0
    },
    dataName: {
      type: String,
      default: ''
    },
    dataArtistName: {
      type: String,
      default: ''
    },
    imgHeight: {
      type: String,
      default: '100%'
    },
    imgWidth: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {

    }
  },
  methods: {
    localeString(value) {
      return stringLocale(value);
    },
    transTime(time) {
      return tochance(time);
    },
  }
}
</script>

<style lang="scss" scoped>
#card {
  ul {
    margin: 0;
    padding: 0;
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
  position: relative;
  div {
    width: 1.8rem;
  }
  .name {
    height: 0.14rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.12rem;
  }
  .artistname {
    height: 0.12rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.1rem;
          
  }
  .playcount, .time {
    position: absolute;
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
  .playcount {
    top: 0;
    right: 0;
    background-color: rgba($color: #666, $alpha: 0.8);
  }
  .time {
    left: 0;
    top: 1rem - 0.18rem;
  }
}
</style>