<template>
  <div id="searchresult">
    <Swiper
    :scrollX="true"
    :scrollY="false"
    class="swiper"
    >
      <nav @click="chooseNav">
        <span :class="resultType === '综合' ? 'ischoose' : ''">综合</span>
        <span :class="resultType === '单曲' ? 'ischoose' : ''">单曲</span>
        <span :class="resultType === '视频' ? 'ischoose' : ''">视频</span>
        <span :class="resultType === '歌手' ? 'ischoose' : ''">歌手</span>
        <span :class="resultType === '专辑' ? 'ischoose' : ''">专辑</span>
        <span :class="resultType === '歌单' ? 'ischoose' : ''">歌单</span>
        <span :class="resultType === '电台' ? 'ischoose' : ''">电台</span>
        <span :class="resultType === '用户' ? 'ischoose' : ''">用户</span>
    </nav>
    </Swiper>
    <!-- {{value}} -->
    <Comprehensive v-show="resultType === '综合'"></Comprehensive>
    <div class="no"></div>
    <Swiper
    class="result-songs"
    :data="updateData"
    :scrollY="true"
    :pullup="true"
    @scrollToEnded="pullupRequest"
    >
      <div class="content">
        <List v-for="(item, index) in songsData" :key="index + 'ss'" v-show="resultType === '单曲'" @click.native="setPlaysong(item.id)">
          <template v-slot:inf-name>{{item.name}}</template>
          <template v-slot:inf-au><span v-for="(jtem, jndex) in item.artists" :key="jndex + 's'">{{jtem.name}}</span></template>
        </List>
        <List v-for="(item, index) in videosData" :key="index + 'vv'" v-show="resultType === '视频'" class="video" @click.native="goPlayvideo(item.vid)">
          <template v-slot:img><img :src="item.coverUrl" alt=""></template>
          <template v-slot:inf-name>{{item.title}}</template>
          <template v-slot:inf-au><span v-for="(jtem, jndex) in item.creator" :key="jndex + 'v'">{{jtem.userName}}</span></template>
        </List>
        <List v-for="(item, index) in singleData" :key="index + 'ar'" v-show="resultType === '歌手'" class="single">
          <template v-slot:img><img :src="item.picUrl" alt=""></template>
          <template v-slot:inf-name>{{item.name}}</template>
        </List>
        <List v-for="(item, index) in albumData" :key="index + 'al'" v-show="resultType === '专辑'" class="album" @click.native="goListDetail(item.id, '专辑')">
          <template v-slot:img><img :src="item.picUrl" alt=""></template>
          <template v-slot:inf-name>{{item.name}}</template>
          <template v-slot:inf-au><span v-for="(jtem, jndex) in item.artists" :key="jndex + 'a'">{{jtem.name}}</span></template>
        </List>
        <List v-for="(item, index) in userData" :key="index + 'us'" v-show="resultType === '用户'" class="user" @click.native="goUser(item.userId)">
          <template v-slot:img><img :src="item.avatarUrl" alt=""></template>
          <template v-slot:inf-name>{{item.nickname}}</template>
          <template v-slot:inf-au>{{item.signature}}</template>
        </List>
        <List v-for="(item, index) in listData" :key="index + 'li'" v-show="resultType === '歌单'" class="album" @click.native="goListDetail(item.id, '歌单')">
          <template v-slot:img><img :src="item.coverImgUrl" alt=""></template>
          <template v-slot:inf-name>{{item.name}}</template>
          <template v-slot:inf-au>{{item.trackCount}}首 by {{item.creator && item.creator.nickname}} 播放{{item.playCount}}次</template>
        </List>
        <div style="text-align: center">{{loading}}</div>
      </div>
    </Swiper>
    
  </div>
</template>

