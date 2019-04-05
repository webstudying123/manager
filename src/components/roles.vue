<template>
  <div class="outbox">
    <!-- 导航 -->
    <mybread twotitle="权限管理" threetitle="角色列表"></mybread>
    <!-- 输入框 -->
    <div class="inputbox">
      <el-col :span="6">
        <el-button type="success" @click="addVisible = true" plain>添加用户</el-button>
      </el-col>
    </div>
    <!-- 表格 -->
    <el-table :data="roleslist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            @click="editrole(scope.row)"
            size="mini"
            icon="el-icon-edit"
          ></el-button>
          <el-button plain type="danger" size="mini" @click="delefun(scope.row)" icon="el-icon-delete"></el-button>
          <el-button
            plain
            type="warning"
            @click="treeopen(scope.row)"
            size="mini"
            icon="el-icon-check"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加弹框 -->
    <el-dialog title="提示" :visible.sync="addVisible" width="30%">
      <el-form :model="addform" :rules="rules" ref="addform" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addform.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addform.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addfun('addform')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色 -->
    <el-dialog title="提示" :visible.sync="editVisible" width="30%">
      <el-form :model="editform" :rules="rules" ref="editform" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editform.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editform.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editfun('editform')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 树形弹框 -->
    <el-dialog title="提示" :visible.sync="treeVisible" width="30%">
      <el-tree
        :data="treelist"
        show-checkbox
        node-key="id"
        ref='tree'
        default-expand-all
        :default-checked-keys="defaultcheckedkey"
        :props="defaultProps"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="treeVisible = false">取 消</el-button>
        <el-button type="primary" @click="submittree">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    return {
      //编辑
      editVisible: false,
      editform: {
        roleName: "",
        roleDesc: ""
      },
      //默认展开的key
      defaultcheckedkey: [],
      treelist: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      //树形结构是否显示
      treeVisible: false,
      //展开时候的树形结构的相关信息
      treerole:{},
      roleslist: [],
      addVisible: false,
      addform: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "角色名称请正确输入", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async getfun() {
      let res = await this.$axios.get("roles");
      console.log(res);
      this.roleslist = res.data.data;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    addfun(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert("submit!");
          let res = await this.$axios.post(`roles`, this.addform);
          console.log(res);
          if (res.data.meta.status == 201) {
            this.$message("res.data.meta.msg");
            this.getfun();
            this.addVisible = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //编辑展示
    async editrole(row){
       this.editVisible=true
       let res=await this.$axios.get(`roles/${row.id}`)
       console.log(res);
       this.editform.id=res.data.data.roleId
       this.editform.roleName=res.data.data.roleName
       this.editform.roleDesc=res.data.data.roleDesc
    },
     //编辑保存
    editfun(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.put(`roles/${this.editform.id}`, this.editform);
          console.log(res);
          if (res.data.meta.status == 200) {
            this.$message("res.data.meta.msg");
            this.getfun();
            this.editVisible =false
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除
    delefun(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res =await this.$axios.delete(`roles/${row.id}`)
          console.log(res);
          if(res.data.meta.status==200){
            this.$message(res.data.meta.msg)
            this.getfun()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //打开权限管理窗口
    async treeopen(row) {
      this.treerole=row
      this.treeVisible = true;
      let res = await this.$axios.get("rights/tree");
      console.log(res);
      this.treelist = res.data.data;

      //设置展开的key
      let defaultcheckedkeys = [];
      function getcheckedkey(item) {
        if (item.children) {
          item.children.forEach(v => {
            defaultcheckedkeys.push(v.id);
            getcheckedkey(v);
          });
        }
      }
      getcheckedkey(row);
      console.log(defaultcheckedkeys);
      this.defaultcheckedkey = defaultcheckedkeys;
    },
    //操作权限管理
    async submittree(){
       console.log(this.$refs.tree.getCheckedKeys());
       let rids=this.$refs.tree.getCheckedKeys().join(',')
      //  console.log(rids);
       let res=await this.$axios.post(`roles/${this.treerole.id}/rights`,{
         rids
       })
       console.log(res);
       if(res.data.meta.status==200){
         this. getfun()
         this.treeVisible=false
         //c重新获取左侧的列表数据
          let newres=await this.$axios.get('menus');
          this.$store.commit('changes',newres.data.data)
       }
    }
  },
  created() {
    this.getfun();
  }
};
</script>

<style>
</style>
