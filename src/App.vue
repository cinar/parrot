<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-bind:src="user.photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ user.displayName }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-on:click="listClips()">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>List Clips</v-list-item-content>
        </v-list-item>

        <v-list-item v-if="user.isAnonymous" v-on:click="login()">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>Login</v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!user.isAnonymous" v-on:click="logout()">
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

    user: function() {
      return this.$store.getters.user
    }
  },

  created: function() {
    this.$store.dispatch('init')
  },

  methods: {
    toggleDrawer: function() {
      this.drawer = !this.drawer
    },

    listClips: function() {
      this.$router.push({ path: "/" })
      this.toggleDrawer()
    },

    login: function() {
      this.$store.dispatch('login')
      this.toggleDrawer()
    },

    logout: function() {
      this.$store.dispatch('logout')
      this.toggleDrawer()
    }
  }
}
</script>

<style>
</style>
