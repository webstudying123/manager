<template>
  <div class="outbox">
    <!-- 导航 -->
    <mybread twotitle="订单管理" threetitle="订单列表"></mybread>
    <!-- 表格 -->
    <el-table :data="orderslist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款">
        <template slot-scope="scope">
          <el-button v-if="scope.row.pay_status==0" type="danger" size="mini" plain>未付款</el-button>
          <el-button v-else type="success" size="mini" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time | mytime('YYYY-MM-DD~HH:mm:ss')}}</template>
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
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5,10,15,20]"
      :current-page="senddata.pagenum"
      :page-size="senddata.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalnum"
    ></el-pagination>
    <!-- 编辑窗口 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >


      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="省市区县">
      <!-- 级联选择 -->
      <v-distpicker></v-distpicker>

      <el-cascader
    expand-trigger="hover"
    :options="options"
    v-model="selectedOptions2"
    @change="handleChange">
  </el-cascader>
      <!-- 插件 -->
  </el-form-item>
    <el-form-item label="详细地址">
    <el-input v-model="form.detailaddress"></el-input>
  </el-form-item>
 
</el-form>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import options from '../assets/city_data2017_element.js'
import VDistpicker from 'v-distpicker'
export default {
  name: "orders",
   components: { VDistpicker },
  data() {
    return {
      //是否显示
      dialogVisible:false,
      form:{
        address:'',
        detailaddress:''
      },
      selectedOptions2: [],
      options,
      senddata: {
        pagenum: 1,
        pagesize: 5
      },
      orderslist: [],
      totalnum: 0
    };
  },
  methods: {
    //级联选择改变
    handleChange(){

    },
    handleSizeChange(val) {
      this.senddata.pagesize = val;
      this.getfun();
    },
    handleCurrentChange(val) {
      this.senddata.pagenum = val;
      this.getfun();
    },
    async getfun() {
      let res = await this.$axios.get("orders", {
        params: this.senddata
      });
      console.log(res);
      this.orderslist = res.data.data.goods;
      this.totalnum = res.data.data.total;
    },
    //点击显示页面
    handleEdit(index, row) {
      // this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {})
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除"
      //     });
      //   });
      this.dialogVisible=true;
    }
  },
  created() {
    this.getfun();
  }
};
</script>

<style>
</style>
