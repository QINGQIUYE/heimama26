<template>
  <div class="user-conter">
    <el-row>
      <el-col :span="24">
        <myBreadcrumb :leve2="leve2" :leve3="leve3"></myBreadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card shadow="always">
          <div class="echarts-container" ref="echarts"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      leve2: "数据统计",
      leve3: "数据报表",
      options: {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  async mounted() {
    let myChart = echarts.init(this.$refs.echarts);
    let res = await this.$axios.get("reports/type/1");
    console.log(res);
    for (const key in res.data.data) {
      this.options[key] = res.data.data[key];
    }
    this.options.xAxis[0].boundaryGap = false;
    myChart.setOption(this.options);
  }
};
</script>
<style >
.echarts-container {
  width: 800px;
  height: 500px;
}
</style>
