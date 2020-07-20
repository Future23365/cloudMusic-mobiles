<template>
  <div id="playpage">
    <Back :text="text" :inf="inf"></Back>
  </div>
</template>

<script>
import Back from "@/components/Back"
export default {
  name: 'Playpage',
  components: {
    Back
  },
  data() {
    return {
    }
  },
  computed: {
    text: function() {
      return this.$store.state.songName;
    },
    inf: function() {
      let arr = this.$store.state.songArtist
      let str = ''
      for(let i of arr) {
        str = str + i.name
      }
      return str
    }
  }
}
</script>

<style lang="scss" scoped>

</style>