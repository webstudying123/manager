<template>
  <el-container class="bigcontainer">
    <!-- 头部 -->
    <el-header class="my-header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/logo.png" alt>
        </el-col>
        <el-col :span="18">
          <h2>后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <el-button type="success" @click="loginout" round>退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-body">
      <el-aside class="my-aside" width="200px">
        <el-menu
         router
          default-active="users"
          class="el-menu-vertical-demo"
        >
        <!--  default-active="users" 是默认展开的路径 -->
          <el-submenu :index="item.id+''" v-for="item in menuslist">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
             <el-menu-item :index="it.path" v-for="it in item.children">
                 <span class="el-icon-menu"></span>
                {{it.authName}}
                 </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main class="my-main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      menuslist:[]
    }
  },
  methods: {
    loginout(){
      window.sessionStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
  beforeCreate() {
    // if(window.sessionStorage.getItem('token')){

    // }else {
    //   this.$message('请先登录');
    //   this.$router.push('/login')
    // }
    
  },
  async created() {
    let res=await this.$axios.get('menus');
    console.log(res);
    this.menuslist=res.data.data;
  },
};
</script>

<style lang='scss'>
.bigcontainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .my-header {
    background-color: #b3c0d1;
    height: 60px;
    line-height: 60px;
    h2 {
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }
  .my-body {
    flex: 1;
    .my-aside {
      background-color: white;
    }
    .my-main {
      background-color: #e9eef3;
      padding-top: 0;
    }
  }
}
</style>
