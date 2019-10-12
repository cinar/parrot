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

    removeClip(state, clip) {
      const index = state.clips.indexOf(clip)
      if (index > -1) {
        state.clips.splice(index, 1)
      }
    },

    clearClips(state) {
      state.clips.splice(0, state.clips.length)
    }
  },
  actions: {
    addClip(context, clip) {
      context.commit('addClip', clip)
    },

    removeClip(context, clip) {
      context.commit('removeClip', clip)
    },

    clearClips(context) {
      context.commit('clearClips')
    }
  },
  plugins: [
    vuexLocalStorage.plugin
  ]
})
