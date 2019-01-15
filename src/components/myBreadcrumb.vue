<template>
    <el-breadcrumb class="my-el-breadcrumb"  separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{leve2}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{leve3}}</el-breadcrumb-item>
</el-breadcrumb>
</template>
<script>
export default {
    props:['leve2','leve3']
};
</script>
<style >
   
</style>
