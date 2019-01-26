import axios from '@/tools/axios'
import apis from '@/apis'
const LoadDota=(commit,mutationName,payload)=>{
    axios.get(payload.api,{pageSize:payload.pageSize,pageNo:payload.pageNo}).then(resp=>{
        commit(mutationName,resp.data)
    })
}
const state={
    allUsers:[],
    allRoles:[],
    allPermissions:[]
}
const getters={
        allUsers(state){
            return state.allUsers;
        },
        allRolles(state){
            return state.allRoles;
        },
        allPermissions(state){
            return  window.toTree(state.allPermissions);
        },
        
}
const mutations={
    LOADPERMISSIONS(state,payload){
        state.allPermissions=payload.allPermission;
    },
    loadAllACCOUNT(state,payload){
    state.allUsers=payload.allUsers;
    },
    LOADALLROLES(state,payload){
    state.allRoles=payload.allRoles;
    }
}
const actions={
    loadAllAccount({commit},payload){
        axios.get(apis.findAllUsers).then(resp=>{
            commit("loadAllACCOUNT",resp.data)
        })
    },
    loadAllRoles({commit},payload){
        LoadDota(commit,'LOADALLROLES',payload)
    },
    loadAllPermission({commit},payload){
        LoadDota(commit,"LOADPERMISSIONS",payload)
    }
}
export default{
    state,
    getters,
    mutations,
    actions
}