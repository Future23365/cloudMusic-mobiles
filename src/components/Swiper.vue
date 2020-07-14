<template>
  <div ref="wrapper" @touchmove="moveM" @touchstart="moveS" @touchsend="moveE">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: 'Swiper',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    },
    // 希望在另一个方向保留原生的滚动
    eventPassthrough: {
      type: String,
      default: ''
    },
    //配置参数
    snap: {
      default: false
    },
    //自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    //一次滚动一张
    momentum: {
      type: Boolean,
      default: true
    },
    //是否需要获取小红点
    broadwise: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beforeX: 0
    };
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll();
      setTimeout(() => {
        this.refresh();
      }, 100)
    }, 100);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        snap: this.snap,
        momentum: this.momentum, //一次滑动一张
        eventPassthrough: this.eventPassthrough
      });
      // 是否派发滚动事件
      if (this.listenScroll) {
        let me = this;
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos);
        });
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnded');
          }
        });
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchend', (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit('pulldown');
          }
        });
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll');
        });
      }
      if (this.broadwise) {
        let that = this; //保存执行环境的this
        //滚动结束事件
        this.scroll.on('scrollEnd', function(e) {
          let inf = this.getCurrentPage(); //获取当前页面信息
          let pw = -inf.x / (inf.pageX + 1); //获取一个轮播图宽度
          that.$emit('scrollToEnd', e.x/-pw - 1);  //获取当前移动的位置
        });
      }
      if (this.autoPlay) {
        this._play();
      }
    },
    //循环播放动画
    _play() {
      let that = this;
      setInterval(function() {
        that.scroll.next(1000);
      }, 4000);
    },
    //touch开始
    moveS(e) {
      this.beforeX = e.changedTouches[0].pageX; //把当前位置存如变量
    },
    //touch中
    moveM(e) {
      if (Math.abs(this.beforeX - e.changedTouches[0].pageX !== 0) > 5) {
        if (e.cancelable) {
          e.preventDefault(); //禁止默认的事件，为了防止向右滑动的时候出现上下抖动
        }
      }
      this.beforeX = e.changedTouches[0].pageX;
    },
    //touch后
    moveE(e) {
      this.beforeX = e.changedTouches[0].pageX; //把移动后的位置存如变量
    },
    //设置图片位置
    _setIndex(index) {
      this.scroll.goToPage(index);
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable();
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable();
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
      /*
       * 不知道为什么，进入页面重新渲染之后滚动有问题，渲染两次情况有所改善，但貌似有时候还是需要重新刷新页面
       */
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>

<style lang="scss" scoped></style>
