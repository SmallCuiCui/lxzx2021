<template>
  <div class="WorkReport">
    <el-row>
      <el-button @click="handleFill('day')">日工作填报</el-button>
      <el-button @click="handleFill('week')">周工作填报</el-button>
      <el-button @click="handleFill('year')">年度工作填报</el-button>
    </el-row>

    <el-row style="margin-top: 10px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="index" label="序号" width="80" />
        <el-table-column prop="workDate" label="日期" width="180" />
        <el-table-column prop="workContent" label="工作内容" />
        <el-table-column prop="status" label="状态" width="80" />
        <el-table-column prop="workTypeName" label="类别" width="80" />
        <el-table-column prop="fillName" label="填报人" width="80" />
        <el-table-column prop="relatedPerson" label="相关人员" width="140" />
        <el-table-column prop="fillDate" label="填报日期" width="160" />
        <el-table-column label="操作">
          <template #default="scope">
            <span
              @click="handleEdit(scope.$index, scope.row)"
              :class="scope.row.statusCode == 'draft' ? 'draft' : 'publish'"
              >编辑</span
            >
            <span
              @click="handleDelete(scope.$index, scope.row)"
              :class="scope.row.statusCode == 'draft' ? 'draft' : 'publish'"
              style="margin: 0 5px"
              >删除</span
            >
            <span
              @click="handlePublish(scope.$index, scope.row)"
              :class="scope.row.statusCode == 'draft' ? 'draft' : 'publish'"
              >提交</span
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog
      v-model="dialogFormVisible"
      :title="
        dialogFormType == 'day'
          ? '日工作填报'
          : dialogFormType == 'week'
          ? '周工作填报'
          : '年度工作填报'
      "
    >
      <el-form :model="formData">
        <el-row>
          <el-col :span="12">
            <el-form-item label="填报人:" label-width="100px">
              <el-input
                v-model="formData.fillName"
                autocomplete="off"
                required
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="日期:"
              label-width="100px"
              v-if="dialogFormType == 'day'"
            >
              <el-date-picker
                v-model="formData.workDate"
                type="date"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="日期:"
              label-width="100px"
              v-if="dialogFormType == 'week'"
            >
              <el-date-picker
                v-model="formData.workDate"
                type="week"
                format="[第] ww [周]"
                placeholder="请选择周"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="日期:"
              label-width="100px"
              v-if="dialogFormType == 'year'"
            >
              <el-date-picker
                v-model="formData.workDate"
                type="year"
                placeholder="请选择年"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="dialogFormType == 'year'">
          <el-col :span="24">
            <el-form-item label="相关人员:" label-width="100px">
              <el-select
                v-model="formData.relatedPersons"
                multiple
                placeholder="请选择相关人员"
              >
                <el-option
                  v-for="item in personOptions"
                  :key="item.userCode"
                  :label="item.userName"
                  :value="item.userCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="工作内容:" label-width="100px">
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
          <el-button @click="dialogFormVisible = false">取消</el-button>
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
      tableData: [
        {
          index: 1,
          workDate: "2016-05-03",
          workContent: "工作内容xxxx",
          status: "草稿",
          statusCode: "draft",
          workType: "day",
          workTypeName: "日工作",
          fillName: "张三",
          fillDate: "2021-10-18 9:13:23",
          relatedPerson: "张三、李四",
        },
        {
          index: 2,
          workDate: "2016-05-03 \n至\n 2016-05-10",
          workContent:
            "工作内容xxxx、工作内容xxxx、工作内容xxxx、工作内容xxxx、工作内容xxxx、工作内容xxxx、工作内容xxxx、",
          status: "提交",
          statusCode: "publish",
          workType: "week",
          workTypeName: "周工作",
          fillName: "张三",
          fillDate: "2021-10-18 9:13:23",
          relatedPerson: "张三、李四、王二",
        },
        {
          index: 3,
          workDate: "2021年",
          workContent: "工作内容xxxx",
          status: "提交",
          statusCode: "publish",
          workType: "year",
          workTypeName: "年度工作",
          fillName: "张三",
          fillDate: "2021-10-18 9:13:23",
          relatedPerson: "张三、李四",
        },
        {
          index: 4,
          workDate: "2016-05-03",
          workContent: "工作内容xxxx",
          status: "提交",
          statusCode: "publish",
          workType: "day",
          workTypeName: "日工作",
          fillName: "张三",
          fillDate: "2021-10-18 9:13:23",
          relatedPerson: "张三、李四",
        },
      ],
      formData: {
        fillName: "",
        workDate: "",
        workContent: "",
        relatedPersons: "",
      },
      personOptions: [
        {
          userName: "张三",
          userCode: "zhangsan",
        },
        {
          userName: "李四",
          userCode: "lisi",
        },
        {
          userName: "王二",
          userCode: "wanger",
        },
      ],
      dialogFormVisible: false,
      dialogFormType: "day", //day,weeek,year
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      if (row.statusCode == "publish") {
        return;
      } else {
        this.dialogFormType = row.workType;
        this.dialogFormVisible = true;
      }
    },
    handleDelete(index, row) {
      if (row.statusCode == "publish") {
        return;
      } else {
        this.$confirm("是否确认删除本条数据", "删除", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "warning",
        }).then(() => {
          // 网络请求
          this.$message({
            type: "success",
            message: "删除成功",
            duration: 2000,
          });
        });
      }
    },
    handlePublish(index, row) {
      console.log(index, row);
      if (row.statusCode == "publish") {
        return;
      } else {
        this.$confirm("是否确认提交", "提交", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "info",
        }).then(() => {
          // 网络请求
          this.$message({
            type: "success",
            message: "提交成功",
            duration: 2000,
          });
        });
      }
    },
    handleFill(type) {
      this.dialogFormType = type;
      this.dialogFormVisible = true;
    },
    saveWork(isPublish) {
      if (isPublish) {
        console.log("提交");
      }
    },
  },
};
</script>

<style lang="scss">
.WorkReport {
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