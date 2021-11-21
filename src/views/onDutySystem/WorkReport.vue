<template>
  <div class="WorkReport">
    <el-row class="WorkReport_btns">
      <el-button @click="handleFill('day')">日工作填报</el-button>
      <el-button @click="handleFill('week')">周工作填报</el-button>
      <el-button @click="handleFill('year')">年度工作填报</el-button>
    </el-row>

    <el-scrollbar class="WorkReport_table">
      <el-row style="margin-top: 10px">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="index" label="序号" width="50px" align="center">
            <template #default="scope">
              <span>{{
                (pageInfo.currentPage - 1) * pageInfo.pageSize + scope.$index + 1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="workTime" label="日期" width="120px" />
          <el-table-column prop="workContent" label="工作内容/本周工作">
            <template #default="scope">
              <span v-html="scope.row.workContent" style="white-space: pre;"></span>
            </template>
          </el-table-column>
          <el-table-column prop="workContentPlan" label="下周工作">
            <template #default="scope">
              <span v-html="scope.row.workContentPlan" style="white-space: pre;"></span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="80">
            <template #default="scope">
              <span>{{ scope.row.status == "DRAFT" ? "草稿" : "提交" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="workType" label="类别" width="80">
            <template #default="scope">
              <span>{{
                scope.row.workType == "day"
                  ? "日工作"
                  : scope.row.workType == "week"
                  ? "周工作"
                  : "年度工作"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fillUserNames" label="填报人" width="120" />
          <el-table-column prop="relatedUsers" label="相关人员" width="200">
            <template #default="scope">
              <span>{{ formaterOne(scope.row.relatedUsers) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="commitTime" label="提交时间" width="160" />
          <el-table-column label="操作" width="120px">
            <template #default="scope">
              <span
                @click="handleEdit(scope.$index, scope.row)"
                :class="scope.row.status == 'DRAFT' ? 'draft' : 'publish'"
                >编辑</span
              >
              <span
                @click="handleDelete(scope.$index, scope.row)"
                :class="scope.row.status == 'DRAFT' ? 'draft' : 'publish'"
                style="margin: 0 5px"
                >删除</span
              >
              <span
                @click="handlePublish(scope.$index, scope.row)"
                :class="scope.row.status == 'DRAFT' ? 'draft' : 'publish'"
                >提交</span
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
    </el-scrollbar>

    <el-dialog
      v-model="dialogFormVisible"
      width="40%"
      :close-on-click-modal="false"
      :title="
        dialogFormType == 'day'
          ? '日工作填报'
          : dialogFormType == 'week'
          ? '周工作填报'
          : '年度工作填报'
      "
    >
      <el-form :model="formData" ref="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="填报人"
              label-width="100px"
              prop="fillUserNames"
            >
              <el-input
                v-model="formData.fillUserNames"
                autocomplete="off"
                required
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="日期"
              label-width="100px"
              v-if="dialogFormType == 'day'"
              prop="workTime"
            >
              <el-date-picker
                v-model="formData.workTime"
                type="date"
                placeholder="请选择日期"
                style="width: 100%"
                :clearable="false"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="日期"
              label-width="100px"
              v-if="dialogFormType == 'week'"
              prop="workTime"
            >
              <el-input v-model="formData.workTime" :disabled="true" />
            </el-form-item>

            <el-form-item
              label="日期:"
              label-width="100px"
              v-if="dialogFormType == 'year'"
              prop="workTime"
            >
              <el-input v-model="formData.workTime" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item
              label="相关人员"
              label-width="100px"
              prop="relatedPersons"
            >
              <el-select
                v-model="formData.relatedPersons"
                multiple
                placeholder="请选择相关人员"
                value-key="userCode"
              >
                <el-option
                  v-for="item in personOptions"
                  :key="item.userCode"
                  :label="item.userName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item
              :label="dialogFormType == 'week' ? '本周工作内容' : '工作内容'"
              label-width="100px"
              prop="workContent"
            >
              <el-input
                type="textarea"
                v-model="formData.workContent"
                autocomplete="off"
                rows="4"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="dialogFormType == 'week'">
          <el-col :span="24">
            <el-form-item
              label="下周工作计划"
              label-width="100px"
              prop="workContentPlan"
            >
              <el-input
                type="textarea"
                v-model="formData.workContentPlan"
                autocomplete="off"
                rows="4"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetAddForm('addForm')">取消</el-button>
          <el-button @click="saveWork()">保存</el-button>
          <el-button type="primary" @click="saveWork(true)">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 15,
        total: 0,
      },
      tableData: [], //表格数据
      userInfo: {},
      formData: {
        workId: "",
        fillUserNames: "",
        fillUserCodes: "",
        workTime: "",
        workContent: "",
        workContentPlan: "",
        relatedPersons: "",
      },
      personOptions: [],
      dialogFormVisible: false,
      dialogFormType: "day", //day,weeek,year
    };
  },
  created() {
    var userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
      this.formData.fillUserNames = userInfo.userName;
      this.formData.fillUserCodes = userInfo.userCode;
    }
    this.getTableData(this.pageInfo.currentPage);
  },
  watch: {
    "pageInfo.currentPage": {
      handler(newVal) {
        this.getTableData(newVal);
        this.pageInfo.currentPage = newVal;
      },
    },
  },
  methods: {
    handleEdit(index, row) {
      if (row.status == "DRAFT") {
        this.queryUsers();
        this.dialogFormType = row.workType;
        this.dialogFormVisible = true;
        var fillUserCodes = row.fillUserCodes;
        var fillUserNames = row.fillUserNames;
        if(row.fillUserCodes.indexOf(this.userInfo.userCode) == -1) {
          fillUserCodes = fillUserCodes + "," + this.userInfo.userCode;
          fillUserNames = fillUserNames + "," + this.userInfo.userName;
        }
        var relatedPersons = row.relatedUsers.split(",").reduce((all, item)=>{
          console.log(all)
          all.push({userCode: item.split("_")[0], userName: item.split("_")[1]})
          return all;
        }, []);
        this.formData = {
          fillUserNames,
          fillUserCodes,
          workTime: row.workTime,
          workContent: row.workContent,
          workContentPlan: row.workContentPlan,
          relatedPersons,
          workId: row.workId
        }
      }
    },
    resetAddForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    handleDelete(index, row) {
      if (row.status == "DRAFT") {
        this.$confirm("是否确认删除本条数据", "删除", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "warning",
        }).then(() => {
          // 网络请求
          this.$http.deletWorkById(row.workId).then((res) => {
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
    handlePublish(index, row) {
      console.log(index, row);
      if (row.status == "DRAFT") {
        this.$confirm("是否确认提交", "提交", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "info",
        }).then(() => {
          // 网络请求
          this.$http.handleWorkPublish(row.workId).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 2000,
              });
              this.getTableData(this.pageInfo.currentPage);
            }
          });
        });
      }
    },
    handleFill(type) {
      // 请求此部门下的所有用户
      this.queryUsers();
      // 初始化弹框信息
      this.dialogFormType = type;
      let workTime =
        this.dialogFormType == "day"
          ? this.$moment().format("YYYY-MM-DD")
          : this.dialogFormType == "week"
          ? "第" + this.$moment().format("w") + "周"
          : this.$moment().format("YYYY") + "年度";
      this.formData = {
        ...this.formData,
        fillUserNames: this.userInfo.userName,
        fillUserCodes: this.userInfo.userCode,
        workTime: workTime,
      };
      this.dialogFormVisible = true;
    },
    queryUsers() {
      this.$http.findUserByDeptId(this.userInfo.deptId).then((res) => {
        if (res.code == 200) {
          this.personOptions = res.data.data;
        } else {
          console.log(res.message);
        }
      });
    },
    saveWork(isPublish) {
      if (!this.formData.workContent) {
        this.$message({ type: "error", message: "请输入工作内容" });
        return;
      }
      let startTime, endTime, workTime;
      let relatedUsers = this.formData.relatedPersons.reduce((total, item) => {
        return total + item.userCode + "_" + item.userName + ",";
      }, "");
      relatedUsers = relatedUsers.substr(0, relatedUsers.length - 1);
      if (this.dialogFormType == "day") {
        startTime = this.$moment(this.formData.workTime).startOf(this.dialogFormType).format("YYYY-MM-DD HH:mm:ss");
        endTime = this.$moment(this.formData.workTime).endOf(this.dialogFormType).format("YYYY-MM-DD HH:mm:ss");
      } else {
        startTime = this.$moment().startOf(this.dialogFormType).format("YYYY-MM-DD HH:mm:ss");
        endTime = this.$moment().endOf(this.dialogFormType).format("YYYY-MM-DD HH:mm:ss");
      }
      workTime = this.dialogFormType == "day" ? this.$moment(this.formData.workTime).format("YYYY-MM-DD") : this.formData.workTime;
      this.$http
        .addAndEditWork({
          ...this.formData,
          status: isPublish ? "PUBLISH" : "DRAFT",
          workType: this.dialogFormType,
          relatedUsers,
          startTime,
          endTime,
          workTime,
          deptId: this.userInfo.deptId,
          deptName: this.userInfo.deptName,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: !isPublish ? "工作记录保存成功！" : "工作记录提交成功！",
              type: "success",
              duration: 2000,
            });
            this.resetAddForm("addForm");
            this.getTableData(this.pageInfo.currentPage);
          }
        });
    },
    getTableData(currentPage) {
      this.$http
        .findAllWorkByPage({
          pageNum: currentPage,
          pageSize: this.pageInfo.pageSize,
        })
        .then((res) => {
          if (res.code == 200) {
            this.tableData = res.data.datalist ? res.data.datalist.result : [];
            this.pageInfo.total = res.data.datalist
              ? res.data.datalist.total
              : 0;
          }
        });
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getTableData(val);
    },
    formaterOne(relatedUsers) {
      if (!relatedUsers) {
        return null;
      } else {
        let arr = relatedUsers.split(",");
        let resultStr = arr.reduce((total, item) => {
          return total + item.split("_")[1] + "、";
        }, "");
        return resultStr.substr(0, resultStr.length - 1);
      }
    },
  },
};
</script>

<style lang="scss">
.WorkReport {
  height: 100%;
  display: flex;
  flex-direction: column;
  &_btns{
    height: 40px;
  }
  &_table{
    flex: 1;
  }
  .publish {
    color: #bbbbbb;
  }
  .draft {
    color: #3894ff;
    cursor: pointer;
  }
  .el-select {
    width: 100%;
  }
}
</style>