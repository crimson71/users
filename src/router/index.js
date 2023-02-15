import Vue from 'vue'
import VueRouter from 'vue-router'

import UserList from '@/components/UserList.vue'

Vue.use(VueRouter)

const routes = [
 
]

const router = new VueRouter({
  // 声明路由规则
  routes:[
    {path:'/',redirect:'/user'},
    {path:'/user',component:UserList}
  ]
})

export default router
