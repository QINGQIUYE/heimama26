<template>
    <div class="user-conter">
    <el-row>
      <el-col :span="24">
        <myBreadcrumb :leve2="leve2" :leve3="leve3"></myBreadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="rightsList" border stripestyle="width: 100%">
          <el-table-column label="#" type="index" width="60"></el-table-column>
          <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
          <el-table-column prop="path" label="路径" width="300"></el-table-column>
          <el-table-column prop="level" label="层级"  width="300">
            <template slot-scope="scope">
              <span v-if="scope.row.level==0">一级</span>
              <span v-if="scope.row.level==1">二级</span>
              <span v-if="scope.row.level==2">三级</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    data() {
        return {
            leve2:'用户管理',
            leve3:'用户列表',
            rightsList:[]
        }
    },
    async created() {
        let res=await this.$axios.get("rights/list");
        this.rightsList=res.data.data
    }
}
</script>
<style>

</style>

