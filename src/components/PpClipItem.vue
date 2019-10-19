<template>
  <div>
  <v-card
    v-bind:color="backgroundColor"
    v-on:click="play()"
    v-on:dblclick="removeDialog = true"
    height="120"
    class="d-flex align-center"
    dark
  >
    <v-card-text class="headline text-center">{{clip.name}}</v-card-text>
  </v-card>

  <v-dialog
    v-model="removeDialog"
  >
    <v-card>
      <v-card-title class="headline">
        Remove Clip?
      </v-card-title>

      <v-card-text>
        Do you want to remove {{clip.name}}?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          v-on:click="remove()"
          text
        >
          Yes
        </v-btn>

        <v-btn
          v-on:click="removeDialog = false"
          text
        >
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </div>
</template>

<script>
export default {
  name: 'pp-clip-item',

  props: [
    'clip'
  ],

  data: function() {
    return {
      playing: false,
      removeDialog: false
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
      this.$store.dispatch('removeClip', this.clip)
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
</style>
