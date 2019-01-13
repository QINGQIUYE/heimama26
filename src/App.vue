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
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password"></el-input>
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
          { min: 6, message: "长度在 6 个字符以上", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
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
