<template>
 <div id="system">
     <ul>
         <li v-for="(item,key) in accountPermission.children" :key="item._id">
             <i :class='["fa",fontIcon[key]]' style="font-size:130px" @click="$router.push({name:item.permissionDesc})"></i>
             <span>{{item.permissionDesc}}</span>
         </li>
     </ul>
     <transition id="routerView">
        <router-view/> 
     </transition>
  </div>   
</template>
<script>
export default {
    data(){
        return {
            fontIcon:['fa-lock','fa-users','fa-address-card-o']
        }
    },
    computed:{
        accountPermission(){

            var  accountPermission=this.$store.getters['accountPermission'];
            var obj={}
            accountPermission.forEach(item => {
                if(item.permissionDesc=="系统管理"){
                    obj=item;
                    return;
                }
                
            });
            return obj;
        }
    }
}
</script>
<style lang="scss" scoped>
#system{

    width: 200px;
    height: 100%;
    ul{
        position: absolute;
        left: 200px;
        right: 0px;
        display: flex;
        flex-direction: row;
            li{
                flex:1;
                height: 200px;
                background: red;
                margin: 20px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                color: white;
                font-size: 30px;
                i{

                color:rgba(255,255,255,0.5);
                }
                &:nth-child(1){
                    background: linear-gradient(to right,lightblue,blue 99%);
                }
                &:nth-child(2){
                    background:linear-gradient(to right,lightcyan,cyan)
                }
                &:nth-child(3){
                    background:linear-gradient(to right,rgb(186, 236, 6))
                }
            }
        
    }
    #routerView{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 200px;
        right: 0px;
        padding: 5px;
        background: cyan;
    }
}
</style>
