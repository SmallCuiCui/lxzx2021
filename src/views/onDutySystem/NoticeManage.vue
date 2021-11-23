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
        <el-table-column prop="index" label="序号" width="80">
          <template #default="scope">
            <span>{{(pageInfo.currentPage - 1) * pageInfo.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="noticeTitle" label="标题" width="200" />
        <el-table-column prop="noticeContent" label="内容">
          <template #default="scope">
              <span v-html="scope.row.noticeContent" style="white-space: pre;"></span>
            </template>
        </el-table-column>
        <el-table-column prop="publish" label="是否发布" width="100">
          <template #default="scope">
            {{ scope.row.publish ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="是否投屏" width="100">
          <template #default="scope">
            {{ scope.row.whetherScreen ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="publishTime" label="发布时间" width="160" />
        <el-table-column prop="createUserName" label="创建人" width="80" />
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <span
              @click="handleEdit(scope.$index, scope.row)"
              :class="scope.row.publish ? 'publish' : 'draft'"
              >编辑</span
            >
            <span
              @click="handleDelete(scope.$index, scope.row)"
              :class="scope.row.publish ? 'publish' : 'draft'"
              style="margin: 0 5px"
              >删除</span
            >
            <span
              @click="handlePublishNow(scope.$index, scope.row)"
              :class="scope.row.publish ? 'publish' : 'draft'"
              >立即发布</span
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

    <el-dialog v-model="addModalVisible" title="新增通知">
      <el-form :model="formData" ref="addForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题:" label-width="100px" prop="noticeTitle">
              <el-input
                v-model="formData.noticeTitle"
                autocomplete="off"
                required
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="立即发布:" label-width="100px" prop="publish" @change="publishNow">
              <el-radio v-model="formData.publish" :label="true">是</el-radio>
              <el-radio v-model="formData.publish" :label="false">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布时间:" label-width="100px" prop="publishTime">
              <el-date-picker
                v-model="formData.publishTime"
                type="datetime"
                placeholder="请选择发布时间"
                :disabled="formData.publish"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-left: 15px;">
            <el-form-item label="是否投屏:" label-width="100px" prop="whetherScreen">
              <el-radio v-model="formData.whetherScreen" :label="true">是</el-radio>
              <el-radio v-model="formData.whetherScreen" :label="false">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="通知内容:" label-width="100px" prop="noticeContent">
              <el-input
                type="textarea"
                v-model="formData.noticeContent"
                autocomplete="off"
                rows="6"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetAddForm('addForm')">取消</el-button>
          <el-button type="primary" @click="saveNotice()">提交</el-button>
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
      pageInfo: {
        currentPage: 1,
        pageSize: 15,
        total: 0,
      },
      formData: {
        noticeTitle: "",
        publish: true,
        publishTime: "",
        whetherScreen: false,
        noticeContent: "",
      },
      tableData: [
        {
          index: 1,
          noticeTitle: "标题1",
          noticeContent: "工作内容xxxx",
          isPublish: false,
          whetherScreen: false,
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
          whetherScreen: true,
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
          whetherScreen: false,
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
          whetherScreen: true,
          publishTime: "2016-05-03 15:05:24",
          createName: "王小虎",
          createCode: "王虎",
          createTime: "2016-05-03 15:05:24",
        },
      ],
    };
  },
  created() {
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
    publishNow() {
     if(this.formData.publish) {
       this.formData.publishTime = null;
     }
    },
    handleEdit(index, row) {
      if (row.publish) {
        return;
      } else {
        this.formData = {
          noticeTitle: row.noticeTitle,
          publish: row.publish,
          publishTime: row.publishTime,
          whetherScreen: row.whetherScreen,
          noticeContent: row.noticeContent,
          createTime: row.createTime,
          noticeId: row.noticeId
        }
        this.addModalVisible = true;
      }
    },
    handleDelete(index, row) {
      if (row.publish) {
        return;
      } else {
        this.$confirm("是否确认删除本条数据", "删除", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "warning",
        }).then(() => {
          // 网络请求
          this.$http.deletNoticeById(row.noticeId).then(res => {
            if(res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功",
                duration: 2000,
              });
              this.getTableData(this.pageInfo.currentPage);
            }
          })
        });
      }
    },
    handlePublishNow(index, row) {
      if (row.publish) {
        return;
      } else {
        this.$confirm("是否确认立即发布", "立即发布", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "info",
        }).then(() => {
          // 网络请求
          this.$http.handlePublishNow(row.noticeId).then(res => {
            if(res.code == 200) {
              this.$message({
                type: "success",
                message: "发布成功",
                duration: 2000,
              });
              this.getTableData(this.pageInfo.currentPage);
            }
          })
        });
      }
    },
    saveNotice() {
      if(this.formData.noticeTitle.length == 0) {
        this.$message({type: "wraning", message: "通知标题不能为空", duration: 2000, });
        return;
      }
      if(this.formData.noticeContent.length == 0) {
        this.$message({type: "wraning", message: "通知内容不能为空", duration: 2000,});
        return;
      }
      if(!this.formData.publish && !this.formData.publishTime) {
        this.$message({type: "wraning", message: "请选择预发布的时间", duration: 2000,});
        return;
      }
      this.$http.addAndEditNotice({
        ...this.formData,
        publishTime: this.formData.publishTime ? this.$moment(this.formData.publishTime).format("YYYY-MM-DD HH:mm:ss") : null,
      }).then(res => {
        if(res.code == 200) {
          this.$message({
            type: "success",
            message: res.message,
            duration: 2000,
          });
          this.resetAddForm("addForm");
          this.getTableData(this.pageInfo.currentPage)
        }
      })
    },
    resetAddForm(formName) {
      this.$refs[formName].resetFields();
      this.addModalVisible = false;
    },
    getTableData(currentPage) {
      this.$http.findAllNoticeByPage({
          pageNum: currentPage,
          pageSize: this.pageInfo.pageSize,
      }).then(res => {
        if (res.code == 200) {
            this.tableData = res.data.datalist ? res.data.datalist.result : [];
            this.pageInfo.total = res.data.datalist ? res.data.datalist.total : 0;
          }
      })
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getTableData(val);
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