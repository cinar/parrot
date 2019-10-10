<template>
  <div>
    <md-field v-bind:class="fieldClass('name')">
      <label>Name</label>
      <md-input v-model="$v.name.$model"></md-input>
      <span class="md-error" v-if="!$v.name.required">The name is required.</span>
      <span class="md-error" v-if="!$v.name.minLength">The name must be 4 or more characters.</span>
    </md-field>

    <md-field v-bind:class="fieldClass('color')">
      <label>Color</label>
      <md-select v-model="$v.color.$model">
        <md-option value="red">Red</md-option>
        <md-option value="green">Green</md-option>
        <md-option value="blue">Blue</md-option>
        <md-option value="yellow">Yellow</md-option>
      </md-select>
      <span class="md-error" v-if="!$v.color.required">The color is required.</span>
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
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'pp-add-clip',
  data: () => ({
    name: '',
    color: ''
  }),
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    color: {
      required
    }
  },
  methods: {
    fieldClass(fieldName) {
      const field = this.$v[fieldName]

      return {
        'md-invalid': field.$invalid && field.$dirty
      }
    },

    add() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }

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