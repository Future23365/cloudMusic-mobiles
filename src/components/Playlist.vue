<template>
  <div id="playlist">
    <Back :text="'歌单'"></Back>
    <Swiper
        class="wrapper-list"
        :data="listData"
        :scrollX="true"
        :scrollY="false"
        :probeType="2"
        :eventPassthrough="'vertical'"
        ref="swiperChildlist"
      >
        <ul class="content-list">
          <li v-for="(item, index) in listData" :key="index" :class="ischoose === item.name ? 'ischoose' : ''" @click="ischoose = item.name; reStart()">{{item.name}}</li>
        </ul>
      </Swiper>
      <Swiper
        class="wrapper-playlist"
        :data="allPlaylistData"
        :probeType="2"
        :scrollY="true"
        :pullup="true"
        @scrollToEnded="requestAgain"
        ref="swiperChildPlaylistlist"
      >
        <ul class="content-playlist">
          <li v-for="(item, index) in allPlaylistData" :key="index">
            <Card
              :showPlaycount="true"
              :showTime="false"
              :showartistName="false"
              :dataPlaycount="item.playCount"
              :dataImg="item.coverImgUrl"
              :dataName="item.name"
              :imgWidth="'1.2rem'"
              :imgHeight="'1.2rem'"
            ></Card>
          </li>
          <div style="text-align: center">{{load}}</div>
        </ul>
      </Swiper>
  </div>
</template>

<script>
import Back from "@/components/Back";
import { getCatlist, getPlaylist } from "@/request/getdata";
import Swiper from "@/components/Swiper";
import Card from "@/components/Card";
export default {
  name: 'Playlist',
  components: {
    Back,
    Swiper,
    Card
  },
  data() {
    return {
      listData: [],
      ischoose: '推荐',
      allPlaylistData: [],
      load: '努力加载中...',
      offset: 0,

    }
  },
  methods: {
    getList() {
      getCatlist().then(res => {
        console.log(res);
        let a = {
          name: '推荐'
        }
        let b = {
          name: '精品'
        }
        res.sub.unshift(a, b)
        this.listData = res.sub;
      })
    },
    getPlaylistData(obj) {
      if(obj) {
        getPlaylist(obj.cat, obj.limit, obj.offset).then(res => {
          console.log(res);
          for (let value of res.playlists) {
            this.allPlaylistData.push(value)
          }
          if(res.more === false) {
            this.load = '没有更多啦！'
          }else if(res.more === true) {
            this.load = '努力加载中...'
          }
        }, reject => {
          console.log(reject)
        })
      }else {
        getPlaylist().then(res => {
          console.log(res);
          this.allPlaylistData = res.playlists;
          this.load = '努力加载中...'
        })
      }
    },
    requestAgain() {
      this.offset += 30;
      let obj = {
        cat: this.ischoose === '推荐' ? '全部' : this.ischoose,
        limit: 30,
        offset: this.offset
      }
      this.getPlaylistData(obj);
    },
    reStart() {
      console.log('1')
      this.offset = 0;
      this.allPlaylistData = [];
      let obj = {
        cat: this.ischoose,
        limit: 30,
        offset: this.offset
      }
      this.getPlaylistData(obj);
    }
  },
  mounted() {
    this.getList();
    this.getPlaylistData()
  }
}
</script>

<style lang="scss" scoped>
#playlist {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #999;
  .wrapper-list {
    height: 0.16rem;
    width: 100vw;
    background-color: #666;
    .content-list {
      width: 41rem;
      height: 100%;
      li {
        // display: inline-block;
        float: left;
        // width: 0.6rem;
        height: 0.14rem;
        margin: 0 0.15rem;
        line-height: 0.16rem;
        color: #fff;

      }
      .ischoose {
        color: #9b95c9;
      }
    }
  }
  .wrapper-playlist {
    width: 100vw;
    // height: 5rem;
    height: 100vh;
    overflow: hidden;
    .content-playlist {
      overflow: hidden;
      li {
        float: left;
        width: 1.2rem;
        height: 1.6rem;
        margin-left: 0.0375rem;
      }
    }
  }
}
</style>