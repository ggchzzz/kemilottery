<template>
    <div id="Rolemanage">
        <div class="RoleLeft">
        <div class="RoleMangeTop">
            <span>角色列表</span>
            <el-button type="primary" size="mini" @click="showAddNew='true'">新增</el-button>
        </div>
        <table>
            <tr>
                <th>角色名</th>
                <th>角色描述</th>
                <th>操作</th>
            </tr>
            <tr v-for="item in allRolles" :key="item._id">
                <td>{{item.roleName}}</td>
                <td>{{item.roleDesc}}</td>
                <td>
                <template v-if="item.roleName!=='admin'">
                    <span style="color:red" @click="deleteRole(item)">删除</span>|
                    <span style="color:blue">编辑</span>
                </template>
                </td>
            </tr>
        </table>                   
        </div>
        <div class="RoleRight">
            <transition name="slideDown">
            <div class="addNewRole" v-show="showAddNew">
                <div class="addNewRoleTop">
                    <span >新增角色</span>
                    <i class="fa fa-times" @click="showAddNew=false"></i>
                </div>
                <el-form :model='roleInfo' :rules="rules" ref="roleInfo">
                <div class="addNewInput">
                    <div>
                        <span>角色名:</span>
                        <el-form-item prop="roleName">
                        <el-input v-model="roleInfo.roleName"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <span>角色描述:</span>
                        <el-form-item prop="roleDesc">
                        <el-input v-model="roleInfo.roleDesc"></el-input>
                        </el-form-item>
                    </div>
                </div>
                </el-form >
                <div>
                    <el-tree
                    :data="allPermissions"
                    show-checkbox
                    node-key="_id"
                    ref="tree"
                    highlight-current
                    :props="defaultProps">
                    </el-tree>
                </div>
                <div class="addNewFooter">
                    <el-button type="primary" size="mini" @click="addNewRole">确定</el-button>
                    <el-button type="danger" size="mini" >取消</el-button>

                </div>
            </div>
            </transition>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){ 
        return {
            showAddNew:false,
            roleInfo:{
                roleName:'',
                roleDesc:''
            },
            rules:{
                roleName:[
                         { required: true, message: "请输入角色名", trigger: "blur" }
                ],
                roleDesc:[
                       {required:true,message:"请输入角色描述",trigger:'blur'} 
                ]
            },
             defaultProps: {
                children: 'children',
                label: 'permissionDesc'
            }
        }
    },
    computed:{
        ...mapGetters(['allRolles','allPermissions'])
    },
    methods:{
        handClsoe(){
            this.showAddNew=false;
            this.roleInfo={};
            this.resetForm('roleInfo');
            this.$refs.tree.setCheckedKeys([]);

        },
        addNewRole(){
            var checkedPermissions=this.$refs.tree.getCheckedNodes();
            // 定义字符串，村粗所有被选中的权限，把他们的Id合并成一个字符串
            var permissionId='';
            var length=checkedPermissions.length;
            for(var i=0;i<length;i++){
                var permission=checkedPermissions[i];
                if(i<length-1){
                    if(permission.parentid!="0")
                    {
                        permissionId+=permission['_id']+','+permission.parentid+",";
                    }
                    else{
                          permissionId+=permission['_id']+',';

                    }
                }
                else
                {
                     if(permission.parentid!="0")
                    {
                        permissionId+=permission['_id']+','+permission.parentid;
                    }
                    else{
                          permissionId+=permission['_id'];

                    }
                }
            }
            // 获取所有的选中权限以及父权限，以及进行去重处理
          var rs=Array.from( new Set(permissionId.split(',')));
          this.roleInfo.permission=rs;
          this.$refs.tree.setCheckedKeys([]);
            console.log(rs);
            this.$refs['roleInfo'].validate((valid)=>{
            if(valid){
                     this.post(this.$apis.addNewRole,this.roleInfo).then(()=>{
                     this.$store.dispatch("loadAllRoles",{api:this.$apis.findAllRoles,pageSize:10,pageNo:1});
             })
                }
             else{
                    return false;
                }
            })
         
        },
        deleteRole(item){
            const action=()=>{
                this.post(this.$apis.deleteRole,{_id:item._id}).then(()=>{
                     this.$store.dispatch("loadAllRoles",{api:this.$apis.findAllRoles,pageSize:10,pageNo:1});
                })
            }
            this.operatorConfirm(`删除${item.roleDesc}角色`,action)
        }
    }
}
</script>
<style lang="scss" scoped>
.slideDown-enter-active ,.slideDown-leave-active{
    transition: all 0.5s;
}
.slideDown-enter,.slideDown-leave-active{
    transform: translateY(-200px);

}
#Rolemanage{
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 200px;
    background:rgba(246, 250, 253, 1);
    display: flex;
    flex-direction: row;
    .RoleLeft{
        width: 50%;
        box-shadow: 0 0 5px 5px rgba(200, 200, 200, 0.5);
        margin:20px 20px 10px 0px;
        background: white;
        .RoleMangeTop{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-items: center;
            padding-left: 10px;
            padding-right: 20px;
            box-sizing: border-box;
            // padding: 10px;

        }
        table{
            width: 100%;   
            margin-top: 20px;     
            tr{
                width: 100%;
                height:40px;
                text-align: center;
                line-height: 40px;
                &:nth-child(2n-1){
                    background: rgba(195, 240, 240,0.4);
                }              
            }
        }

    }
    .RoleRight{
        width: 50%;
        margin: 20px;
        height: auto;
        .addNewRole{
            padding: 20px;
            width: 100%;
            box-shadow: 0 0 5px 5px rgba(200, 200, 200, 0.5);
            background: white;
            .addNewRoleTop{
                width:100%;
                height: 30px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 5px;
                box-sizing: border-box;
            }
            .addNewInput{
                width: 100%;
                display: flex;
                flex-direction: row;
                >div{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    height: 44px;
                    >span{
                        font-size: 14px;
                        width: 80px;
                        line-height: 44px;
                        .el-input{
                            width: 140px;
                            line-height: 44px;

                        }
                    }
                }
            }
            .addNewFooter{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                padding: 20px;
                box-sizing: border-box;
                margin-top: 20px;
            }
        }
    }
}
</style>
