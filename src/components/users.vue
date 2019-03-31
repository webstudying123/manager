<template>
  <div class="outbox">
    <!-- 导航 -->
    <el-breadcrumb class="navbox" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <div class="inputbox">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="params.query" @keyup.native.enter='search' class="input-with-select">
          <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </div>
    <!-- 表格 -->
    <el-table :data="tablelist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-delete"
          ></el-button>
          <el-button plain type="warning" size="mini" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //参数
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      //表格数据
      tablelist: [],
      //总的数据条数
      total: 0
    };
  },
  methods: {
    //操作的相关处理
    handleEdit(index, row){
      console.log(index);
      console.log(row);
    },
    async search() {
      let res = await this.$axios.get("users", {
        params: this.params
        // headers: {
        //   Authorization: window.sessionStorage.getItem("token")
        // }
      });
      console.log(res);
      this.total = res.data.data.total;
      this.tablelist = res.data.data.users;
    }
  },
   created() {
     this.search();
   }
};
</script>

<style lang='scss'>
.outbox {
  .navbox {
    height: 45px;
    background-color: #d3dce6;
    line-height: 45px;
    padding-left: 10px;
  }
}
</style>
