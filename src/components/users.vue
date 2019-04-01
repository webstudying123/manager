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
        <el-input
          placeholder="请输入内容"
          v-model="params.query"
          @keyup.native.enter="search"
          class="input-with-select"
        >
          <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="success" @click="dialogFormVisible=true" plain>添加用户</el-button>
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
          <el-switch
            v-model="scope.row.mg_state"
            @change="changestatus(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
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
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
       @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="ruleform" :rules="rules" ref="ruleform">
        <el-form-item label="用户名" prop="username" label-width="200px">
          <el-input v-model="ruleform.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="200px">
          <el-input v-model="ruleform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="200px">
          <el-input v-model="ruleform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile" label-width="200px">
          <el-input v-model="ruleform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitform('ruleform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="添加用户" :visible.sync="editorFormVisible">
      <el-form :model="editorruleform" :rules="rules" ref="editorruleform">
        <el-form-item label="用户名" prop="username" label-width="200px">
          <el-input v-model="editorruleform.username" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="200px">
          <el-input v-model="editorruleform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile" label-width="200px">
          <el-input v-model="editorruleform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorform('editorruleform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户角色管理 -->
    <el-dialog title="添加用户" :visible.sync="roleVisible">
      <el-form ref="roleform">
        <el-form-item label="当前用户" label-width="200px">{{rolelist.username}}</el-form-item>
        <el-form-item label="请选择用户角色" label-width="200px">
          <el-select v-model="rolelist.role_name" placeholder="请选择">
            <el-option
              v-for="item in roleselectlist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取 消</el-button>
        <el-button type="primary" @click="finishrole('roleform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'user',
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
      total: 0,
      //弹框是否显示:
      dialogFormVisible: false,
      //角色弹框显示
      roleVisible: false,
      //用户角色列表
      rolelist: [],
      //角色的下拉列表
      roleselectlist:[],
      ruleform: {
        username: "abcdefgrh",
        password: "123",
        email: "123@123.com",
        mobile: 18787878787
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6到 10 个字符", trigger: "blur" }
        ]
      },
      //编辑相关数据
      editorFormVisible: false,
      editorruleform: {
        username: "abcdefgrh",
        email: "123@123.com",
        mobile: 18787878787
      }
    };
  },
  methods: {
    //编辑操作的相关处理
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
      console.log(row);
      this.editorFormVisible = true;
      this.editorruleform = row;
      this.search();
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
    },
    //用户状态的改变
    changestatus(row) {
      console.log(row);
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    //点击处理新增用户表单提交
    submitform(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert('submit!');
          let res = await this.$axios.post("users", this.ruleform);
          console.log(res);
          this.dialogFormVisible = false;
          this.search();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //编辑用户
    editorform(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert("submit!");

          let res = await this.$axios.put(`users/${this.editorruleform.id}`, {
            email: this.editorruleform.email,
            mobile: this.editorruleform.mobile
          });
          console.log(res);
          if (res.data.meta.status == 200) {
            this.$message(res.data.meta.msg);
            this.editorFormVisible = false;
          } else {
            this.$message("编辑失败");
          }
          this.search();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除按钮
    // async delet(row){
    //   let res=await this.$axios.delete(`users/${row.id}`)
    //   if(res.meta.status==200){
    //      this.$message('编辑成功');
    //   }else {
    //      this.$message('编辑失败');
    //   }
    //   this.search();
    // },
    //
    delet(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$axios.delete(`users/${row.id}`);
          if (res.data.meta.status == 200) {
            this.$message("删除成功");
          } else {
            this.$message("删除失败");
          }
          this.search();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //角色管理
    async roleopen(row) {
      this.roleVisible = true;
      this.rolelist = row;

      // console.log(row);
      let res=await this.$axios.get('roles')
      console.log(res);
      this.roleselectlist=res.data.data;
    },
    //点击确定,完成角色处理
    async finishrole(formName){
      let res=await this.$axios.put(`roles/${this.rolelist.id}`,{
        rid:this.rolelist.role_name
      })
      console.log(res);
      if(res.data.meta.status==200){
        this.roleVisible=false;
        this.search();
      }
    },
    //分页的处理
     handleSizeChange(size){
       this.params.pagesize=size;
       this.search();
     },
     handleCurrentChange(current){
      this.params.pagenum=current;
       this.search();
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
