import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './vuex/store'
import './registerServiceWorker'
import  'element-ui'
import   'element-ui/lib/theme-chalk/index.css'
import apis from '@/apis/api'
import axios from 'axios';
import './tools/axios.js'
import ElementUI from 'element-ui';
import '@/mixin/mixin'
import 'reset-css'
import 'font-awesome/css/font-awesome.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL=process.env.VUE_APP_baseURL;
router.beforeEach((to,from,next)=>{
  //如果用户跳转的页面是登录页面，则直接放行，并且表示该用退出，浏览器应该删除和该用户有关的信息
  //
  if(to.path=='/signIn'){
    localStorage.removeItem('token');
    next();
  }
  else{
    const token=localStorage.getItem("token");
    if(token)
    {
      next();
    }
    else{
      //如果没有登录，则必须跳转到登录页面
      //如果登录页面，带上要去的页面
      next({path:'/signIn',query:{redirect:to.path}})
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
