import Vue from 'vue'
Vue.mixin({
    // created(){
    //     // window.onbeforeunload=function(e){
    //     //     var e=window.event||e;
    //     //     e.returnValue=("确定离开当前页面吗?");
    //     } 
    // }
    methods:{
        //所有的删除操作，希望二次确认，可以调用这个函数
        operatorConfirm(message,action){
              this.$confirm(`您确定要${message}吗?`,'提示',{
                  confirmButtonText:'确定',
                  cancelButtonText:'取消',
                  type:'warning'
              }
              ).then(()=>{
                  action();
              }).catch(()=>{
                  this.$message({
                      type:'info',
                      message:'已取消删除'
                  })
              }); 
        },
        post(api,params){
        return   this.$http.post(api,params).then((resp)=>{
                this.$message({
                    message:resp.data.message,
                    type:resp.data.success?'success':'danger'
                })
            })
        }
    }
})