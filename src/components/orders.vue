<template>
  <div class="user-conter">
    <el-row>
      <el-col :span="24">
        <myBreadcrumb :leve2="leve2" :leve3="leve3"></myBreadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table ref="singleTable" :data="ordersList" highlight-current-row border style="width: 100%" >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="order_number" label="订单编号" width="300"></el-table-column>
          <el-table-column property="order_price" label="订单价格" width="120"></el-table-column>
          <el-table-column property="goods_weight" label="是否付款">
            <template slot-scope="prop">
              <el-button type="danger" plain size="mini" v-if="prop.row.pay_status==='0'">未付款</el-button>
              <el-button type="success" plain size="mini" v-else>已付款</el-button>
            </template>
          </el-table-column>
          <el-table-column property="is_send" label="是否发货"></el-table-column>
          <el-table-column property="create_time" label="下单时间">
            <template slot-scope="prop">{{prop.row.create_time | beautifyTime}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
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
      leve2: "订单管理",
      leve3: "订单列表",
      pageData: {
        query: "",
        pagenum: 1,
        pagesize: 6
      },
      total: 0,
      ordersList: []
    };
  },
  methods: {
    async getOrders() {
      let res = await this.$axios.get("orders", {
        params: this.pageData
      });
      this.ordersList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    sizeChange(pagesize) {
      this.pageData.pagesize = pagesize;
      this.pageData.pagenum = 1;
      this.getOrders();
    },
    currentChange(pagenum) {
      this.pageData.pagenum = pagenum;
      this.getOrders();
    }
  },
  async created() {
    this.getOrders();
  }
};
</script>
<style lang="less">
</style>
