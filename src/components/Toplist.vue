<template>
  <div id="toplist">
    <Back :text="'排行榜'"></Back>
    <Swiper
        class="wrapper-toplist"
        :data="toplistData"
        :probeType="2"
        ref="swiperChildToplist"
      >
        <ul class="content-toplist">
          <li v-for="(item, index) in toplistData" :key="index" @click="goListDetail(item.id)">
            <Card
              :showPlaycount="false"
              :showDes="true"
              :showartistName="false"
              :dataImg="item.coverImgUrl"
              :dataDes="item.updateFrequency"
              :showName="false"
              :imgWidth="'1.3rem'"
              :imgHeight="'1.3rem'"
            ></Card>
            <div class="right-des">
              <div>{{item.name}}</div>
              <div>{{`上次更新:${new Date(item.updateTime).getMonth() + 1}月${new Date(item.updateTime).getDate()}日`}}</div>
              <div>{{item.description}}</div>
            </div>
          </li>
        </ul>
      </Swiper>
  </div>
</template>

<script>
import Back from "@/components/Back";
import Swiper from "@/components/Swiper";
import { getToplist } from "@/request/getdata";
import Card from "@/components/Card";
export default {
  name: 'Toplist',
  components: {
    Back,
    Swiper,
    Card
  },
  data() {
    return {
      toplistData: []
    }
  },
  methods: {
    getToplistData() {
      getToplist().then(res => {
        console.log(res);
        this.toplistData = res.list;
      })
    },
    goListDetail(id) {
      this.$router.push({
        path: '/Detail',
        query: {
          id: id,
          type: '歌单'
        }
      })
    }
  },
  created() {
    this.getToplistData();
  }
}
</script>

<style lang="scss" scoped>
#toplist {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  // background-color: #777;
  .wrapper-toplist {
    width: 100vw;
    height: calc(100vh - 0.3rem);
    overflow: hidden;
    .content-toplist {
      width: 100vw;
      overflow: hidden;
      li {
        overflow: hidden;
        margin-bottom: 0.1rem;
        // background-color: #6f60aa;
        #card {
          float: left;
          margin-left: 0.1rem;
           &::v-deep .des {
            top: 1.12rem;
          }
        }
        .right-des {
          // float: right;
          width: 100vw - 37.3333333vw;
          height: 1.3rem;
          // color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          div {
            padding-left: 0.1rem;
            &:nth-of-type(3) {
              margin-bottom: 0.2rem;
            }
          }
        }
      }
    }
  }
}
</style>