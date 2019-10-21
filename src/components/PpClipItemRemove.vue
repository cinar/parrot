<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title class="headline">Remove Clip?</v-card-title>

      <v-card-text>Do you want to remove {{clip.name}}?</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-on:click="remove()" text>Yes</v-btn>
        <v-btn v-on:click="dialog = false" text>No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['clip'],

  data: function() {
    return {
      dialog: false
    }
  },

  methods: {
    show: function() {
      this.dialog = true
    },

    remove: function() {
      this.$store.dispatch('removeClip', this.clip)
    }
  }
}
</script>