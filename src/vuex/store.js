import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountPermiss:[],//当前账号的权限
    accoutRoles:[],//当前账号的角色管理
  },
  getters:{
    accountPermiss(){
      return  JSON.parse(localStorage.getItem('accountInfo')).accountPermiss;
    },
    accoutRoles(){
      return JSON.parse(localStorage.getItem('accountInfo')).accoutRoles;
    }
  },
  mutations: {
 
  },
  actions: {

  }
})
