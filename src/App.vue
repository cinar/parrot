<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-bind:src="photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ displayName }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-on:click="listClips()">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>List Clips</v-list-item-content>
        </v-list-item>

        <v-list-item v-on:click="clearClips()">
          <v-list-item-action>
            <v-icon>mdi-trash-can</v-icon>
          </v-list-item-action>
          <v-list-item-content>Clear Clips</v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!isLoggedIn" v-on:click="login()">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>Login</v-list-item-content>
        </v-list-item>

        <v-list-item v-if="isLoggedIn" v-on:click="logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon v-on:click.stop="toggleDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title>Parent Parrot</v-toolbar-title>
      <v-spacer></v-spacer>
      <pp-add-clip-bottom-sheet></pp-add-clip-bottom-sheet>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-snackbar v-model="error" bottom color="error">
      {{ error }}
    </v-snackbar>
  </v-app>
</template>

<script>
import PpAddClipBottomSheet from './components/PpAddClipBottomSheet.vue'

export default {
  name: "app",

  data: function() {
    return {
      drawer: false
    }
  },

  components: {
    PpAddClipBottomSheet
  },

  computed: {
    error: function() {
      return this.$store.state.error
    },

    isLoggedIn: function() {
      return this.$store.getters.user != null
    },

    displayName: function() {
      if (this.$store.getters.user != null) {
        return this.$store.getters.user.displayName
      } else {
        return 'Parrent Parrot'
      }
    },

    photoURL: function() {
      if (this.$store.getters.user != null) {
        return this.$store.getters.user.photoURL
      } else {
        return 'images/parrot-192.png'
      }
    }
  },

  methods: {
    toggleDrawer: function() {
      this.drawer = !this.drawer
    },

    listClips: function() {
      this.$router.push({ path: "/" })
      this.toggleDrawer()
    },

    clearClips: function() {
      this.$store.dispatch("clearClips")
      this.toggleDrawer()
    },

    login: function() {
      this.$store.dispatch('login')
    },

    logout: function() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
</style>
