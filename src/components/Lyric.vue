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
      position: -40,
      ani: 0,
    }
  },
  methods: {
    procLyric() {
      console.log(this.lyric.lyric);
      if(this.lyric.lyric) {
        let arr = this.lyric.lyric.split('\n');
        this.ly = {};
        let re = /^\[(\d\d:\d\d\.\d*)\](.*)/; //歌词匹配正则表达式
        for(let item of arr) {
          // console.log(item);
          // console.log(item.match(re));
          // this.ly[item.slice(1, 9)] = item.slice(10);
          if(item.match(re)) {
            this.ly[item.match(re)[1]] = item.match(re)[2];
          }
        }
        console.log(this.ly);
      }
      
      if(this.lyric.tlyric) {
        let arr = this.lyric.tlyric.split('\n');
        this.tly = {};
        let re2 = /^\[(\d\d:\d\d\.\d*)\](.*)/; //歌词匹配正则表达式
        for(let item of arr) {
          // this.tly[item.slice(1, 9)] = item.slice(10);
          // console.log(item.match(re2))
          if(item.match(re2)) {
            this.tly[item.match(re2)[1]] = item.match(re2)[2];
          }
          
        }
        // console.log(this.tly);
      }
      // console.log(this.ly);
    },
    //歌词滚动函数
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
        // this.position += 40;
        // console.log(this.$refs.lyric.querySelector('li').offsetHeight)
        this.position = (Object.keys(this.ly).indexOf(this.activeFlag)) * this.$refs.lyric.querySelector('li').offsetHeight // 获取当前白色各词所在位置
        console.log(this.routerPath)
        if(this.routerPath === '/Playpage') {
          this.animation(this.$refs.lyric, this.position, 4);
        }
        
        console.log("---------------")
        // this.$refs.lyric.scrollTop = this.position;
      }
      // console.log(this.$refs.lyric.scrollTop);
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
    },
    //缓动动画
    animation(el, lastPosition, rate) {
      // console.log('对象', el);
      // console.log("结束位置", lastPosition)
      // window.cancelAnimationFrame(this.ani);
      let that = this;
      let funMove = function() {
        if(Math.ceil((lastPosition - el.scrollTop) / rate) > 0) {
          el.scrollTop = el.scrollTop + Math.ceil((lastPosition - el.scrollTop) / rate);
          // console.log("移动距离", Math.ceil((lastPosition - el.scrollTop) / rate))
        }else if(Math.ceil((lastPosition - el.scrollTop) / rate) <= 0) {
          el.scrollTop = el.scrollTop + Math.floor((lastPosition - el.scrollTop) / rate);
          // console.log("移动距离", (lastPosition - el.scrollTop / rate))
        }
        
        // console.log("**************")
        // console.log(lastPosition)
        // console.log("停止标志", Math.abs(lastPosition - el.scrollTop))
        
        console.log(el.scrollTop)
        // console.log("**************")
        // console.log(lastPosition)
        if(Math.abs(lastPosition - el.scrollTop) <= 1) {
          el.scrollTop = lastPosition;
          // console.log('运动停止');
          return;
        }
        // console.log('运动位置', el.scrollTop);
        if(that.routerPath === '/Playpage') { // 在歌词页面是显示滚动动画
          window.requestAnimationFrame(funMove);
        }
        
      }
      funMove();
    }
  },
  computed: {
    time: function() {
      return this.$store.state.realTime;
    },
    routerPath: function() {
      return this.$route.path;
    }
  },
  watch: {
    lyric: function() {
      this.position = -40;
      this.procLyric()
    },
    time: function() {
      this.setFlag(this.time)
    },

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
      top: 0.4rem;
      left: 0;
      height: 0rem;
      width: 100vw;
      margin-top: 40vh;
      // background-color: #fff;
      color: #fff;
      border-bottom: 1px solid #666;
    }
    li {
      padding-bottom: 0.1rem;
      text-align: center;
      color: #ccc;
      height: 0.3rem;
      // line-height: 0.3rem;
      &:nth-of-type(1) {
        margin-top: 40vh;
      }
      &:nth-last-of-type(1) {
        margin-bottom: 40vh;
      }
    }
    .white {
      color: #fff;
    }
  }
}
</style>