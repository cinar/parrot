<template>
  <div class="md-layout-item md-size-50">
    <div class="pp-clip-item-content" 
         v-bind:class="backgroundColor"
         v-on:click="play()"
         v-on:dblclick="remove()"
    >
      <span class="md-title pp-clip-item-name">{{clip.name}}</span>
    </div>
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
      playing: false
    }
  },

  computed: {
    backgroundColor() {
      return 'pp-background-' + this.clip.color
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
.pp-clip-item-content {
  margin: 2px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.pp-background-red {
  background-color: red;
}

.pp-background-green {
  background-color: green;
}

.pp-background-blue {
  background-color: blue;
}

.pp-background-yellow {
  background-color: yellow;
}

.pp-clip-item-name {
  color: white;
}
</style>
