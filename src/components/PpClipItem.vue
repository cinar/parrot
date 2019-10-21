<template>
  <div>
    <v-card
      v-bind:color="backgroundColor"
      v-on:click="play()"
      v-on:dblclick="remove()"
      height="120"
      class="d-flex align-center"
      dark
    >
      <v-card-text class="headline text-center">{{clip.name}}</v-card-text>

      <pp-clip-item-remove ref="remove" v-bind:clip="clip"></pp-clip-item-remove>
    </v-card>
  </div>
</template>

<script>
import PpClipItemRemove from './PpClipItemRemove.vue'

export default {
  name: 'pp-clip-item',

  props: ['clip'],

  components: {
    PpClipItemRemove
  },

  data: function() {
    return {
      playing: false
    }
  },

  computed: {
    backgroundColor() {
      return this.clip.color.toLowerCase()
    }
  },

  methods: {
    play: function() {
      if (!this.playing) {
        this.playing = true

        const mediaPlayer = new Audio(this.clip.audio)
        const vm = this

        mediaPlayer.onended = function() {
          vm.playing = false
        }

        mediaPlayer.play()
      }
    },

    remove: function() {
      this.$refs.remove.show()
    }
  }
}
</script>

<style scoped>
</style>
