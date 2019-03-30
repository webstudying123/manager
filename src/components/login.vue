<template>
  <div class="login">
    <div class="box">
      <el-form label-position="top" label-width="80px">
          <h2>用户登录</h2>
        <el-form-item label="名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="mybtn" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
 .login {
     width: 100%;
     height: 100%;
     background-color: #324152;
     display: flex;
     justify-content: center;
     align-items: center;
     .box {
         background: white;
         width: 580px;
         height: 440px;
         border-radius: 10px;
         padding: 40px;
         box-sizing: border-box;
         .mybtn {
             width: 100%;
         }
     }
 }
</style>
