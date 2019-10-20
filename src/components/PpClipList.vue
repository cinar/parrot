<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="6" v-for="clip in $store.state.clips" v-bind:key="clip.name">
        <pp-clip-item v-bind:clip="clip" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PpClipItem from "./PpClipItem.vue"

export default {
  name: "pp-clip-list",

  components: {
    PpClipItem
  }
}
</script>

<style scoped>
</style>
