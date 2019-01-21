<template>
    <div id="TopBar">
    <span>可米彩票</span>
    <el-button type="danger" style="float:right"  @click="logout" size="mini">退出</el-button>
    </div>   
</template>
<script>
export default {
    methods:{
        logout(){
            // this.$router.push("/signIn")
            // this.$router.push('/signIn');
            this.$confirm('您确定要退出么?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            this.$router.push('/signIn');
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '取消退出'
                // });          
            });
        }
    }
}
</script>
<style lang="scss" scoped>
#TopBar{
    width: 100%;
    height: 64px;
    background: lightblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:  0 15px;
    box-sizing: border-box;
}
</style>
