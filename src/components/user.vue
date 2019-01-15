<template>
  <div class="user-conter">
    <el-row>
      <el-col :span="24">
        <myBreadcrumb :leve2="leve2" :leve3="leve3"></myBreadcrumb>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">
        <el-button plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="userList" border stripestyle="width: 100%">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="username" label="姓名" width="100"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
          <el-table-column prop="mobile" label="电话" width="250"></el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button plain size="mini" type="success" icon="el-icon-edit"></el-button>
              <el-button plain size="mini" type="warning" icon="el-icon-star-off"></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
              <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination
          :current-page="pageData.pagenum"
          :page-sizes="[5,10]"
          :page-size="pageData.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageData: {
        pagenum: 1,
        pagesize: 10,
      },
       total:0,
       userList:[],
       leve2:'用户管理',
       leve3:'用户列表'
    };
  },
  created() {
    this.$axios.get("users", { params: this.pageData }).then(res => {
      console.log(res);
      this.userList = res.data.data.users;
      this.total=res.data.data.total
    });
  },
};
</script>
<style lang="less">
</style>
