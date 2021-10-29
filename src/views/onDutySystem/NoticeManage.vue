<template>
  <div class="NoticeManage">
    <el-row>
      <el-button @click="addModalVisible = true">
        <i class="el-icon-circle-plus-outline"></i>
        <span>新增</span>
      </el-button>
    </el-row>

    <el-row style="margin-top: 10px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="index" label="序号" width="80" />
        <el-table-column prop="noticeTitle" label="标题" width="140" />
        <el-table-column prop="noticeContent" label="内容" />
        <el-table-column prop="isPublish" label="是否发布" width="60">
          <template #default="scope">
            {{ scope.row.isPublish ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="是否投屏" width="60">
          <template #default="scope">
            {{ scope.row.isScreen ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="publishTime" label="发布时间" width="160" />
        <el-table-column prop="createName" label="创建人" width="80" />
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <span
              @click="handleEdit(scope.$index, scope.row)"
              :class="scope.row.isPublish ? 'publish' : 'draft'"
              >编辑</span
            >
            <span
              @click="handleDelete(scope.$index, scope.row)"
              :class="scope.row.isPublish ? 'publish' : 'draft'"
              style="margin: 0 5px"
              >删除</span
            >
            <span
              @click="handlePublish(scope.$index, scope.row)"
              :class="scope.row.isPublish ? 'publish' : 'draft'"
              >立即发布</span
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog v-model="addModalVisible" title="新增通知">
      <el-form :model="formData">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题:" label-width="100px">
              <el-input
                v-model="formData.noticeTitle"
                autocomplete="off"
                required
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="创建人:" label-width="100px">
              <el-input
                v-model="formData.createName"
                autocomplete="off"
                required
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布时间:" label-width="100px">
              <el-date-picker
                v-model="formData.publishTime"
                type="datetime"
                placeholder="请选择时间"
                :default-time="new Date()"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="dialogFormType == 'year'">
          <el-col :span="24">
            <el-form-item label="是否投屏:" label-width="100px">
              <el-radio v-model="formData.isScreen" label="true">是</el-radio>
              <el-radio v-model="formData.isScreen" label="false">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="通知内容:" label-width="100px">
              <el-input
                type="textarea"
                v-model="formData.noticeContent"
                autocomplete="off"
                rows="4"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addModalVisible = false">取消</el-button>
          <el-button @click="saveNotice()">保存</el-button>
          <el-button type="primary" @click="saveNotice(true)">立即发布</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NoticeManage",
  data() {
    return {
        addModalVisible: false,
      formData: {
        noticeTitle: "",
        createName: "",
        createCode: "",
        publishTime: "",
        isScreen: "",
        noticeContent: "",
      },
      tableData: [
        {
          index: 1,
          noticeTitle: "标题1",
          noticeContent: "工作内容xxxx",
          isPublish: false,
          isScreen: false,
          publishTime: "2016-05-03 15:05:24",
          createName: "王小虎",
          createCode: "王虎",
          createTime: "2016-05-03 15:05:24",
        },
        {
          index: 2,
          noticeTitle: "标题1",
          noticeContent: "工作内容xxxx",
          isPublish: false,
          isScreen: true,
          publishTime: "2016-05-03 15:05:24",
          createName: "王小虎",
          createCode: "王虎",
          createTime: "2016-05-03 15:05:24",
        },
        {
          index: 3,
          noticeTitle: "标题1",
          noticeContent: "工作内容xxxx",
          isPublish: true,
          isScreen: false,
          publishTime: "2016-05-03 15:05:24",
          createName: "王小虎",
          createCode: "王虎",
          createTime: "2016-05-03 15:05:24",
        },
        {
          index: 4,
          noticeTitle: "标题1",
          noticeContent: "工作内容xxxx",
          isPublish: true,
          isScreen: true,
          publishTime: "2016-05-03 15:05:24",
          createName: "王小虎",
          createCode: "王虎",
          createTime: "2016-05-03 15:05:24",
        },
      ],
    };
  },
  methods: {
    handleAdd() {},
    handleEdit(index, row) {
      console.log(index, row);
      if (row.statusCode == "publish") {
        return;
      } else {
        this.addModalVisible = true;
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
        this.$confirm("是否确认立即发布", "立即发布", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "info",
        }).then(() => {
          // 网络请求
          this.$message({
            type: "success",
            message: "发布成功",
            duration: 2000,
          });
        });
      }
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
.NoticeManage {
  width: 100%;
  height: 100%;

  .publish {
    color: #bbbbbb;
  }

  .draft {
    color: #3894ff;
    cursor: pointer;
  }
}
</style>