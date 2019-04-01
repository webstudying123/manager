<template>
  <div class="outbox">
    <!-- 导航 -->
      <mybread twotitle='商品管理' threetitle='商品列表'></mybread>
    <!-- 输入框 -->
    <div class="inputbox">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
        >
          <el-button slot="append"  icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="success" plain>添加商品</el-button>
      </el-col>
    </div>
    <!-- 表格 -->
    <el-table :data="goodslist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="email" label="商品价格(元)" width="180"></el-table-column>
      <el-table-column prop="mobile" label="商品重量"></el-table-column>
      <el-table-column prop="mobile" label="创建时间"></el-table-column>
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
         goodslist:[{},{}]
     }
 }
};
</script>

<style>
</style>