<script>
import Swiper from "@/components/Swiper";
import Comprehensive from "@/components/Comprehensive";
import List from "@/components/List";
import { getsearchResult } from "@/request/getdata";
export default {
  name: 'SearchResult',
  components: {
    Swiper,
    Comprehensive,
    List
  },
  data() {
    return {
      resultType: '综合',
      songsData: [],
      videosData: [],
      singleData: [],
      albumData: [],
      userData: [],
      listData: [],
      loading: '努力加载中...',
      offset: 0,
      requestFlat: true,
      updateData: []
    }
  },
  methods: {
    //tag栏选择函数
    chooseNav(e) {
      if(e.target.innerText.length > 2) {
        return;
      }
      this.songsData = [];
      this.videosData = [];
      this.singleData = [];
      this.albumData = [];
      this.userData = [];
      this.listData = [];
      this.offset = 0;
      this.resultType = e.target.innerText;
      console.log(e.target.innerText);
      this.setRequest(this.resultType);
    },
    //分类请求函数
    setRequest(type) {
      switch(type) {
        case '综合':
          break;
        case '单曲':
          this.requestData(this.serachWord, 20, this.offset, 1);
          break;
        case '视频':
          this.requestData(this.serachWord, 20, this.offset, 1014);
          break;
        case '歌手':
          this.requestData(this.serachWord, 20, this.offset, 100);
          break;
        case '专辑':
          this.requestData(this.serachWord, 20, this.offset, 10);
          break;
        case '用户':
          this.requestData(this.serachWord, 20, this.offset, 1002);
          break;
        case '歌单':
          this.requestData(this.serachWord, 20, this.offset, 1000);
          break;
      }
    },
    //请求数据
    requestData(keywords, limit = 20, offset = 0, type = 1) {
      getsearchResult(keywords, limit, offset, type).then(res => {
        console.log(res);
        switch(this.resultType) {
          case '综合':
            break;
          case '单曲':
            this.processSongs(res);
          break;
          case '视频':
            this.processVideo(res);
            break;
          case '歌手':
            this.processSinger(res);
            break;
          case '专辑':
            this.processAlbum(res);
            break;
          case '用户':
            this.processUsers(res);
            break;
          case '歌单':
            this.processList(res);
            break;
        }
        
      })
    },
    //下拉请求函数
    pullupRequest() {
      console.log('1');
      console.log(this.requestFlat)
      if(this.requestFlat) {
        this.setRequest(this.resultType);
      }
    },
    //单曲数据处理
    processSongs(res) {
      for(let item of res.result.songs) {
        this.songsData.push(item);
      }
      // this.songsData = res.result.songs;
      if(res.result.hasMore === true) {
        this.offset += 20;
      }else {
        this.requestFlat = false;
        this.loading = '没有更多啦！'
      }
    },
    processVideo(res) {
      for(let item of res.result.videos) {
        this.videosData.push(item);
      }
      // this.songsData = res.result.songs;
      if(res.result.hasMore === true) {
        this.offset += 20;
      }else {
        this.requestFlat = false;
        this.loading = '没有更多啦！'
      }
    },
    processSinger(res) {
      for(let item of res.result.artists) {
        this.singleData.push(item);
      }
      // this.songsData = res.result.songs;
      if(res.result.hasMore === true) {
        this.offset += 20;
      }else {
        this.requestFlat = false;
        this.loading = '没有更多啦！'
      }
    },
    processAlbum(res) {
      for(let item of res.result.albums) {
        this.albumData.push(item);
      }
      // this.songsData = res.result.songs;
      if(res.result.hasMore === true || this.offset <= 580) {
        this.offset += 20;
      }else {
        this.requestFlat = false;
        this.loading = '没有更多啦！'
      }
    },
    processUsers(res) {
      for(let item of res.result.userprofiles) {
        this.userData.push(item);
      }
      // this.songsData = res.result.songs;
      if(res.result.hasMore === true) {
        this.offset += 20;
      }else {
        this.requestFlat = false;
        this.loading = '没有更多啦！'
      }
    },
    processList(res) {
      for(let item of res.result.playlists) {
        this.listData.push(item);
      }
      // this.songsData = res.result.songs;
      if(res.result.hasMore === true) {
        this.offset += 20;
      }else {
        this.requestFlat = false;
        this.loading = '没有更多啦！'
      }
    },
    setPlaysong(id) {
      console.log('1')
      this.$store.dispatch('requestSongdata', id);
    },
    goPlayvideo(id) {
      console.log(id)
      if(Object.is(Number(id), NaN)) {
        this.$router.push({
          path: '/VideoPlay',
          query: {
            id: id,
            type: 'video'
          }
        })
      }else {
        this.$router.push({
          path: '/VideoPlay',
          query: {
            id: id,
            type: 'mv'
          }
        })
      }
    },
    goUser(id) {
      this.$router.push({
        path: '/User',
        query: {
          userId: id,
          type: '用户'
        }
      })
    },
    goListDetail(id, type) {
      this.$router.push({
        path: '/Detail',
        query: {
          id: id,
          type: type
        }
      })
    },
  },
  computed: {
    serachWord() {
      return this.$route.query.value;
    }
  },
  watch: {
    serachWord: function() {
      this.setRequest(this.resultType);
    },
    resultType: function() {
      switch(this.resultType) {
        case '单曲':
          this.updateData = this.songsData;
          break;
        case '视频':
          this.updateData = this.videosData;
          break;
        case '歌手':
          this.updateData = this.singleData;
          break;
        case '专辑':
          this.updateData = this.albumData;
          break;
        case '用户':
          this.updateData = this.userData;
          break;
        case '歌单':
          this.updateData = this.listData;
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#searchresult {
  margin-top: 0.4rem;
  .swiper {
    position: fixed;
    top: 0.4rem;
    left: 0;
    z-index: 0;
    width: 100vw;
    height: 0.2rem;
    background-color: #fc3a3a;
    color: #d3d7d4;
    nav {
      height: 0.2rem;
      width: 4.8rem;
      // overflow: hidden;
      span {
        float: left;
        width: 0.4rem;
        margin-left: 0.2rem;
        line-height: 0.2rem;
        text-align: center;
      }
      .ischoose {
        color: #fff;
      }
    }
  }
  .no {
    height: 0.2rem;
  }
  .result-songs {
    // margin-top: 0.4rem;
    overflow: hidden;
    height: calc(100vh - 1rem);
    .content {
      .video {
        img {
          width: 0.8rem;
          height: 0.5rem;
          border-radius: 0.05rem;
        }
      }
      .single {
        img {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
        }
      }
      .album {
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
      .user {
        img {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>