<template>
  <div>
    <md-button
      class="md-icon-button md-raised md-accent"
      v-if="!recording && !playing"
      v-on:click="record()"
    >
      <md-icon>mic</md-icon>
    </md-button>
    <md-button
      class="md-icon-button md-raised md-primary"
      v-if="audio && (!recording && !playing)"
      v-on:click="play()"
    >
      <md-icon>play_arrow</md-icon>
    </md-button>
    <md-button
      class="md-icon-button md-accent"
      v-if="recording"
      v-on:click="stop()"
    >
      <md-icon>stop</md-icon>
    </md-button>
    <span class="pp-blink" v-if="recording">Recording... ({{duration}} seconds.)</span>
    <span v-if="playing">Playing...</span>
  </div>
</template>

<script>
export default {
  name: 'pp-audio-recorder',

  prop: [
    'value'
  ],

  data: function() {
    return {
      recording: false,
      playing: false,
      audio: null,
      duration: 0
    }
  },

  created: function() {
    this.mediaRecorder = null
    this.mediaPlayer = null
  },

  methods: {
    record: function() {
      const vm = this

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function(stream) {
          vm.recording = true

          vm.mediaRecorder = new MediaRecorder(stream)

          vm.mediaRecorder.ondataavailable = function(e) {
            vm.audio = e.data
          }

          vm.mediaRecorder.onstop = function() {
            stream.getTracks().forEach(function(track) {
              track.stop()
            })

            vm.$emit('input', vm.audio)
          }

          vm.timer()
          vm.mediaRecorder.start()
        })
    },

    play: function() {
      const vm = this

      this.playing = true
      this.mediaPlayer = new Audio(URL.createObjectURL(this.audio))

      this.mediaPlayer.onended = function() {
        vm.playing = false
        vm.mediaPlayer = null
      }

      this.mediaPlayer.play()
    },

    stop: function() {
      if (this.recording) {
        this.recording = false

        if (this.mediaRecorder) {
          this.mediaRecorder.stop()
          this.mediaRecorder = null
        }
      }
    },

    timer: function() {
      if (this.recording) {
        const vm = this

        setTimeout(function () {
          vm.duration++
          vm.timer()
        }, 1000)
      } else {
        this.duration = 0
      }
    }
  }
}
</script>

<style scoped>
@keyframes fade {
    from { opacity: 1.0; }
    50% { opacity: 0.5; }
    to { opacity: 1.0; }
}

@-webkit-keyframes fade {
    from { opacity: 1.0; }
    50% { opacity: 0.5; }
    to { opacity: 1.0; }
}

.pp-blink {
  animation:fade 1000ms infinite;
  -webkit-animation:fade 1000ms infinite;
}
</style>
