<template>
  <div class="pp-audio-recorder">
    <v-card class="d-flex pp-card" height="60" outlined>
      <v-card-actions>
        <v-btn v-if="!recording && !playing" v-on:click="record()" color="red" dark>
          <v-icon>mdi-microphone</v-icon>Record
        </v-btn>
        <v-btn v-if="audio && (!recording && !playing)" v-on:click="play()" color="primary" dark>
          <v-icon>mdi-play</v-icon>Play
        </v-btn>
        <v-btn v-if="recording" v-on:click="stop()" color="red" dark>
          <v-icon>mdi-stop</v-icon>Stop
        </v-btn>
        <span class="pp-status" v-if="recording">Recording... ({{duration}} seconds.)</span>
        <span class="pp-status" v-if="playing">Playing...</span>
      </v-card-actions>
    </v-card>
    <div class="v-text-field__details">
      <div class="v-messages theme--light error--text" role="alert">
        <div class="v-messages__wrapper">
          <div class="v-messages_message">
            <span class="pp-error">Error</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pp-audio-recorder",

  prop: ["value"],

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
            vm.saveAudio(e.data)
          }

          vm.mediaRecorder.onstop = function() {
            stream.getTracks().forEach(function(track) {
              track.stop()
            })
          }

          vm.timer()
          vm.mediaRecorder.start()
        })
    },

    play: function() {
      const vm = this

      this.playing = true
      this.mediaPlayer = new Audio(this.audio)

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

        setTimeout(function() {
          vm.duration++
          vm.timer()
        }, 1000)
      } else {
        this.duration = 0
      }
    },

    saveAudio: function(blob) {
      const fileReader = new FileReader()
      const vm = this

      fileReader.onload = function(e) {
        vm.audio = e.target.result
        vm.$emit("input", vm.audio)
      }

      fileReader.readAsDataURL(blob)
    }
  }
}
</script>

<style scoped>
.pp-audio-recorder {
  margin-bottom: 12px;
}

.pp-status {
  margin-left: 1em;
}

.pp-error {
  margin-left: 12px;
  visibility: hidden;
}
</style>
