<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="images/parrot-192.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Parent Parrot</v-list-item-title>
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
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon v-on:click.stop="toggleDrawer()"></v-app-bar-nav-icon>

      <v-toolbar-title>Parent Parrot</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-bottom-sheet v-model="addClipSheet">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-subheader>Add Clip</v-subheader>
          <pp-add-clip v-model="addClipSheet"></pp-add-clip>
        </v-list>
      </v-bottom-sheet>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PpAddClip from "./components/PpAddClip.vue"

export default {
  name: "app",

  data: function() {
    return {
      drawer: false,
      addClipSheet: false
    }
  },

  components: {
    PpAddClip
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
    }
  }
}
</script>

<style>
</style>
