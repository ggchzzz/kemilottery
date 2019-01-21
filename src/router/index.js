import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/components/signin/signin'
import home   from '@/components/Home/Home'
import system from '@/components/System/System'
import permissionManger from '@/components/System/permissionManger/permissionManger'
import RoleMange from '@/components/System/RoleMange/RoleMange'
import AccountMange from '@/components/System/AccountManage/Accountmanage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/signIn',
      component:signin,
      name:'signin'
    },
    {
      path:'/home',
      component:home,
      name:home,
      children:
      [
        {
          path:'system',
          component:system,
          name:"系统管理",
          children:[
            {
              path:'AccountMange',
              component:AccountMange,
              name:"用户管理",
            },
            {
              path:'permissionManger',
              component:permissionManger,
              name:"权限管理",
            },
            {
              path:'RoleMange',
              component:RoleMange,
              name:"角色管理",
            },
          ]
        }
      ]
    }
  ]
})
