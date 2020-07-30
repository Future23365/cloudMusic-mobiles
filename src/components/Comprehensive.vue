<template>
  <div id="comprehensive">
    <h5>单曲</h5>
    <div class="songs">
      
    </div>
    <h5>歌手</h5>
    <div class="artists">
      
    </div>
    <h5>专辑</h5>
  </div>
</template>

<script>
import { getsearchResult } from "@/request/getdata";
export default {
  name: 'Comprehensive',
  data() {
    return {
      songs: [],
      artists: [],
      albums: []
    }
  },
  methods: {
    getResultData(value) {
      getsearchResult(value).then(res => {
        console.log(res);
      })
    },
    setPlaysong(id) {
      this.$store.dispatch('requestSongdata', id);
    }
  },
  mounted() {
    this.getResultData(this.value);
  },
  computed: {
    value() {
      return this.$route.query.value;
    }
  },
  watch: {
    // value: function() {
    //   if(this.value.trim() !== '') {
    //     this.getResultData(this.value);
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
#comprehensive {
  padding-left: 0.12rem;
  .songs {
    ul {
      li {
        overflow: hidden;
        >span {
          float: left;

          &:nth-of-type(2) {
            float: right;
          }
        }
      }
    }
  }
  .artists {
    ul {
      li {
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