<template>
  <div id="app">
    <router-view/>

  </div>
</template>
<script>
export default {
  mounted(){
    console.log(this.$apis);
  }
}
</script>

<style lang="scss">
#app{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
