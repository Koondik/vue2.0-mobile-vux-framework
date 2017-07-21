import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/HelloFromVux.vue'

Vue.use(Router);

export default new Router({
  mode : 'history',
  base : __dirname,
  routes: [
    {
      path: '/vux',
      name: 'vux',
      component: Hello
    },
    {
      path:'',redirect:'/vux'
    },
    {
      path:'*',redirect:'/vux'
    }
  ]
})
