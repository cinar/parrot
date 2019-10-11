<template>
  <div>
    <md-field v-bind:class="fieldClass('name')">
      <label>Name</label>
      <md-input v-model="$v.clip.name.$model"></md-input>
      <span class="md-error" v-if="!$v.clip.name.required">The name is required.</span>
      <span class="md-error" v-if="!$v.clip.name.minLength">The name must be 4 or more characters.</span>
    </md-field>

    <md-field v-bind:class="fieldClass('color')">
      <label>Color</label>
      <md-select v-model="$v.clip.color.$model">
        <md-option value="red">Red</md-option>
        <md-option value="green">Green</md-option>
        <md-option value="blue">Blue</md-option>
        <md-option value="yellow">Yellow</md-option>
      </md-select>
      <span class="md-error" v-if="!$v.clip.color.required">The color is required.</span>
    </md-field>

    <md-field class="pp-audio-recorder-field" v-bind:class="fieldClass('audio')">
      <label>Audio Clip</label>
      <pp-audio-recorder v-model="clip.audio" />
      <span class="md-error" v-if="!$v.clip.audio.required">The audio clip is required.</span>
    </md-field>

    <div>
      {{clipSize}}
    </div>

    <md-button class="md-primary md-raised" v-on:click="add()">
      Add
    </md-button>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import PpAudioRecorder from './PpAudioRecorder.vue'

export default {
  name: 'pp-add-clip',

  data: function () {
    return {
      clip: {
        name: null,
        color: null,
        audio: null
      }
    }
  },

  components: {
    PpAudioRecorder
  },

  validations: {
    clip: {
      name: {
        required,
        minLength: minLength(4)
      },
      color: {
        required
      },
      audio: {
        required
      }
    }
  },

  computed: {
    clipSize: function() {
      return (this.clip.audio) ? this.clip.audio.size : 'empty'
    }
  },

  methods: {
    fieldClass: function(fieldName) {
      const field = this.$v.clip[fieldName]

      return {
        'md-invalid': field.$invalid && field.$dirty
      }
    },

    add: function() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }

      this.$store.dispatch('addClip', this.clip)

      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.pp-audio-recorder-field {
  display: flex;
  align-items: baseline;
}
</style>
