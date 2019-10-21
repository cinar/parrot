import Vue from 'vue'
import App from './App.vue'

import ppRouter from './PpRouter'
import ppStore from './PpStore'
import ppVuetify from './PpVuetify'
import './PpRegisterServiceWorker'

Vue.config.productionTip = false

new Vue({
  router: ppRouter,
  store: ppStore,
  vuetify: ppVuetify,
  render: h => h(App),
}).$mount('#app')
