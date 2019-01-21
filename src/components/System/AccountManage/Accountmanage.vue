<template>
<div id='accountMange'>
    <div class="userList">
    <div  class="listHeader" style="width:100%;height:44px;background:white">
        <el-button type="primary" size="mini" @click="$router.push({name:'新增用户'})">新增</el-button> 
    </div>
   <table>
       <tr>
           <th>用户名</th>
           <th>角色列表</th>
           <th>操作</th>
       </tr>
       <tr v-for="(item,key) in allUsers " :key="key">
           <td>{{item.username}}</td>
           <td></td>
           <td>
               <span style="color:red" @click="deleteUser(item)">删除</span>|
               <span style="color:blue">编辑</span>
           </td>
       </tr>
   </table>   
    </div>
    <router-view/>
</div>  
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    computed:{
        ...mapGetters(["allUsers"])
    },
    methods:{

        deleteUser(item){
        const action=()=>{
            this.post(this.$apis.deleteUser,{_id:item._id}).then(()=>{
                    this.$store.dispatch('loadAllAccount');

            })
            // this.$http.post(this.$apis.deleteUser,{_id:item._id}).then((resp)=>{
            //     console.log(resp);
            //     })
            }
            this.operatorConfirm('删除该账号',action)       
        }
    },
    mounted(){
        this.$store.dispatch('loadAllAccount')
    },
}
</script>
<style lang="scss" scoped>
#accountMange{
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 200px;
    background:rgb(73, 73, 87);
    .userList{
        margin: 0 auto;
        margin-top: 20px;
        width: 60%;
       box-shadow: 0 0 5px 5px #ccc;
       background: white;
       .listHeader{
           width: 100%;
           height: 44px;
           background: white;
           display: flex;
           align-items: center;
           justify-content: flex-end;
           .el-button{
              margin-right: 20px;
           }
       }
    }
   table{
       margin: 0 auto;
       width: 100%;
       background: white;
        tr{
            width: 100%;
            height: 44px;
            text-align: center;
            &:nth-child(2n-1){
                background: cyan
            }
            th{
                font-weight: bold; 
                line-height: 44px;
            }
        }
       
   }

}
</style>
