<template>
  <div id="video">
    <div class="title">
      MV
      <span>{{titleShow.area}}</span>・
      <span>{{titleShow.type}}</span>・
      <span>{{titleShow.order}}</span>
      <span class="choose" @click.stop="showChoose = !showChoose">
        筛选
        <div :class="showChoose ? 'setTop' : ''" @click.stop="">
          地区：<br />
          <div><span v-for="(item, index) in allType.area" :key="index" :class="item === (temChoose.area || titleShow.area) ? 'ischoose' : ''" @click.stop="settemChoose(1, item)">{{item}}</span></div>
          类型：<br />
          <div><span v-for="(item, index) in allType.type" :key="index" :class="item === (temChoose.type || titleShow.type) ? 'ischoose' : ''" @click.stop="settemChoose(2, item)">{{item}}</span></div>
          排序：<br />
          <div><span v-for="(item, index) in allType.order" :key="index" :class="item === (temChoose.order || titleShow.order) ? 'ischoose' : ''" @click.stop="settemChoose(3, item)">{{item}}</span></div>
          <div class="sure" @click="requestAgain">完成</div>
        </div>
      </span>
    </div>
    <Swiper
        class="wrapper-allmv"
        :data="allmvData"
        :probeType="2"
        :pullup="true"
        @scrollToEnded="againRe"
        ref="swiperChildAllmv"
      >
        <ul class="content-allmv">
          <li v-for="(item, index) in allmvData" :key="index">
            <Card
              :showPlaycount="true"
              :showTime="true"
              :showartistName="true"
              :dataPlaycount="item.playCount"
              :dataImg="item.cover"
              :dataTime="item.duration"
              :dataName="item.name"
              :dataArtistName="item.artistName"
              :imgWidth="width"
              :imgHeight="height"
            ></Card>
          </li>
          <div style="text-align: center">{{load}}</div>
        </ul>
      </Swiper>
  </div>
</template>

<script>
import { getAllmv } from "@/request/getdata";
import Swiper from "@/components/Swiper";
import { stringLocale, tochance } from "@/tool/tools";
import Card from "@/components/Card";
export default {
  name: 'Video',
  components: {
    Swiper,
    Card
  },
  data() {
    return {
      titleShow: {
        area: '全部',
        type: '全部',
        order: '上升最快'
      },
      allType: {
        area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
        type: ['全部', '官方版', '原生', '现场版', '网易出品'],
        order: ['上升最快', '最热', '最新']
      },
      allmvData: [],
      temChoose: {},
      showChoose: false,
      againRequset: {
        limit: 30,
        offset: 0
      },
      load: '努力加载中...',
      height: '1rem',
      width: '1.8rem'
    }
  },
  methods: {
    getMvData(obj) {
      if(obj) {
        getAllmv(obj.area, obj.type, obj.order, obj.limit, obj.offset).then(res => {
          console.log(res);
          for (let value of res.data) {
            this.allmvData.push(value)
          }
          if(res.hasMore === false) {
            this.load = '没有更多啦！'
          }
        }, reject => {
          console.log(reject)
        })
      }else {
        getAllmv().then(res => {
          console.log(res);
          this.allmvData = res.data;
        })
      }
    },
    settemChoose(type, value) {
      switch(type) {
        case 1:
          this.$set(this.temChoose,'area',value)
          break;
        case 2:
          this.$set(this.temChoose,'type',value)
          break;
        case 3:
          this.$set(this.temChoose,'order',value)
          break;
      }
    },
    requestAgain() {
      if(Object.keys(this.temChoose).length) {
        this.temChoose.limit = 30;
        this.temChoose.offset = 0;
        this.allmvData = [];
        this.getMvData(this.temChoose);
        this.temChoose.area ? this.$set(this.titleShow, 'area', this.temChoose.area) : '';
        this.temChoose.type ? this.$set(this.titleShow, 'type', this.temChoose.type) : '';
        this.temChoose.order ? this.$set(this.titleShow, 'order', this.temChoose.order) : '';
        this.temChoose = {};
      }
      this.showChoose = false;
    },
    localeString(value) {
      return stringLocale(value)
    },
    transTime(time) {
      return tochance(time);
    },
    againRe() {
      this.againRequset.offset += 30;
      let obj = {
        area: this.titleShow.area,
        type: this.titleShow.type,
        order: this.titleShow.order,
        limt: this.againRequset.limit,
        offset: this.againRequset.offset
      }
      this.getMvData(obj);
    }
  },
  created() {
    this.getMvData()
  }
}
</script>

<style lang="scss" scoped>
#video {
  ul {
    margin: 0;
    padding: 0;
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
  overflow: hidden;
  .title {
    position: relative;
    height: 0.2rem;
    line-height: 0.2rem;
    z-index: 1;
    background-color: #fff;
    .choose {
      float: right;
      // border: 1px solid #666;
      .setTop {
        top: 0.2rem;
      }
      & > div {
        position: absolute;
        // overflow: hidden;
        height: 1.41rem;
        width: 100%;
        top: -2.16rem;
        left: 0;
        // padding-left: 0.1rem;
        background-color: #6f599c;
        color: #fff;
        transition: top 0.5s;
        div {
          span {
            margin-right: 0.2rem;
          }
          .ischoose {
            color: #9b95c9;
          }
        }
        .sure {
          width: 100%;
          border-top: 1px solid #666;
          text-align: center;
        }
      }
    }
  }
  .wrapper-allmv {
    width: 100vw;
    height: 5.92rem;
    .content-allmv {
      overflow: hidden;
      li {
        position: relative;
        // display: inline-block;
        float: left;
        margin: 0 0.05rem;
        height: 1.5rem;
        &:nth-of-type(2n) {
          margin-left: 0rem;
        }
      }
    }
  }
}
</style>