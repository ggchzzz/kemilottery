<template>
    <div id="SiderBar">
    <el-menu
      default-active="2"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="lightgreen">
      <el-submenu v-for="(item,key) in accountPermission" index="key" :key="item._id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span @click="$router.push({name:item.permissionDesc})">{{item.permissionDesc}}</span>
        </template>
        <el-menu-item :index="key+'-'+index"
         v-for="(child,index) in item.children"
          :key="child._id"
          @click="$router.push({name:child.permissionDesc})"
          >{{child.permissionDesc
          
          }}</el-menu-item>
      </el-submenu>
    </el-menu>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['accountPermission'])
    }
}
</script>
<style lang="scss">
#SiderBar{
width: 200px;
height: 100%;
    .el-menu{
    width: 100%;
    border: none;
}
}
</style>
