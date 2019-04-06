<template>
  <div class="outbox">
    <!-- 导航 -->
    <mybread twotitle="商品管理" threetitle="商品列表"></mybread>
    <!-- 输入框 -->
    <div class="inputbox">
      <el-col :span="6">
        <el-button type="success" plain>添加分类</el-button>
      </el-col>
    </div>
    <!-- 表格 -->
    <el-table :data="catelist" style="width: 100%" border row-key='cat_id'>
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="cat_level" label="级别" width="180">
        <template slot-scope="scope">
         <span v-if='scope.row.cat_level==0'>一级</span>
         <span v-else-if='scope.row.cat_level==1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column> -->

      <el-table-column prop="cat_deleted" label="是否有效">
        <template slot-scope="scope">
          <span v-if='scope.row.cat_deleted==false'>有效</span>
          <span v-else>无效</span>
        </template>
      </el-table-column>
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
  name: "categories",
  data() {
    return {
      catelist: [{}, {}]
     
    };
  },
  methods: {
    async getdata() {
      let res = await this.$axios.get("categories", {
        params: {
          type: 3
        }
      });
      console.log(res);
      this.catelist = res.data.data;
    }
  },
  created() {
    this.getdata();
  }
};
</script>

<style>
</style>
