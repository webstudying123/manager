<template>
  <div class="outbox">
    <!-- 导航 -->
      <mybread twotitle='权限管理' threetitle='权限列表'></mybread>
    <!-- 输入框 -->
    <div class="inputbox">
      <el-col :span="6">
        <el-button type="success" @click="dialogFormVisible=true" plain>添加用户</el-button>
      </el-col>
    </div>
    <!-- 表格 -->
    <el-table :data="rightslist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column  label="权限名称" width="180"></el-table-column>
      <el-table-column  label="路径" width="180"></el-table-column>
      <el-table-column  label="层级" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:'rights',
  data(){
        return {
             rightslist:[{},{}]
        }
}
}
</script>

<style>
</style>
