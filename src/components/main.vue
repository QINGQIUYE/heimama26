<template>
  <div class="main-container">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <div class="grid-content ">
              <img src="../assets/logo.png" alt>
            </div>
          </el-col>
          <el-col :span="18">电商后台管理系统
            <div class="grid-content bg-purple-light"></div>
          </el-col>
          <el-col :span="2">
            <el-button @click="open2" type="danger">退出</el-button>

          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="201px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu v-for="(item, index) in  menuList" :key="index.id" :index="item.order+''">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item v-for="(it) in  item.children" :key="it.id"   :index="'/'+it.path">
                <i class="el-icon-menu"></i>{{it.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
    data() {
        return {
          menuList:[]  
        }
    },
  created() {
    this.$axios
      .get("menus", {
        headers: { Authorization: window.sessionStorage.getItem("token") }
      })
      .then(res => {
        // console.log(res);
        this.menuList=res.data.data
      });
  },
  beforeCreate() {
    let token = window.sessionStorage.getItem("token");
    if (token) {
    } else {
      this.$message.error("兄弟你还没有登录");
      this.$router.push("login");
    }
  },
  methods: {
    open2() {
      this.$confirm("亲,确定要退出嘛?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.removeItem("token");
          this.$router.push("login");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "再看看吧"
          });
        });
    }
    // logoinOut() {
    //   window.sessionStorage.removeItem("token");
    //   this.$router.push("login");
    // }
  }
};
</script>
<style lang="scss" scoped >
.main-container {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    .el-col-18 {
      font-size: 30px;
      font-weight: 900;
      color: white;
    }
    .el-col-4 {
      text-align: left;
    }
    .el-col-2 {
      text-align: right;
    }
      .el-col-24{
        
      } 
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
    
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    // text-align: center;
  }
  
 
}
 
</style>
