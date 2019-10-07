<template>
  <div class="md-layout">
    <pp-clip-item v-for="clip in $store.state.clips" v-bind:key="clip.name" v-bind:clip="clip" />
  </div>
</template>

<script>
import PpClipItem from './PpClipItem.vue'

export default {
  name: 'pp-clip-list',
  components: {
    PpClipItem
  }
}
</script>

<style scoped>

</style>