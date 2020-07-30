<template>
  <div class="lyric">
    <!-- {{lyric.lyric.lyric}} -->
    <ul>
      <div class="active"></div>
      <li v-for="(item, index, z) in ly" :key="z">
        <div>{{item}}</div>
        <div>{{tly[index]}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['lyric'],
  data() {
    return {
      ly: {},
      tly: {}
    }
  },
  methods: {
    procLyric() {
      console.log(this.lyric.lyric);
      if(this.lyric.lyric) {
        let arr = this.lyric.lyric.split('\n');
        this.ly = {};
        for(let item of arr) {
          this.ly[item.slice(1, 10)] = item.slice(11);
        }
        console.log(this.ly);
      }
      
      if(this.lyric.tlyric) {
        let arr = this.lyric.tlyric.split('\n');
        this.tly = {};
        for(let item of arr) {
          this.tly[item.slice(1, 10)] = item.slice(11);
        }
        console.log(this.tly);
      }
      // console.log(this.ly);
    }
  },
  watch: {
    lyric: function() {
      this.procLyric()
    }
  }
}
</script>

<style lang="scss" scoped>
.lyric {
  // box-sizing: border-box;
  width: 100vw;
  height: 90%;
  // padding-top: 0.4rem;
  // overflow: auto;
  // margin-top: 50%;
  ul {
    height: 90%;
    width: 100vw;
    overflow: auto;
    .active {
      position: absolute;
      top: 0;
      left: 0;
      height: 0.3rem;
      width: 100vw;
      margin-top: 40vh;
      // background-color: #fff;
      color: #fff;
      border-top: 1px solid #666;
    }
    li {
      margin-bottom: 0.1rem;
      text-align: center;
      color: #ccc;
      height: 0.3rem;
      &:nth-of-type(1) {
        margin-top: 40vh;
      }
    }
  }
}
</style>