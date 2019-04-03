<template>
  <div class="outbox">
    <!-- 导航 -->
    <mybread twotitle="权限管理" threetitle="权限列表"></mybread>
    <!-- 输入框 -->
    <div class="inputbox">
      <el-col :span="6">
        <el-button type="success" @click="dialogFormVisible=true" plain>添加用户</el-button>
      </el-col>
    </div>
    <!-- 表格 -->
    <el-table :data="rightslist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.level=='0'">一级</span>
          <span v-else-if="scope.row.level=='1'">二级</span>
          <span v-else-if="scope.row.level=='2'">三级</span>
          <span v-else>四级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rights",
  data() {
    return {
      rightslist: []
    };
  },
  async created() {
    let res = await this.$axios.get("rights/list");
    console.log(res);
    this.rightslist = res.data.data;
  }
};
</script>

<style>
</style>
