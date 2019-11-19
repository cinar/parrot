import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { vuexfireMutations, firestoreAction } from 'vuexfire'

Vue.use(Vuex)

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

const db = firebase.firestore()

const ANONYMOUS_USER = {
  displayName: 'Parrent Parrot',
  photoURL: 'images/parrot-192.png',
  isAnonymous: true
}

function getClipsCollection() {
  return db.collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection('clips')
}

export default new Vuex.Store({
  state: {
    user: ANONYMOUS_USER,
    clips: [],
    error: null
  },

  mutations: {
    ...vuexfireMutations,

    setUser(state, user) {
      state.user = user
    },

    setError(state, error) {
      // eslint-disable-next-line
      console.log('setError' + error)
      state.error = error
    }
  },

  actions: {
    init({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          commit('setUser', {
            displayName: user.displayName,
            photoURL: user.photoURL,
            isAnonymous: false
          })

          dispatch('bindClips')
        } else {
          commit('setUser', ANONYMOUS_USER)
          dispatch('unbindClips')  
        }
      })
    },

    bindClips: firestoreAction(function (context) {
      context.bindFirestoreRef('clips', getClipsCollection().orderBy('name'))
    }),

    unbindClips: firestoreAction(function (context) {
      context.unbindFirestoreRef('clips')
    }),

    addClip: firestoreAction(function (context, clip) {
      getClipsCollection().add(clip)
    }),

    removeClip: firestoreAction(function (context, clip) {
      getClipsCollection().doc(clip.id).delete()
    }),

    login({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).catch(function (error) {
        commit('setError', error.message)
      })
    },

    logout({ commit }) {
      firebase.auth().signOut().catch(function (error) {
        commit('setError', error.message)
      })
    },

    clearError({ commit }) {
      commit('setError', null)
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
    // vuexLocalStorage.plugin
  ]
})
