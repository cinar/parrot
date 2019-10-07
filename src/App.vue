<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <div class="md-toolbar-section-start" v-if="!menuVisible">
        <md-button class="md-icon-button" v-on:click="toggleMenu()">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Parrent Parrot</span>
      </div>

      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button" to="/add">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Menu</span>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button md-dense" v-on:click="toggleMenu()">
            <md-icon>keyboard_arrow_left</md-icon>
          </md-button>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item to="/">
          <md-icon>list</md-icon>
          <span class="md-list-item-text">List</span>
        </md-list-item>

        <md-list-item v-on:click="clearClips()">
          <md-icon>clear</md-icon>
          <span class="md-list-item-text">Clear</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <router-view />
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: 'app',
  data: () =>  ({
    menuVisible: false
  }),
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible
    },

    clearClips() {
      this.$store.dispatch('clearClips')
    }
  }
}
</script>

<style>
.md-app {
  min-height: 100vh;
  max-height: 100vh;
}

</style>
