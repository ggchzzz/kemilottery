import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/components/signin/signin'
import home   from '@/components/Home/Home'
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
      name:home
    }
  ]
})
