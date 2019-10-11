<template>
  <div>
    <md-button
      class="md-primary md-raised"
      v-bind:disabled="recording"
      v-on:click="record()"
    >
      Record
    </md-button>
    <md-button
      class="md-primary md-raised"
      v-bind:disabled="!recording"
      v-on:click="stop()"
    >
      Stop
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'pp-audio-recorder',

  data: function() {
    return {
      recording: false,
      audio: null
    }
  },

  created: function() {
    this.mediaRecorder = null
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
          }

          vm.mediaRecorder.start()
        })
    },

    stop: function() {
      if (this.mediaRecorder) {
        this.recording = false
        this.mediaRecorder.stop()
      }
    }
  }
}
</script>
