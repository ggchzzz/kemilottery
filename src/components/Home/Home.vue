<template>
    <div id="home">
    <TopBar/>
    <div id="main">
        <Sider-bar/>  
        <router-view/>  
    </div>
    </div>
</template>
<script>
import TopBar from './TopBar'
import SiderBar from  './SiderBar/SiderBar'
export default {
    components:{TopBar,SiderBar}
}
</script>
<style lang="scss" scoped>
#home{
    width: 100%;
    height: 100%;
    #main{
        position: absolute;
        top: 64px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        display: flex;
        flex-direction: row;
    }
}
</style>
