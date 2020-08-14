<template>
  <div class="user" @touchmove="moveEvent">
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
    <div class="tag" ref="tag" @click="choosetag">
      <span>主页</span>
      <span>动态</span>
    </div>
    
    <div class="main" >
      <div class="main-child" ref="main">
        <div class="tag-homepage">
          <List>
            <template v-slot:img>
              <span class="font-img">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-paixingbang"></use>
                </svg>
              </span>
            </template>
            <template v-slot:inf-name>{{userData.name}}的听歌排行</template>
            <template v-slot:inf-au>累计听歌{{userData.listenSongs}}首</template>
          </List>
          <List>
            <template v-slot:img>
              <span class="font-img like">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-hongxin"></use>
                </svg>
              </span>
            </template>
            <template v-slot:inf-name>{{userData.name}}喜欢的音乐</template>
            <template v-slot:inf-au>{{userData.likeSongstrackCount}}首, 播放{{userData.likeSongsplayCount}}次</template>
          </List>
          <h3>创建的歌单({{userPlaylistCreate.length}})</h3>

          <h3>收藏的歌单({{userPlaylistCollention.length}})</h3>
        </div>
      
        <div class="tag-dynamic">
          动态1
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import Back from "@/components/Back";
import { getUserData, getUserplaylist } from "@/request/getdata";
import List from "@/components/List";
import "@/assets/font/iconfont.js";
export default {
  name: 'User',
  components: {
    Back,
    List
  },
  data() {
    return {
      userData: {},
      userPlaylistCreate: [],
      userPlaylistCreateCollect: [],
      userPlaylistCollention: [],
      userPlaylistCollentionCollect: []
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
        // let userData = {};
        this.$set(this.userData, 'name', res.profile.nickname);
        this.$set(this.userData, 'avatarUrl', res.profile.avatarUrl);
        this.$set(this.userData, 'backgroundUrl', res.profile.backgroundUrl);
        this.$set(this.userData, 'follows', res.profile.follows);
        this.$set(this.userData, 'fans', res.profile.followeds);
        this.$set(this.userData, 'level', res.level);
        this.$set(this.userData, 'listenSongs', res.listenSongs);
      });
      // getlikeLise(this.id).then(res => {
      //   console.log(res);
      // })
        getUserplaylist(this.id, 999999999).then(res => {
          console.log(res);
          for(let item of res.playlist) {
            if(item.name === `${this.userData.name}喜欢的音乐`) {
              this.$set(this.userData, 'likeSongstrackCount', item.trackCount);
              this.$set(this.userData, 'likeSongsplayCount', item.playCount);
            }
            if(item.userId === Number(this.id)) {
              this.userPlaylistCreate.push(item);
            }else {
              this.userPlaylistCollention.push(item);
            }
          }
          if(this.userPlaylistCreate.length > 7) {
            this.userPlaylistCreateCollect = this.userPlaylistCreate.slice(0, 7);
          }else if(this.userPlaylistCreate.length <= 7) {
            this.userPlaylistCreateCollect = this.userPlaylistCreate;
          }
          if(this.userPlaylistCollention.length > 7) {
            this.userPlaylistCollentionCollect = this.userPlaylistCollention.slice(0, 7);
          }else if(this.userPlaylistCollention.length <= 7) {
            this.userPlaylistCollentionCollect = this.userPlaylistCollention;
          }
          console.log('创建', this.userPlaylistCreate);
          console.log('收藏', this.userPlaylistCollention);
        })
      
      
    },
    getBgc(str) {
      return `url("${str}")`;
    },
    moveEvent() {
      // console.log(e);
      // console.log(this.$refs.tag.offsetTop)
    },
    choosetag(e) {
      console.log(e.target.innerText);
      if(e.target.innerText === '主页') {
        console.log()
        this.$refs.main.style.marginLeft = '0';
      }else if(e.target.innerText === '动态') {
        this.$refs.main.style.marginLeft = '-100vw';
      }
    }
  },
  mounted() {
    this.getUserData();
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.user {
  width: 100vw;
  // overflow: hidden;
  // height: 100vh;
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
    z-index: 2;
    span {
      display: inline-block;
      width: 50vw;
      text-align: center;
    }
  }
  
  .main {
    // height: calc(100vh - 1.66rem - 0.3rem);
    height: 200vh;
    width: 100vw;
    overflow: hidden;
    // position: relative;
    // border-top: 1px solid #fff;
    // position: sticky;
    // top: 0.6rem;
    // margin-top: 0.6rem;
    // background-color: #777;
    
    .main-child {
    width: 200vw;
    height: 100%;
    transition: margin 0.3s;
  }
    .tag-homepage, .tag-dynamic {
      width: 100vw;
      height: 100%;
      float: left;
    }
    .tag-homepage {
      // background-color: #123;
      .font-img {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background-color: #fc3a3a;
        margin: 0 auto;
        line-height: 0.4rem;
        // margin: 0 auto;
        font-size: 0.3rem;
        text-align: center;
        color: #fff;
      }
      .like {
        background-color: #fff;
        color: #fc3a3a;
      }
    }
    .tag-dynamic {
      // background-color: #878;
      // margin-left: -100%;
    }

  }
}
</style>