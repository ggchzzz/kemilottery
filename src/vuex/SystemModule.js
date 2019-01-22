import axios from '@/tools/axios'
import api from '@/apis'
import { stat } from 'fs';
const state={
    allUsers:[],
    allRolles:[]
}
const getters={
        allUsers(state){
            return state.allUsers;
        },
        allRolles(state){
            return
        }
}
const mutations={
    loadAllACCOUNT(state,payload){
    state.allUsers=payload.allUsers;
    },
    LOADALLROLES(){
        state.allRolles=payload.allRolles;
    }
}
const actions={
    loadAllAccount({commit},payload){
        axios.get(api.findAllUsers).then(resp=>{
            console.log(resp);
            commit("loadAllACCOUNT",resp.data)
        })
        // commit("loadAllACCOUNT")
        // axios.get(payload.url,payload.params)
   
    },
    loadAllRoles({commit},payload){
        axios.get(api.findAllUsers).then(resp=>{
            console.log(resp);
            commit("loadAllACCOUNT",resp.data)
        })
    }
}
export default{
    state,
    getters,
    mutations,
    actions
}