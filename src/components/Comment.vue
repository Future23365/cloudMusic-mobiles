<template>
  <div class="Comment">
    <Back :text="'评论'"></Back>
  </div>
</template>

<script>
import Back from "@/components/Back";
import { getsongComment } from "@/request/getdata"
export default {
  name: 'Comment',
  components: {
    Back
  },
  methods: {
    getCommentData() {
      getsongComment(this.$route.query.target, this.$route.query.id, 40).then(res => {
        console.log(res);
      })
    }
  },
  mounted() {
    this.getCommentData();
  }
}
</script>

<style lang="scss" scoped>

</style>