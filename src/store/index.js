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
    realTime: 0,
    allTime: 0,
    setTime: 0,
    sheetBottom: "-40vh"
  },
  mutations: {
    setData(state,res) {
      ({id: state.songId, name: state.songName, ar: state.songArtist, al: state.songAl} = res.songs[0]);
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
    },
    setAlltime(state, time) {
      state.allTime = time;
    },
    setrealTime(state, time) {
      state.realTime = time;
    },
    setTime(state, time) {
      state.setTime = time;
    },
    setSheet(state) {
      if(state.sheetBottom === '-40vh') {
        state.sheetBottom = '0.4rem';
      } else if(state.sheetBottom === '0.4rem') {
        state.sheetBottom = '-40vh';
      }
      
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
