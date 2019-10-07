import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
  }
})
