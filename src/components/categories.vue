<template>
  <div class="user-conter">
    <el-row>
      <el-col :span="24">
        <myBreadcrumb :leve2="leve2" :leve3="leve3"></myBreadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <template>
          <el-table :data="categoriesList" border style="width: 100%">
            <el-tree-grid
              prop="cat_name"
              label="分类名称"
              treeKey="cat_id"
              parentKey="cat_pid"
              levelKey="cat_level"
              childKey="children"
              :indentSize="30"
            ></el-tree-grid>
            <el-table-column label="分类名称" prop="cat_name" width="100"></el-table-column>
            <el-table-column label="级别" prop="cat_level">
              <template slot-scope="prop">
                <span v-if="prop.row.cat_level==0">一级</span>
                <span v-if="prop.row.cat_level==1">二级</span>
                <span v-if="prop.row.cat_level==2">三级</span>
              </template>
            </el-table-column>
            <el-table-column label="是否有效" prop>
              <template slot-scope="prop">{{prop.row.cat_deleted? "有效":"无效"}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="24">
        <el-pagination
          :current-page="pageData.pagenum"
          :page-sizes="[2, 4, 6, 8,10]"
          :page-size="pageData.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ElTreeGrid from "element-tree-grid";
export default {
  components: {
    ElTreeGrid
  },
  data() {
    return {
      leve2: "商品管理",
      leve3: "商品分类",
      categoriesList: [],
      // 总页数
        pageData: {
        type: 3,
        // 页码
        pagenum: 1,
        // 页容量
        pagesize: 6
      },
      // 总页数
      total: 0,
    };
  },
  methods: {
    async getCategories() {
      let res = await this.$axios.get("categories",{
  params: this.pageData
      });
        this.total = res.data.data.total;
      this.categoriesList = res.data.data.result
      
    },
      currentChange(pagenum) {
      // console.log(pagenum);
      // 修改页码
      this.pageData.pagenum = pagenum;
      // 重新获取数据即可
      this.getCategories();
    },
    // 页容量改变
    sizeChange(pagesize) {
      // console.log(pagesize);
      // 修改页容量
      this.pageData.pagesize = pagesize;
      // 重置页码
      this.pageData.pagenum = 1;
      // 获取数据
      this.getCategories();
    }
  },
  async created() {
    this.getCategories();
  }
};
</script>
<style lang="sass">

</style>
