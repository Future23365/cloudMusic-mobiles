import Vue from "vue";
import Vuex from "vuex";
import { getsongDetail, getsongUrl } from "@/request/getdata"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songId: 0,
    songName: '',
    songArtist: [],
    songAl: {},
    songPlay: false,
    songUrl: '',

  },
  mutations: {
    setData(state,res) {
      ({id: state.songId, name: state.songName, ar: state.songArtist, al: state.songAl} = res.songs[0])
    },
    setUrl(state, res) {
      state.songUrl = res.data[0].url;
    },
    setPlay(state) {
      state.songPlay = !state.songPlay;
    },
    setPlayTrue(state) {
      state.songPlay = false;
      setTimeout(() => {
        state.songPlay = true;
      }, 10)
    }
  },
  actions: {
    requestSongdata(context, id) {
      getsongDetail(id).then(res => {
        console.log(res);
        context.commit('setData', res);
      })
      getsongUrl(id).then(res => {
        console.log(res);
        context.commit('setUrl', res);
        context.commit('setPlayTrue');
      })
    }
  },
  modules: {}
});
