<template>
  <div class="user-conter">
    <el-row>
      <el-col :span="24">
        <myBreadcrumb :leve2="leve2" :leve3="leve3"></myBreadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-alert title="注意:只允许为第三级分类设置相关参数" type="warning" show-icon></el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="demonstration">请选择商品分类:</span>
        <el-cascader
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions2"
          :props="props"
          @change="getDetailInfo"
        ></el-cascader>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="many">
              <el-button type="primary">添加动态参数</el-button>
              <el-table :data="manyRows" style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-tag class="mr" v-for="item in props.row.items" closable>{{item}}</el-tag>
                  <!-- 新增的文本框 -->
                  <el-input
                    @blur="saveItem(props.row)"
                    @keyup.enter="saveItem(props.row)"
                    v-model="newItem"
                    size="mini"
                    class="my-el-input"
                    v-show="showAdd==false"
                  ></el-input>
                  <!-- 新增的按钮 -->
                  <el-button @click="showAdd=false" size="mini" v-show="showAdd==true">
                    <i class="el-icon-plus"></i> New Tag
                  </el-button>

                  <!-- 要么没有参数 -->
                  <el-row v-if="props.row.items.length==0">
                    <el-col :span="24">没有设置参数</el-col>
                  </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="#" type="index" width="50"></el-table-column>
                <el-table-column label="商品参数" prop="attr_name"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                    <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态参数" name="only">
              <el-button type="primary">添加静态参数</el-button>
              <el-table :data="onlyRows" style="width: 100%">
                <el-table-column type="index" width="30" label="#"></el-table-column>
                <el-table-column prop="attr_name" label="属性名称" width="120"></el-table-column>
                <el-table-column prop="attr_vals" label="属性值" width="120"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                    <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leve2: "商品管理",
      leve3: "分类参数",
      options: [],
      props: {
        label: "cat_name",
        value: "cat_id"
      },
      selectedOptions2: [],
      //   tab栏
      activeName: "many",
      manyRows: [],
      onlyRows: [],
        showAdd: true,
      // 双向数据绑定
      newItem: ""
    };
  },
  methods: {
    async  getDetailInfo() {
      if (this.selectedOptions2.length ===3) {
        let res = await this.$axios.get(
          `categories/${this.selectedOptions2[2]}/attributes?sel=${
            this.activeName
          }`
        );
        if (this.activeName === "many") {
          res.data.data.forEach(v => {
            v.items = v.attr_vals.split(",");
          });
        }
        console.log(res);
        this[this.activeName + "Rows"] = res.data.data;
      } else {
        //   
      }
    },
    handleClick() {
      this. getDetailInfo();
    },
  },
    async created() {
    let res = await this.$axios.get('categories?type:"3"');
    this.options = res.data.data;
    console.log(res);
  },
};
</script>
<style lang="">
</style>