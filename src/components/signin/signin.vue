<template>
    <div id="signin">
        <div class="cover">
            <div class="signPanel">
                <div id="signtitle">
                    <span>可米彩票</span>
                </div>
                <el-form id="signInput" :model="userInfo" :rules="rules" ref="userInfo">
                        <el-form-item prop="accountName">
                        <el-input v-model="userInfo.accountName" aria-placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                        <el-input v-model="userInfo.password" type="password" aria-placeholder="密码"></el-input>
                        </el-form-item>
                        <div>
                            <el-switch
                            v-model="remeberMe"
                            active-color="#13ce66"
                            inactive-color="lightgrey"
                            active-text="记住我"
                            >
                            </el-switch>
                        </div>
                        <div>
                            <el-button style="width:80%" type="success" @click="signin">登录</el-button>
                        </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data()
    {
        return {
            userInfo:{
                accountName:'',
                password:''
            },
            remeberMe:true,
            rules:{
                accountName:[
                    {required:true,message:"请输入用户名",trigger:'blur'}
                ],
                 password:[
                    {required:true,message:"请输入密码",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        signin(){
            this.$refs['userInfo'].validate((valid)=>{
                if(valid){
                     console.log(this.userInfo);
                     this.$http.post('/signin',this.userInfo).then(resp=>{
                     console.log(resp.data.success);
                    if(resp.data.success){
                        localStorage.setItem('token',resp.data.token)
                        localStorage.setItem('isremeber',this.remeberMe);
                        localStorage.setItem("accountInfo", JSON.stringify(resp.data.response)),
                        console.log(this.$route.query.redirect)
                        if(this.$route.query.redirect)
                        this.$router.push(this.$route.query.redirect)
                        else{
                            this.$router.push({path:'/home'})
                        }
                    }
            })
                }
                else{
                    return false;
                }
            })
           
        }
    },
    created(){
        this.rememberMe=localStorage.getItem('isremeber')==='true'?true:false;
    }
}

</script>
<style lang="scss">
#signin{
    width: 100%;
    height: 100%;
    background-color:rebeccapurple;
    background: url(../../assets/loginBG.jpg);
    background-repeat:no-repeat;
    background-size: 100%;
.cover{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    .signPanel{
        width: 30%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        float:right;
        #signtitle{
            height: 30%;
            width: 100%;
            color: white;
            font-size: 40px;
            display: flex;
            justify-content:center;
            align-items:center;
        }
        #signInput{
            width: 100%;
           display: flex;
           justify-content: center;
           flex-direction: column;
           align-items: center;       
             div {
                    width: 80%;
                    height: 44px;
                    background: none;
                    border: none;
                    outline: none;
                    text-align: center;
                    .el-input {
                        // 穿透
                        /deep/ input {
                            background:none;
                            border: none;
                            border-bottom: 1px solid white;
                            border-radius: 0;
                        }
                    }
                }
        }
    }
}
}
</style>
