<template>
  <div id="home">
    我是发现
    <button>aaa</button>
    <a href="/">aa</a>
  </div>

</template>

<script>
import { getBanner } from '@/request/getdata'
export default {
  name: 'Home',
  data() {
    return {
      bannersData: [],
    }
  },
  methods: {
    getBannerData() {
      getBanner().then(res => {
        console.log(res)
        for (let item of res.banners) {
          this.bannersData.push(item)
        }
        console.log(this.bannersData);
      });
    },
  },
  mounted() {
    this.getBannerData();
  },
};
</script>

<style lang="scss" scoped>
#home {
  min-height: 100vh;
}
</style>