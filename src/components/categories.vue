<template>
  <div class="outbox">
    <!-- 导航 -->
      <mybread twotitle='商品管理' threetitle='商品列表'></mybread>
    <!-- 输入框 -->
    <div class="inputbox">
      <el-col :span="6">
        <el-button type="success" plain>添加分类</el-button>
      </el-col>
    </div>
    <!-- 表格 -->
    <el-table :data="catelist" style="width: 100%" border>
      <el-table-column prop="username" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="email" label="级别" width="180"></el-table-column>
      <el-table-column prop="mobile" label="是否有效"></el-table-column>
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
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="0"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name:'goods',
 data(){
     return {
         catelist:[{},{}]
     }
 }
};
</script>

<style>
</style>
