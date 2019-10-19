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
          <v-list-item-content>
            List Clips
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-on:click="clearClips()">
          <v-list-item-action>
            <v-icon>mdi-trash-can</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Clear Clips
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon v-on:click.stop="toggleDrawer()"></v-app-bar-nav-icon>

      <v-toolbar-title>Parent Parrot</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-on:click="addClip()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',

  data: function() {
    return {
      drawer: false
    }
  },

  methods: {
    toggleDrawer: function() {
      this.drawer = !this.drawer
    },

    addClip: function() {
      this.$router.push({ path: '/add' })
    },

    listClips: function() {
      this.$router.push({ path: '/' })
      this.toggleDrawer()
    },

    clearClips: function() {
      this.$store.dispatch('clearClips')
      this.toggleDrawer()
    }
  }
}
</script>

<style>
</style>
