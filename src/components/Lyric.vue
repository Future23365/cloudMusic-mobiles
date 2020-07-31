<template>
  <div class="lyric">
    <!-- {{lyric.lyric.lyric}} -->
    <ul ref="lyric">
      <div class="active"></div>
      <li v-for="(item, index, z) in ly" :key="z" :class="index === activeFlag? 'white' : ''">
        <div>{{item}}</div>
        <div>{{tly[index]}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { trtoSecond } from "@/tool/tools";
export default {
  props: ['lyric'],
  data() {
    return {
      ly: {},
      tly: {},
      activeFlag: '00:00.00',
      position: 0
    }
  },
  methods: {
    procLyric() {
      console.log(this.lyric.lyric);
      if(this.lyric.lyric) {
        let arr = this.lyric.lyric.split('\n');
        this.ly = {};
        for(let item of arr) {
          this.ly[item.slice(1, 9)] = item.slice(10);
        }
        console.log(this.ly);
      }
      
      if(this.lyric.tlyric) {
        let arr = this.lyric.tlyric.split('\n');
        this.tly = {};
        for(let item of arr) {
          this.tly[item.slice(1, 9)] = item.slice(10);
        }
        console.log(this.tly);
      }
      // console.log(this.ly);
    },
    setFlag(time) {
      let a = this.activeFlag;
      console.log(this.activeFlag);
      for(let item in this.ly) {
        // console.log(item);
        
        if(time - trtoSecond(item) > 0.00001) { //取得于当前时间最接近的那个时间
          this.activeFlag = item;
        }
      }
      if(a !== this.activeFlag) {
        this.position += 45
        console.log("---------------")
        this.$refs.lyric.scrollTop = this.position;
      }
      console.log(this.$refs.lyric.scrollTop);
      // console.log(trtoSecond(str));
      // let arr = Object.keys(this.ly);
      // if(time - trtoSecond(str) > 0.0001) {
      //   console.log('可以的');
      //   console.log(this.time - trtoSecond(str));
      //   // console.log(arr.indexOf(str))
      //   this.activeFlag = arr.indexOf(str);
      //   console.log('-------------------')
      //   console.log(arr[arr.indexOf(str)]);
      //   console.log(arr[arr.indexOf(str) - 1]);
      //   if(arr[arr.indexOf(str) - 1]) {
      //     console.log(trtoSecond(arr[arr.indexOf(str)]) - trtoSecond(arr[arr.indexOf(str) - 1]));
          
      //     if(this.time - trtoSecond(str) < arr[arr.indexOf(str)] - arr[arr.indexOf(str) - 1]) {
      //       return true;
      //     }
      //   }
        
        
        
      // }
    }
  },
  computed: {
    time: function() {
      return this.$store.state.realTime;
    }
  },
  watch: {
    lyric: function() {
      this.position = 0;
      this.procLyric()
    },
    time: function() {
      this.setFlag(this.time)
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
      border-bottom: 1px solid #666;
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
    .white {
      color: #fff;
    }
  }
}
</style>