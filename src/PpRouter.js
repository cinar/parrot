import Vue from 'vue'
import Router from 'vue-router'

import PpClipList from './components/PpClipList.vue'
import PpAddClip from './components/PpAddClip.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'pp-clip-list',
      component: PpClipList
    },
    {
      path: '/add',
      name: 'pp-add-clip',
      component: PpAddClip
    }
  ]
})
