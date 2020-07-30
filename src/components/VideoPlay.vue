<template>
  <div class="videoplay">
    <Back :text="text"></Back>
    <video :src="url" controls="controls" width="100vw" height="2rem" autoplay></video>
    <div class="describe">
      <div class="name">{{playData.name || playData.title}}</div>
      <div class="sub">
        <span class="playcount">{{trsNumber(playData.playCount || playData.playTime)}}次观看</span>
        <span class="group" v-for="(item, index) in playData.videoGroup" :key="index">{{item.name}}</span>
      </div>
      <div class="introduce">
        <div class="publishTime">{{playData.publishTime || new Date(playData.publishTime)}}发布</div>
        <div class="desc">{{playData.desc || playData.description}}</div>
      </div>
      <div class="author" v-for="(item, index) in playData.artists" :key="index">
        {{item.name || item.nickname}}
      </div>
    </div>
  </div>
</template>

<script>
import Back from "@/components/Back";
import { getMvdata, getMvurl, getVideodata, getVideourl } from "@/request/getdata";
import { stringLocale } from "@/tool/tools.js";
export default {
  name: 'VideoPlay',
  components: {
    Back
  },
  data() {
    return {
      text: '',
      playData: {},
      url: '',
    }
  },
  methods: {
    getData() {
      if(this.$route.query.type === 'mv') {
        getMvdata(this.$route.query.id).then(res => {
          console.log(res);
          this.text = res.data.name;
          let obj = {};
          obj.name = res.data.name;
          obj.playCount = res.data.playCount;
          obj.videoGroup = res.data.videoGroup;
          obj.publishTime = res.data.publishTime;
          obj.artists = res.data.artists;
          obj.desc = res.data.desc;
          this.playData = obj;
        })
        getMvurl(this.$route.query.id).then(res => {
          console.log(res);
          this.url = res.data.url;
        })
      }else if(this.$route.query.type === 'video') {
        getVideodata(this.$route.query.id).then(res => {
          console.log(res);
          this.text = res.data.title;
          let obj = {};
          obj.name = res.data.title;
          obj.playCount = res.data.playTime;
          obj.videoGroup = res.data.videoGroup;
          obj.publishTime = res.data.publishTime;
          obj.artists = [];
          obj.artists.push(res.data.creator);
          obj.desc = res.data.description;
          this.playData = obj;
        })
        getVideourl(this.$route.query.id).then(res => {
          console.log(res);
          this.url = res.urls[0].url;
        })
      }
    },
    trsNumber(n) {
      return stringLocale(n);
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
.videoplay {
  video {
    width: 100vw;
    height: 2rem;
    object-fit: fill;
  }
  .describe {
    padding: 0 0.1rem;
    color: #666;
    font-size: 0.12rem;
    .name {
      color: #000;
      font-size: 0.14rem;
    }
    .sub {
      .group {
        display: inline-block;
        padding: 0.06rem;
        height: 0.14rem;
        background-color: #ccc;
        margin-left: 0.1rem;
        border-radius: 0.14rem;
      }
    }
    .author {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>