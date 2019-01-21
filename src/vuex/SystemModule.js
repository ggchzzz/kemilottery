import axios from '@/tools/axios'
import api from '@/apis'
import { stat } from 'fs';
const state={
    allUsers:[]
}
const getters={
        allUsers(state){
            return state.allUsers;
        }
}
const mutations={
    loadAllACCOUNT(state,payload){
    state.allUsers=payload.allUsers;
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
   
    }
}
export default{
    state,
    getters,
    mutations,
    actions
}