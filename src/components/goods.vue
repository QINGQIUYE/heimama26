<template>
  <div class="user-conter">
    <el-row>
      <el-col :span="24">
        <myBreadcrumb :leve2="leve2" :leve3="leve3"></myBreadcrumb>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="pageData.query">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">
        <el-button plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="goodList" border stripestyle="width: 100%">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="300"></el-table-column>
          <el-table-column prop="goods_price" label="价格" width="100"></el-table-column>
          <el-table-column prop="goods_number" label="数量" width="100"></el-table-column>
          <el-table-column prop="goods_weight" label="重量" width="100"></el-table-column>
          <el-table-column prop="upd_time" label="创建时间" width="200">
              <template slot-scope="prop">
              {{prop.row.upd_time | beautifyTime}}
            </template>
          </el-table-column>
          <el-table-column prop="goods_state" label="操作">
            <template slot-scope="scope">
              <el-button plain size="mini" type="success" icon="el-icon-edit"></el-button>
              <el-button plain size="mini" type="warning" icon="el-icon-star-off"></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
            <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pageData.pagenum"
      :page-sizes="[2, 4, 6, 8,10]"
      :page-size="pageData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
     </el-col>
     </el-row>
     
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      leve2: "商品管理",
      leve3: "商品列表",
      pageData: {
         query: "",
        pagenum: 1,
        pagesize: 6,
      },
       total:0,
        goodList: [],
    };
  },
  methods: {
    async getGoods() {
      let res = await this.$axios.get("goods", {
        params: this.pageData
      });
      this.goodList = res.data.data.goods;
      this.total=res.data.data.total;
      // console.log(res);
      
    },
     sizeChange(pagesize) {
       this.pageData.pagesize=pagesize;
        this.pageData.pagenum = 1;
         this.getGoods();
      },
     currentChange(pagenum) {
       this.pageData.pagenum=pagenum
        
         this.getGoods();
      }
  },
 async created() {
    this.getGoods();
  }
};
</script>
<style>
</style>

