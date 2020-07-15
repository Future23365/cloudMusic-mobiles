<template>
  <div id="card">
    <span class="playcount" v-if="showPlaycount"><span class="iconfont icon-bofang"></span>{{dataPlaycount}}</span>
    <img :src="dataImg" alt="" :style="{'width': imgWidth, 'height': imgHeight}">
    <span class="des" v-if="showDes">{{dataDes}}</span>
    <div class="name" :style="{'width': imgWidth}" v-if="showName">{{dataName}}</div>
    <div class="artistname" v-if="showartistName">{{dataArtistName}}</div>
  </div>  
</template>

<script>
export default {
  name: 'Card',
  props: {
    showPlaycount: {
      type: Boolean,
      default: false
    },
    showDes: {
      type: Boolean,
      default: false
    },
    showartistName: {
      type: Boolean,
      default: false
    },
    dataPlaycount: [String, Number],
    dataImg: {
      type: String,
      default: ''
    },
    dataDes: {
      type: String,
      default: ''
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
    },
    showName: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    
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
  .playcount, .des {
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
  .des {
    left: 0;
    top: 1rem - 0.18rem;
  }
}
</style>