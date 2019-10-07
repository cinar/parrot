import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'

import ppRouter from './PpRouter'
import ppStore from './PpStore'

Vue.config.productionTip = false

Vue.use(VueMaterial)

new Vue({
  router: ppRouter,
  store: ppStore,
  render: h => h(App),
}).$mount('#app')
