<template>
  <div id="header">
    <div class="menu">菜单</div>
    <div class="nav-bar" @click="chooseBar">
      <span data-index="1" :class="spanClass === 1 ? 'spanc' : ''">发现</span>
      <span data-index="2" :class="spanClass === 2 ? 'spanc' : ''">云村</span>
      <span data-index="3" :class="spanClass === 3 ? 'spanc' : ''">视频</span>
    </div>
    <div class="search">搜索</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      spanClass: 1,  //定义选中的span的标记
    }
  },
  methods: {
    chooseBar(e) {  //选择函数
      console.log(e.target.getAttribute('data-index'));
      switch (e.target.getAttribute('data-index')) {
        case '1':
          this.spanClass = 1;
          if(this.$route.path !== '/Home') {
            this.$router.push('/Home');
          }
          break;
        case '2':
          this.spanClass = 2;
          if(this.$route.path !== '/Yuncun') {
            this.$router.push('/Home/Yuncun');
          }
          break;
        case '3':
          this.spanClass = 3;
          if(this.$route.path !== '/Video') {
            this.$router.push('/Home/Video');
          }
          break;
      }
    },
  },
  mounted() {
    // console.log(this.$route.path)
    this.$nextTick(function() {
      if(this.$route.path === '/Home') {
      this.spanClass === 1;
    }else if(this.$route.path === '/Yuncun') {
      this.spanClass === 2;
    }else if(this.$route.path === '/Video') {
      this.spanClass === 3;
    }
    })
    
  }
}
</script>

<style lang="scss" scoped>
#header {
  height: 0.35rem;
  line-height: 0.35rem;
  display: flex;
  justify-content: space-between;
  // border: 1px solid #ccc;
  width: 100%;
  span {
    display: inline-block;
    // margin-right: 0.1rem;
    text-align: center;
    width: 0.4rem;
    
  }
}
.spanc {
  font-size: 0.16rem;
}
</style>