<template>
  <div class="login-container">
    <div class="from-container">
      <h2>登录页面</h2>
      <el-form
        label-position="top"
        :rules="rules"
        ref="formData"
        label-width="80px"
        :model="formData"
      >
        <el-form-item label="账号" prop="username">
          <el-input  v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input  type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-button class="btn-login" @click="submitForm('formData')" type="warning">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "change" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 5, message: "长度在 5个字符以上", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         this.$axios.post("login",this.formData).then(res=>{
           console.log(res);
           if (res.data.meta.status===400) {
             this.$message.error(res.data.meta.msg)
           }else if (res.data.meta.status==200) {
             this.$message.success(res.data.meta.msg);
             window.sessionStorage.setItem("token",res.data.data.token);
             this.$router.push('/')
           }
         })
        } else {
          this.$message.error("请输入正确的账号和密码")
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login-container {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .from-container {
    width: 580px;
    box-sizing: border-box;
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
    .btn-login {
      width: 100%;
    }
  }
}
</style>
