import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "***REMOVED***",
  projectId: "parent-parrot",
  storageBucket: "***REMOVED***",
  messagingSenderId: "***REMOVED***",
  appId: "***REMOVED***",
  measurementId: "***REMOVED***"
}

firebase.initializeApp(firebaseConfig)

export default new Vuex.Store({
  state: {
    user: null,
    clips: [],
    error: null
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },

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
    },

    setError(state, error) {
      state.error = error
    }
  },

  actions: {
    login({commit}) {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).then(function(result) {
        commit('setUser', result.user)
      }).catch(function(error) {
        commit('setError', error.message)
      })
    },

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

  getters: {
    user(state) {
      return state.user
    },

    error(state) {
      return state.error
    }
  },

  plugins: [
    vuexLocalStorage.plugin
  ]
})
