<template>
  <div class="workCondition">
    <el-tabs>
      <el-tab-pane label="在位变动统计">
        <div class="workCondition_btns">
          <el-button plain size="mini">今日(3条记录)</el-button>
          <el-button plain size="mini">本周(10条记录)</el-button>
        </div>
        <el-table :data="tableData1" border style="width: 100%">
          <el-table-column prop="index" label="序号" width="80" align="center"/>
          <el-table-column prop="changeTime" label="变更时间" width="160" />
          <el-table-column prop="content" label="内容" />
          <el-table-column prop="changeObj" label="变更对象" width="80" />
          <el-table-column prop="originStatus" label="原状态" width="80" />
          <el-table-column prop="changeStatus" label="变更状态" width="80" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="人员提交统计">
        <div  class="workCondition_btns">
          <el-button plain size="mini">今日(3条记录)</el-button>
          <el-button plain size="mini">本周(10条记录)</el-button>
        </div>
        <el-table :data="tableData2" border style="width: 100%">
          <el-table-column prop="index" label="序号" width="80" align="center" />
          <el-table-column prop="publishTime" label="提交时间" width="160" />
          <el-table-column prop="content" label="内容" />
          <el-table-column prop="changeObj" label="变更对象" width="80" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData1: [
        {
          index: 1,
          changeTime: "2016-05-03  11:09:41",
          changeObj: "王小虎",
          content:
            "xxx变更王小虎在位状态为'请假'，时间2021.10.22-2021.10.25，共四天",
          originStatus: "在位",
          changeStatus: "请假",
        },
        {
          index: 2,
          changeTime: "2016-05-03  11:09:41",
          changeObj: "王小虎",
          content:
            "xxx变更王小虎在位状态为'请假'，时间2021.10.22-2021.10.25，共四天",
          originStatus: "在位",
          changeStatus: "出差",
        },
        {
          index: 3,
          changeTime: "2016-05-03  11:09:41",
          changeObj: "王小虎",
          content:
            "xxx变更王小虎在位状态为'请假'，时间2021.10.22-2021.10.25，共四天",
          originStatus: "在位",
          changeStatus: "休假",
        },
        {
          index: 4,
          changeTime: "2016-05-03  11:09:41",
          changeObj: "王小虎",
          content:
            "xxx变更王小虎在位状态为'请假'，时间2021.10.22-2021.10.25，共四天",
          originStatus: "请假",
          changeStatus: "在位",
        },
      ],
      tableData2: [
        {
          index: 1,
          publishTime: "2016-05-03  11:09:41",
          changeObj: "王小虎",
          content:
            "xxx变更王小虎在位状态为'请假'，时间2021.10.22-2021.10.25，共四天",
          originStatus: "在位",
          changeStatus: "请假",
        },
        {
          index: 2,
          publishTime: "2016-05-03  11:09:41",
          changeObj: "王小虎",
          content:
            "xxx变更王小虎在位状态为'请假'，时间2021.10.22-2021.10.25，共四天",
          originStatus: "在位",
          changeStatus: "出差",
        },
        {
          index: 3,
          publishTime: "2016-05-03  11:09:41",
          changeObj: "王小虎",
          content:
            "xxx变更王小虎在位状态为'请假'，时间2021.10.22-2021.10.25，共四天",
          originStatus: "在位",
          changeStatus: "休假",
        },
        {
          index: 4,
          publishTime: "2016-05-03  11:09:41",
          changeObj: "王小虎",
          content:
            "xxx变更王小虎在位状态为'请假'，时间2021.10.22-2021.10.25，共四天",
          originStatus: "请假",
          changeStatus: "在位",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.workCondition {
  height: 100%;

  &_btns{
      display: flex;
      justify-content: end;
      margin-bottom: 20px;
  }
}
</style>