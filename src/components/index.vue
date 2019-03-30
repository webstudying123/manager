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
          <el-button type="success" round>退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-body">
      <el-aside class="my-aside" width="200px">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.bigcontainer {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    .my-header{
        background-color: #b3c0d1;
        height: 60px;
        line-height: 60px;
        h2 {
            margin: 0;
            padding: 0;
            text-align: center;
        }

    }
    .my-body{
        flex: 1;
        .my-aside{
            background-color: white;
        }
        .my-main {
            background-color: #e9eef3;
        }
    }
}
</style>
