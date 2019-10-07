<template>
  <div>
    <md-field>
      <label>Name</label>
      <md-input v-model="name"></md-input>
    </md-field>

    <md-field>
      <label>Color</label>
      <md-select v-model="color">
        <md-option value="red">Red</md-option>
        <md-option value="green">Green</md-option>
        <md-option value="blue">Blue</md-option>
        <md-option value="yellow">Yellow</md-option>
      </md-select>
    </md-field>

    <div>
      <md-button class="md-accent md-raised">
        <md-icon>fiber_manual_record</md-icon>
        <span>Record</span>
      </md-button>

      <md-button class="md-raised">
        <md-icon>play_arrow</md-icon>
        <span>Play</span>
      </md-button>
    </div>

    <md-button class="md-primary md-raised" v-on:click="add()">
      Add
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'pp-add-clip',
  data: () => ({
    name: '',
    color: ''
  }),
  methods: {
    add() {
      this.$store.dispatch('addClip', {
        name: this.name,
        color: this.color
      })

      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>

</style>