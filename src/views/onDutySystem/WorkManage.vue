<template>
  <div class="workManage">
    <el-tabs @tab-click="tabChange" v-model="activeName">
      <el-tab-pane label="值班安排" name="first" class="workManage_first">
        <div class="workManage_first_icon"></div>
        <div class="workManage_first_cards">
          <el-card class="box-card">
            
          </el-card>
        </div>
        <div class="workManage_first_line"></div>
      </el-tab-pane>
      <el-tab-pane label="值班统计" name="second">
        <div class="workManage_filters">
          <el-form ref="form" :model="filterParams" label-width="80px">
            <el-form-item label="值班人员">
              <el-select
                v-model="filterParams.user"
                placeholder="请选择"
                size="mini"
              >
                <el-option label="全部" value="quanbu"></el-option>
                <el-option label="张三" value="shanghai"></el-option>
                <el-option label="李四" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="排序方式">
              <el-select
                v-model="filterParams.orderWay"
                placeholder="请选择"
                size="mini"
              >
                <el-option label="升序" value="shanghai"></el-option>
                <el-option label="降序" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="类别">
              <el-select
                v-model="filterParams.dayType"
                placeholder="请选择"
                size="mini"
              >
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="工作日" value="beijing"></el-option>
                <el-option label="节假日" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div id="myChart"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      filterParams: {
        user: "",
        orderWay: "",
        dayType: "",
      },
      myChart: null,
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        backgroundColor: "#f1f1f1",
        tooltip: {
          show: true,
          trigger: "axis",
        },
        legend: {
          left: "right",
          top: 4,
        },
        grid: {
          left: "5%",
          right: "5%",
        },
        xAxis: {
          type: "category",
          data: [
            "张三",
            "李四",
            "王二",
            "张三",
            "张三",
            "李四",
            "张三",
            "李四",
            "王二",
            "张三",
            "张三",
            "李四",
            "张三",
            "李四",
            "王二",
            "张三",
            "张三",
            "李四",
            "张三",
            "李四",
            "王二",
            "张三",
            "张三",
            "李四",
          ],
        },
        // 横向滚动条
        dataZoom: [
          { show: true, realtime: true, start: 0, end: 50 },
          { type: "inside", realtime: true, start: 0, end: 50 },
        ],
        yAxis: {
          type: "value",
          axisLine: {
            show: false, //y轴
          },
          axisTick: {
            show: false, //刻度线
          },
          splitLine: {
            show: true, //网格线
          },
        },
        series: [
          {
            name: "工作日",
            type: "bar",
            barWidth: "13",
            data: [
              5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10,
              20, 5, 20, 36, 10, 10, 20,
            ],
            itemStyle: {
              normal: {
                //设置柱状图颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#f75d5d" },
                  { offset: 1, color: "#f0caca" },
                ]),
                label: {
                  show: true, //是否显示
                  position: "top", //显示在顶部
                  textStyle: {
                    color: "black", //字体颜色
                    fontSize: 12, //字体大小
                  },
                },
              },
            },
          },
          {
            name: "节假日",
            type: "bar",
            barWidth: "13",
            data: [
              2, 6, 6, 2, 4, 7, 2, 6, 6, 2, 4, 7, 5, 20, 36, 10, 10, 20, 5, 20,
              36, 10, 10, 20,
            ],
            itemStyle: {
              normal: {
                //设置柱状图颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#5ad9e8" },
                  { offset: 1, color: "#caecf0" },
                ]),
                label: {
                  show: true, //是否显示
                  position: "top", //显示在顶部
                  textStyle: {
                    color: "black", //字体颜色
                    fontSize: 12, //字体大小
                  },
                },
              },
            },
          },
        ],
      });

      this.myChart = myChart;
    },
    tabChange(tab) {
      if (tab.paneName == "second" && this.myChart) {
        this.initEcharts();
        console.log("重绘制柱状图");
        setTimeout(() => {
          this.myChart.resize();
        }, 0);
      }
    },
  },
};
</script>

<style lang="scss">
.workManage {
  height: 100%;
  .el-form {
    display: flex;
    .el-form-item__content {
      width: 120px;
    }
  }

  &_filters {
    display: flex;

    .el-form-item {
      margin-right: 20px;
      margin-bottom: 16px;
    }
  }

  #myChart {
    width: 100%;
    height: 360px;
  }
}
</style>