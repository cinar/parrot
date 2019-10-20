<template>
  <v-container dense>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        v-model="clip.name"
        v-bind:rules="rules.name"
        label="Name"
        placeholder="Name of the clip."
        outlined
      ></v-text-field>

      <v-select
        v-model="clip.color"
        v-bind:rules="rules.color"
        v-bind:items="colors"
        label="Color"
        outlined
      ></v-select>

      <pp-audio-recorder v-model="clip.audio" ref="recorder"></pp-audio-recorder>

      <v-btn v-on:click="add()" color="primary">Add</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import PpAudioRecorder from "./PpAudioRecorder.vue"

export default {
  name: "pp-add-clip",

  props: ["sheet"],

  data: function() {
    return {
      valid: true,

      clip: {
        name: null,
        color: null,
        audio: null
      },

      rules: {
        name: [
          v => !!v || "The name is required",
          v => (v && v.length > 4) || "The name must be 4 characters or more."
        ],
        color: [v => !!v || "The color is required"]
      },

      colors: ["Red", "Green", "Blue", "Yellow"]
    }
  },

  components: {
    PpAudioRecorder
  },

  computed: {
    clipSize: function() {
      return this.clip.audio ? this.clip.audio.size : "empty"
    }
  },

  methods: {
    add: function() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addClip", Object.assign({}, this.clip))
        this.$emit("input", false)
        this.reset()
      }
    },

    reset: function() {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
      this.$refs.recorder.reset()
    }
  }
}
</script>

<style scoped>
</style>
