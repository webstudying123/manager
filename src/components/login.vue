<template>
  <div class="login">
    <div class="box">
      <el-form  :model='loginform' :rules='rules' ref='loginform' label-position="top" label-width="80px">
          <h2>用户登录</h2>
        <el-form-item label="用户名" prop='username'>
          <el-input v-model='loginform.username'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model='loginform.password'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="mybtn" @click="submitform('loginform')" type="primary">登录</el-button>
        </el-form-item>
         <el-form-item>
          <el-button class="mybtn" @click='resetform("loginform")' type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return {
            loginform:{
                username:'',
                password:''
            },
            rules:{
                username:[
                     { required: true, message: '用户名不能为空', trigger: 'blur' },
                     { min: 4, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                password:[
                     { required: true, message: '密码不能为空', trigger: 'blur' },
                     { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ]

            }
        }
    },
    methods: {
        submitform(formname){
            this.$refs[formname].validate(async valid=>{
                if(valid){
                //    this.$message('提交成功')
                   let res= await this.$axios.post('login',this.loginform);
                   console.log(res);
                   if(res.data.meta.status==400){
                       this.$message(res.data.meta.msg);
                   }else if(res.data.meta.status==200){
                       this.$message(res.data.meta.msg);
                       //储存数据
                       window.sessionStorage.setItem('token',res.data.data.token);
                       //跳转
                       this.$router.push('/')
                   }
                }else {
                    this.$message('请按照规则填写')
                }
            })
        },
        resetform(formname) {
        this.$refs[formname].resetFields();
      }
    },
};
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
         height: 480px;
         border-radius: 10px;
         padding: 40px;
         box-sizing: border-box;
         .mybtn {
             width: 100%;
         }
     }
 }
</style>
