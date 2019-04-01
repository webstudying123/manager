<template>
  <div class="outbox">
    <!-- 导航 -->
      <mybread twotitle='订单管理' threetitle='订单列表'></mybread>
    <!-- 表格 -->
    <el-table :data="orderslist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="email" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="mobile" label="是否付款">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" plain>危险按钮</el-button>
                  </template>
      </el-table-column>
      <el-table-column prop="mobile" label="是否发货"></el-table-column>
      <el-table-column prop="mobile" label="下单时间"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
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
         orderslist:[{},{}]
     }
 }
};
</script>

<style>
</style>
