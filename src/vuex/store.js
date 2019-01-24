import Vue from 'vue'
import Vuex from 'vuex'
import SystemModule from './SystemModule'
Vue.use(Vuex)
const toTree=(item)=>{
  var obj={};
  var length=item.length;
  for(let i=0;i<length;i++){
    var permission=item[i];
    if(!permission.parentid){
      permission.children=[];
      obj[permission._id]=permission;
    }
  }
  for( let i=0;i<length;i++){
    var permission=item[i];
    for(var key in obj){
      if(permission.parentid==key)
      obj[key].children.push(permission);
    }
  }
  var arr=[];
  for(let key in obj ){
      arr.push(obj[key])
  }
  console.log(obj);
  console.log(arr);
  return arr;
}
export default new Vuex.Store({
  modules:{SystemModule},//注册模块
  state: {
    accountPermission:[],//当前账号的权限
    accountRoles:[],//当前账号的角色管理
  },
  getters:{
    accountPermission(){
      // console.log("当前账户");
     return  toTree(JSON.parse(localStorage.getItem('accountInfo')).permissions)
      // return JSON.parse(localStorage.getItem('accountInfo')).permissions;
    },
    accountRoles(){
      return JSON.parse(localStorage.getItem('accountInfo')).roles;
    }
  },
  mutations: {
 
  },
  actions: {

  }
})
