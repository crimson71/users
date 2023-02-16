import Vue from 'vue'
import VueRouter from 'vue-router'

import UserList from '@/components/UserList.vue'
import UserDetail from '@/components/UserDetail.vue'

Vue.use(VueRouter)

const routes = [
 
]

const router = new VueRouter({
  // 声明路由规则
  routes:[
    {path:'/',redirect:'/user'},
    {path:'/user',component:UserList},
    {path:'/users/:id',component:UserDetail,props:true}
  ]
})

export default router
