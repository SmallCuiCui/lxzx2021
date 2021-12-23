<template>
  <div class="eventRecord">
    <el-row>
      <el-button @click="dialogFormVisible = true">
        <i class="el-icon-circle-plus-outline"></i>
        <span>新增</span>
      </el-button>
    </el-row>

    <el-row style="margin-top: 10px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="index" label="序号" width="80" align="center">
          <template #default="scope">
            <span>{{
              (pageInfo.currentPage - 1) * pageInfo.pageSize + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="zhuGuan"
          label="时间"
          width="100"
          align="center"
        />
        <el-table-column
          prop="lingDao"
          label="地点"
          width="100"
          align="center"
        />
        <el-table-column prop="beiBanYuan" label="内容" align="center" />
        <el-table-column
          prop="eventDate"
          label="时间"
          width="200"
          align="center"
        >
          <template #default="scope">
            <span>{{
              scope.row.eventDate && scope.row.eventDate.slice(0, 10)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="qinWu" label="文件" width="100" align="center" />
        <el-table-column label="操作">
          <template #default="scope">
            <span
              @click="handleEdit(scope.row)"
              :class="scope.row.isLock ? 'publish' : 'draft'"
              >编辑</span
            >
            <span
              @click="handleDelete(scope.row)"
              :class="scope.row.isLock ? 'publish' : 'draft'"
              style="margin-left: 10px"
              >删除</span
            >
            <span
              @click="handleLock(scope.row)"
              :class="scope.row.isLock ? 'publish' : 'draft'"
              style="margin-left: 10px"
              >锁定</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="pageInfo.total"
        :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        @current-change="handleCurrentChange"
        style="margin-top: 15px"
      >
      </el-pagination>
    </el-row>

    <el-dialog
      v-model="dialogFormVisible"
      width="40%"
      :close-on-click-modal="false"
      title="新增大事记"
    >
      <el-form :model="formData" ref="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="日期" label-width="100px" prop="workTime">
              <el-date-picker
                v-model="formData.workTime"
                type="date"
                placeholder="请选择日期"
                style="width: 100%"
                :clearable="false"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地点" label-width="100px" prop="fillUserNames">
              <el-input
                v-model="formData.fillUserNames"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item
              label="标题"
              label-width="100px"
              prop="relatedPersons"
            >
              <el-input
                v-model="formData.fillUserNames"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" label-width="100px" prop="workContent">
              <el-input
                type="textarea"
                v-model="formData.workContent"
                autocomplete="off"
                rows="4"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveEvent()">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{ id: 1 }],
      dialogFormVisible: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 15,
        total: 0,
      },
      formData: {},
    };
  },
  methods: {
    getTableData() {},
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getTableData(this.pageInfo.currentPage);
    },
    handleEdit(row) {
      console.log(row);
    },
    handleDelete(row) {
      if (row.isLock) {
        return;
      } else {
        this.$confirm("是否确认删除本条数据", "删除", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "warning",
        }).then(() => {
          // 网络请求
          this.$http.deletScheduleById(row.eventId).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功",
                duration: 2000,
              });
              this.getTableData(this.pageInfo.currentPage);
            }
          });
        });
      }
    },
    handleLock(row) {
      console.log(row);
    },
    saveEvent() {},
  },
};
</script>

<style lang="scss">
.eventRecord {
}
</style>