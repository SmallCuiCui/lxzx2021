<template>
  <div class="workCondition">
    <el-tabs @tab-click="tabChange" v-model="currentTab">
      <el-tab-pane label="在位变动统计" name="tabOne">
        <div class="workCondition_btns">
          <el-button plain size="mini">今日( <span style="color: red; font-size: 16px;">{{dayNum}}</span> 条记录)</el-button>
          <el-button plain size="mini">本周( <span style="color: red; font-size: 16px;">{{weekNum}}</span> 条记录)</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="index" label="序号" width="80" align="center">
            <template #default="scope">
              <span>{{(pageInfo.currentPage - 1) * pageInfo.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="变更时间" width="160" align="center"/>
          <el-table-column prop="discription" label="内容" />
          <el-table-column prop="targetUser" label="变更对象" width="120" align="center"/>
          <el-table-column prop="originStatus" label="原状态" width="120" align="center">
            <template #default="scope">
            <span>{{ statusMap(scope.row.originStatus) }}</span>
          </template>
          </el-table-column>
          <el-table-column prop="newStatus" label="变更状态" width="120">
            <template #default="scope">
            <span>{{ statusMap(scope.row.newStatus) }}</span>
          </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="pageInfo.total"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          @current-change="(val)=>handleCurrentChange(val, 1)"
          style="margin-top: 15px"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="人员提交统计" name="tabTwo">
        <div class="workCondition_btns">
          <el-button plain size="mini">今日( <span style="color: red; font-size: 16px;">{{dayNum}}</span> 条记录)</el-button>
          <el-button plain size="mini">本周( <span style="color: red; font-size: 16px;">{{weekNum}}</span> 条记录)</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="index" label="序号" width="80" align="center" >
            <template #default="scope">
              <span>{{(pageInfo.currentPage - 1) * pageInfo.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="提交时间" width="180" align="center" />
          <el-table-column prop="discription" label="内容" width="900" />
          <el-table-column prop="targetUser" label="变更对象" width="120" align="center" />
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="pageInfo.total"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          @current-change="(val)=>handleCurrentChange(val, 2)"
          style="margin-top: 15px"
        >
      </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { statusMixin } from "@/assets/js/mixins.js";

export default {
  created() {
    this.getTableData(this.pageInfo.currentPage, 1)
  },
  mixins: [statusMixin],
  data() {
    return {
      loading: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 15,
        total: 0,
      },
      currentTab: "tabOne",
      tableData: [],
      dayNum: 0,
      weekNum: 0
    };
  },
  methods: {
    getTableData(currentPage, recordType) {
      this.loading = true;
      this.$http.findAllDynamicByPage({
        pageNum: currentPage,
        pageSize: 10,
        recordType: recordType
      }).then(res => {
        this.loading = false;
        if(res.code == 200) {
          this.tableData = res.data.datalist ? res.data.datalist.result : [];
          this.pageInfo.total = res.data.datalist ? res.data.datalist.total : 0;
          this.dayNum = res.data.dayNum;
          this.weekNum = res.data.weekNum;
        }
      })
    },
    handleCurrentChange(val, recordType) {
      this.pageInfo.currentPage = val;
      this.getTableData(val, recordType);
    },
    tabChange() {
      var recordType = "";
      this.pageInfo.currentPage = 1;
      if(this.currentTab == "tabOne") {
        recordType = 1;
      } else {
        recordType = 2;
      }
      this.tableData = [];
      this.getTableData(this.pageInfo.currentPage, recordType)
    }
  }
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