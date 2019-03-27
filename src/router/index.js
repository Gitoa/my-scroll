import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Scroll from '@/components/scroll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Scroll',
      component: Scroll
    }
  ]
})
