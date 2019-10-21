<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-subheader>Add Clip</v-subheader>
      <pp-add-clip v-model="sheet"></pp-add-clip>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import PpAddClip from "./PpAddClip.vue"

export default {
  components: {
    PpAddClip
  },

  data: function() {
    return {
      sheet: false
    }
  }
}
</script>