import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import firebase from 'firebase/app'
import 'firebase/auth'

import { vuexfireMutations, firestoreAction } from 'vuexfire'

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

const ANONYMOUS_USER = {
  displayName: 'Parrent Parrot',
  photoURL: 'images/parrot-192.png'
}

export default new Vuex.Store({
  state: {
    user: null,
    clips: [],
    error: null
  },

  mutations: {
    vuexfireMutations,

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
      // eslint-disable-next-line
      console.log('setError' + error)
      state.error = error
    }
  },

  actions: {
    bindRef: firestoreAction(function(context) {
      const uid = firebase.auth().currentUser.uid
      return context.bindFirestoreRef('clips', db.collection('users').doc(uid).collection('clips'))
    }),
    
    login({commit, dispatch}) {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).then(function(result) {
        commit('setUser', result.user)
        dispatch('bindRef')
      }).catch(function(error) {
        commit('setError', error.message)
      })
    },

    logout({commit}) {
      firebase.auth().signOut().then(function() {
        commit('setUser', ANONYMOUS_USER)
      }).catch(function(error) {
        commit('setError', error.message)
      })
    },

    clearError({commit}) {
      commit('setError', null)
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
