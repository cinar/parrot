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
        <md-button class="md-icon-button" v-on:click="addClip()">
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
        <md-list-item v-on:click="clearClips()">
          <md-icon>clear</md-icon>
          <span class="md-list-item-text">Clear</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <div class="md-layout">
        <pp-clip-item v-for="clip in clips" v-bind:key="clip" />
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import PpClipItem from './components/PpClipItem.vue'

export default {
  name: 'app',
  components: {
    PpClipItem
  },
  data: function() {
    return {
      menuVisible: false,
      clips: []
    }
  },
  methods: {
    toggleMenu: function() {
      this.menuVisible = !this.menuVisible
    },

    addClip: function() {
      this.clips.push({})
    },

    clearClips: function() {
      this.clips.splice(0, this.clips.length)
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
