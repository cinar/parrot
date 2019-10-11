import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    clips: []
  },
  mutations: {
    addClip(state, clip) {
      state.clips.push(clip)
    },

    clearClips(state) {
      state.clips.splice(0, state.clips.length)
    }
  },
  actions: {
    addClip(context, clip) {
      context.commit('addClip', clip)
    },

    clearClips(context) {
      context.commit('clearClips')
    }
  },
  plugins: [
    vuexLocalStorage.plugin
  ]
})
