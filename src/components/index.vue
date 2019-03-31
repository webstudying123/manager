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
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
             <el-menu-item index="users">
                 <span class="el-icon-menu" index="users"></span>
                 选项1
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
  methods: {
    loginout(){
      window.sessionStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
  beforeCreate() {
    if(window.sessionStorage.getItem('token')){

    }else {
      this.$message('请先登录');
      this.$router.push('/login')
    }
    
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
