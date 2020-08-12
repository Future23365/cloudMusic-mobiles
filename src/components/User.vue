<template>
  <div class="user">
    <Back :text="''"></Back>
    <div class="header" :style="{backgroundImage: getBgc(userData.backgroundUrl)}">
      <div class="img">
        <img :src="userData.avatarUrl" alt="" />
      </div>
      <div class="inf">
        <div class="name">{{userData.name}}</div>
        <div class="ff">
          <span>关注</span><span>{{userData.follows}}</span>|<span>粉丝</span><span>{{userData.fans}}</span>
        </div>
        <div><span>lv.{{userData.level}}</span></div>
      </div>
    </div>
    <div class="tag">
      <span>主页</span>
      <span>动态</span>
    </div>
    <div class="main">

    </div>
  </div>
</template>

<script>
import Back from "@/components/Back";
import { getUserData } from "@/request/getdata"
export default {
  name: 'User',
  components: {
    Back
  },
  data() {
    return {
      userData: {}
    }
  },
  computed: {
    id: function() {
      return this.$route.query.userId
    }
  },
  methods: {
    getUserData() {
      getUserData(this.id).then(res => {
        console.log(res);
        let userData = {};
        userData.name = res.profile.nickname;
        userData.avatarUrl = res.profile.avatarUrl;
        userData.backgroundUrl = res.profile.backgroundUrl;
        userData.follows = res.profile.follows;
        userData.fans = res.profile.followeds;
        userData.level = res.level;
        this.userData = userData;
      })
    },
    getBgc(str) {
      return `url("${str}")`;
    },
  },
  mounted() {
    this.getUserData();
  }
}
</script>

<style lang="scss" scoped>
.user {
  width: 100vw;
  height: 100vh;
  ::v-deep #back {
    background-color: transparent;
  }
  .header {
    // box-sizing: border-box;
    // position: relative;
    height: 1.66rem;
    padding-top: 0.3rem;
    margin-top: -0.3rem;
    padding-left: 0.2rem;
    // background-color: #666;
    background-size: cover;
    .img {
      height: 50%;
      // background-color: #fff;
      position: relative;
      img {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
    .inf {
      height: 50%;
      color: #eee;
      .name {
        color: #fff;
        font-size: 0.18rem;
      }
    }
  }
  .tag {
    position: sticky;
    top: 0.3rem;
    height: 0.3rem;
    margin-top: -0.2rem;
    border-top-left-radius: 0.15rem;
    border-top-right-radius: 0.15rem;
    background-color: #fff;
    line-height: 0.3rem;
  }
  .main {
    // height: calc(100vh - 1.66rem - 0.3rem);
    height: 200vh;
    // border-top: 1px solid #fff;
    // position: sticky;
    // top: 0.6rem;
    // margin-top: 0.6rem;
    background-color: #777;
  }
}
</style>