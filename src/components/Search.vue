<template>
  <div id="search">
    <div class="up">
      <span class="iconfont icon-fanhui" @click="goBack"></span>
      <input type="text" @keyup="setSearch" ref="input"/>
      <div class="suggest" :class="suggsetShow ? 'suggest-show' : ''" @touchstart.stop="touchStart">
        <ul>
          <li>
            搜索“{{searchText}}”
          </li>
          <li v-for="(item, index) in searchSuggsetData" :key="index">
            <span class="iconfont icon-search"></span>
            <span>{{item.keyword}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main" v-show="!showResult">
      <h4>热搜榜</h4>
      <ul>
        <li v-for="(item, index) in searchData" :key="index">
          <span class="number">{{index}}</span>
          <span class="text">
            <div>
              <span class="word">{{item.searchWord}}</span>
              <img :src="item.iconUrl" alt="">
              <span class="score">{{item.score}}</span>
            </div>
            <div class="content">{{item.content}}</div>
          </span>
        </li>
      </ul>
    </div>
    <!-- <keep-alive> -->
      <router-view v-show="showResult"></router-view>
    <!-- </keep-alive> -->
    
    <Player></Player>
  </div>
</template>

<script>
import { getSearchDetail, getsearchSuggest } from "@/request/getdata";
import Player from "@/components/Player";
export default {
  name: 'Search',
  components: {
    Player
  },
  data() {
    return {
      searchData: [],
      throttleFlag: {},
      searchSuggsetData: [],
      searchText: '',
      suggsetShow: false,
      showResult: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //获取热搜列表数据
    getSearchData() {
      getSearchDetail().then(res => {
        console.log(res);
        this.searchData = res.data
      })
    },
    //获取搜索建议
    setSearch() {
      // console.log(this.$refs.input.value);
      this.searchText = this.$refs.input.value;
      clearTimeout(this.throttleFlag);
      this.throttleFlag = setTimeout(() => {
        if(this.$refs.input.value.trim() !== '') {
          this.suggsetShow = true;
          getsearchSuggest(this.$refs.input.value, 'mobile').then(res => {
            console.log(res);
            this.searchSuggsetData = res.result.allMatch;
            console.log(this.searchSuggsetData)
          })
        }else {
          this.suggsetShow = false;
        }
      }, 150);
    },
    touchStart(e) {
      e.preventDefault();
      this.searchText = e.target.innerText;
      console.log(e.target.innerText);
      this.suggsetShow = false;
      this.showResult = true;
      this.$router.push({
        path: '/Search/SearchResult',
        query: {
          value: this.searchText
        }
      })
    },
  },
  computed: {
    value() {
      return this.$route.query.value
    }
  },
  watch: {
    value: function() {
      if(this.value) {
      this.showResult = true;
    } else {
      this.showResult = false;
    }
    }
  },
  mounted() {
    if(this.value) {
      this.showResult = true;
    }
    this.getSearchData();
  }
}
</script>

<style lang="scss" scoped>
#search {
  overflow: hidden;
  min-height: 0.4rem;
  padding-bottom: 0.4rem;
  .up {
    height: 0.4rem;
    width: 100vw;
    line-height: 0.4rem;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #fc3a3a;
    > span {
      margin-left: 0.05rem;
      &::before {
        color: #fff;
      }
    }
    input {
      margin: 0;
      padding: 0;
      width: calc(100vw - 0.8rem);
      height: 0.16rem;
      margin-left: 0.1rem;
      border: 0;
      border-bottom: 1px solid #fff;
      outline: none;
      padding: 0.02rem;
      background-color: #fc3a3a;
      color: #fff;
    }
    .suggest {
      position: absolute;
      // height: 3rem;
      width: calc(100vw - 0.4rem);
      margin-left: 0.2rem;
      box-shadow: 0rem 0.1rem 0.2rem #999;
      background-color: #fff;
      transform-origin: top left;
      transform: scale(0, 0);
      transition: transform 0.2s;
      z-index: 1;
      ul {
        li {
          padding-left: 0.1rem;
          .iconfont {
            &::before {
              font-size: 0.12rem;
            }
          }
        }
      }
    }
    .suggest-show {
      transform: scale(1, 1);
    }
  }
  
  .main {
    h4 {
      margin-top: 0.6rem;
      margin-bottom: 0;
      margin-left: 0.12rem;
    }
    ul {
      li {
        overflow: hidden;
        height: 0.6rem;
        position: relative;
        margin-bottom: 0.15rem;
        > span {
          float: left;
        }
        .number {
          font-size: 0.14rem;
          line-height: 0.6rem;
          padding: 0 0.15rem;
          width: 0.2rem;
        }
        .text {
          div {
            line-height: 0.3rem;
            .word {
              font-size: 0.16rem;
            }
            .score {
              position: absolute;
              right: 0.15rem;
              top: 0;
              color: #999;
            }
          }
          img {
            height: 0.1rem;
            margin-left: 0.02rem;
            vertical-align: middle;
          }
          .content {
            font-size: 0.12rem;
            color: #666;
          }
        }
      }
    }
  }
  
}
</style>