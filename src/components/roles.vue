<template>
  <div class="outbox">
    <!-- 导航 -->
      <mybread twotitle='权限管理' threetitle='角色列表'></mybread>
    <!-- 输入框 -->
    <div class="inputbox">
      <el-col :span="6">
        <el-button type="success" @click="dialogFormVisible=true" plain>添加用户</el-button>
      </el-col>
    </div>
    <!-- 表格 -->
    <el-table :data="roleslist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column  label="角色名称" width="180"></el-table-column>
      <el-table-column  label="角色描述" width="180"></el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            plain
            type="danger"
            size="mini"
            @click="delet(scope.row)"
            icon="el-icon-delete"
          ></el-button>
          <el-button
            plain
            type="warning"
            @click="roleopen(scope.row)"
            size="mini"
            icon="el-icon-check"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name:'roles',
    data(){
        return {
             roleslist:[{},{}]
        }
    }
};
</script>

<style>
</style>
