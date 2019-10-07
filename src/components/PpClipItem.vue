<template>
  <div class="md-layout-item md-size-50">
    <div class="pp-clip-item-content" v-bind:class="backgroundColor">{{clip.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'pp-clip-item',
  props: {
    clip: {
      type: Object,
      required: true
    }
  },
  computed: {
    backgroundColor() {
      return 'pp-background-' + this.clip.color
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
</style>