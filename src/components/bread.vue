<template>
  <el-breadcrumb id="navbox" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{twotitle}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{threetitle}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
    props:['twotitle','threetitle']
};
</script>

<style lang='scss'>
 #navbox {
    height: 45px;
    background-color: #d3dce6;
    line-height: 45px;
    padding-left: 10px;
  }
</style>
