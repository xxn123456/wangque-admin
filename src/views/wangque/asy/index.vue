<template>
  <div class="asy">
    <el-card class="box-card">
          <span>12</span>
          <h2>在线人数</h2>
    </el-card>
    <el-card class="box-card">
         <span>888</span>
          <h2>文章数</h2>
    </el-card>

     <el-card class="box-card">
         <span>128</span>
          <h2>弹幕</h2>
    </el-card>

     <el-card class="box-card">
         <span>38</span>
          <h2>留言</h2>
    </el-card>


  </div>

</template>
<script>
  export default {
    data() {
      return {

      }
    }
  }

</script>
<style lang="scss" scoped>
  .asy {
    width: 100%;
    height: 100%;
    padding: 10px;

    .box-card {
      width: 25%;
      height: 240px;
      float: left;
    }
  }

</style>
