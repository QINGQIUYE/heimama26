<template>
    <div class="user-conter">
    <el-row>
      <el-col :span="24">
        <myBreadcrumb :leve2="leve2" :leve3="leve3"></myBreadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
       <div class="grid-content bg-purple" >
          <el-button type="primary" plain>添加角色</el-button>
       </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="roleList" border stripestyle="width: 100%">
          <el-table-column type="expand">
              <template slot-scope="props">
                <el-row v-for="item in props.row.children" :key="item.id">
                 <el-col :span="4">
                     <el-tag closable >{{item.authName}}</el-tag>
                     </el-col>
                 <el-col :span="20">
                     <el-row v-for="leve2 in item.children" :key="leve2.id">
                    <el-col :span="4">
                           <el-tag closable type="success" >{{leve2.authName}}</el-tag>
                           <i class="el-icon-arrow-right"></i>
                        </el-col>
                    <el-col :span="20">
                         <el-tag v-for="leve3 in leve2.children"  :key="leve3.id" closable type="warning" >{{leve3.authName}}</el-tag>
                        </el-col>
                    </el-row>
                     </el-col>
                </el-row>
                <el-row >
                    <el-col v-if="props.row.children.length==0" :span="24">
                   <el-col :span="24">没有分配权限</el-col>
                        </el-col>
                </el-row>
              </template>
            </el-table-column> 
          <el-table-column label="#" type="index" width="30"></el-table-column>
          <el-table-column prop="rlosName" label="角色名称" width="180"></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button plain size="mini" type="primary" icon="el-icon-edit"></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-star-off"></el-button>
              <el-button plain size="mini" type="warning" icon="el-icon-delete"></el-button>
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
            roleList:[]
        }
    },
    async created() {
        let res=await this.$axios.get("roles");
        this.roleList=res.data.data
    }
}
</script>
<style>
.el-tag{
    margin: 10px;
}
</style>

