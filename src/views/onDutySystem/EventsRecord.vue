<template>
  <div class="eventRecord">
    <el-row style="padding-left: 30px; padding: 10px; height: 60px;">
      <el-button @click="handleAddEvent" type="primary">
        <i class="el-icon-circle-plus-outline"></i>
        <span>新增</span>
      </el-button>

      <el-date-picker
        v-model="timeRange"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :shortcuts="shortcuts"
        style="margin: 0 20px;"
        @change="getTimeLineData2"
      >
      </el-date-picker>

      <div class="eventRecord_search">
        <el-input v-model="searchValue" placeholder="请输入关键字查询" clearable/>
        <el-button @click="getTimeLineData2" >查询</el-button>
      </div>
    </el-row>

    <el-scrollbar style="flex: 1;" v-infinite-scroll="loadMoreEvent" :infinite-scroll-immediate="false">
      <el-row style="margin-top: 40px; padding-left: 140px; width: 100%;">
        <el-empty description="暂无数据" v-if="timeLineData.length == 0" style="width: 80%; "></el-empty>
        <el-timeline style="width: 100%">
          <el-timeline-item
            style="width: 70%;"
            v-for="item in timeLineData"
            :key="item.id"
            :timestamp="item.eventDate.slice(0, 10)"
            placement="top" 
            type='primary' >
            <el-card>
              <h4 style="height: 32px; display: flex; justify-content: space-between;">
                <span style="font-size: 16px;">{{item.title}}</span>
                <div style="font-size: 20px; display: flex; width: 120px; justify-content: space-around;">
                  <i class="el-icon-edit-outline" @click="handleEditEvent(item)" :style="{color: item.lock ? '#C0C4CC' : '#409EFF', cursor: 'pointer'}"></i>
                  <i class="el-icon-delete" @click="handleDelete(item)" :style="{color: item.lock ? '#C0C4CC' : '#409EFF', cursor: 'pointer'}"></i>
                  <i class="el-icon-download" @click="handleDownLoad(item.fileURL)" style="color: #409EFF; cursor: pointer;"></i>
                  <i 
                    @click="handleLockEvent(item)"
                    :class="item.lock ? 'el-icon-lock' : 'el-icon-unlock'" 
                    style="color: #409EFF; cursor: pointer;"></i>
                </div>
              </h4>
              <p style="line-height: 24px;" v-html="item.content"></p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-row>
    </el-scrollbar>
    <el-dialog
      v-model="dialogFormVisible"
      width="40%"
      :close-on-click-modal="false"
      :title="dialogTitle"
    >
      <el-form :model="formData" ref="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="日期：" label-width="100px" prop="eventDate">
              <el-date-picker
                v-model="formData.eventDate"
                type="date"
                placeholder="请选择日期"
                style="width: 100%"
                :clearable="false"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="上传文件："
              label-width="100px"
              prop="fileURL"
            >
              <el-upload
                class="upload-demo"
                accept=".doc,.docx,.pdf,image/*"
                :action="this.localhostPath + '/api/common/upload'"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="formData.fileList"
                :on-change="handleFileChange"
                :on-remove="handleRmove"
              >
                <el-button type="primary">点击选择文件</el-button>
                <!-- <template #tip>
                  <div class="el-upload__tip">
                    可以上传文件类型：.doc、.docx、.pdf和图片
                  </div>
                </template> -->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item
              label="标题："
              label-width="100px"
              prop="title"
            >
              <el-input
                v-model="formData.title"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="内容：" label-width="100px" prop="content">
              <el-input
                type="textarea"
                v-model="formData.content"
                autocomplete="off"
                rows="8"
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
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      searchValue: "",
      dialogFormVisible: false,
      dialogTitle: "",
      currentPage: 1,
      formData: {
        fileList: []
      },
      timeRange: [], // 删选时间区间
      timeLineData: [],
      shortcuts: [
        {
          text: '最近一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        },
        {
          text: '最近一月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: '最近三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
      ],
      selectedRow: {},
      localhostPath: ""
    };
  },
  created() {
    this.getTimeLineData();
    // 获取协议、地址、端口号，上传文件需要
    let curWwwPath = window.document.location.href;
    let pathName = window.document.location.pathname;
    let pos = curWwwPath.indexOf(pathName);
    this.localhostPath = curWwwPath.substring(0, pos);
  },
  watch: {
    searchValue(newValue) {
      if(!newValue) {
        this.getTimeLineData2()
      }
    }
  },
  methods: {
    getTimeLineData() {
      var startT = this.timeRange && this.timeRange.length == 2 ? this.$moment(this.timeRange[0]).format("YYYY-MM-DD HH:mm:ss") : "";
      var endT = this.timeRange && this.timeRange.length == 2 ? this.$moment(this.timeRange[1]).format("YYYY-MM-DD HH:mm:ss") : "";
      this.$http.findEventByPage({
        currentPage: this.currentPage,
        searchValue: this.searchValue,
        startT,
        endT
      }).then(res => {
        if(res.code == 200 && res.data.datalist) {
          if(this.currentPage == 1) {
            this.timeLineData = res.data.datalist.result
          } else {
            this.timeLineData = this.timeLineData.concat(res.data.datalist.result)
          }
        }
      })
    },
    getTimeLineData2() {
      this.currentPage = 1;
      this.getTimeLineData();
    },
    handleAddEvent() {
      this.dialogTitle = "新增大事记";
      this.selectedRow = {};
      this.formData = {};
      this.formData.fileList = [];
      this.dialogFormVisible = true;
    },
    saveEvent() {
      if(this.formData.title == "") {
        ElMessage({message: '标题不能为空', type: 'warning',});
        return;
      }
      if(this.formData.content == "") {
        ElMessage({message: '内容不能为空', type: 'warning',});
        return;
      }
      if(this.formData.eventDate == "") {
        ElMessage({message: '时间不能为空', type: 'warning',});
        return;
      }
      delete this.formData.fileList;
      this.$http.addAndEditEvent({
        ...this.selectedRow,
        ...this.formData,
        fileURL: this.formData.fileURL && this.formData.fileURL,
        eventDate: this.$moment(this.formData.eventDate).format("YYYY-MM-DD HH:mm:ss")
      }).then(res => {
        if(res.code == 200) {
          ElMessage({message: '添加成功', type: 'success',});
          this.formData = {};
          this.dialogFormVisible = false;
          this.getTimeLineData2();
        }
      })
    },
    handleDownLoad(fileURL) {
      if(fileURL) {
        window.open("api/common/download?fileFullName=" + fileURL);
      }
    },
    handleDelete(row) {
      if (row.lock) {
        return;
      } else {
        this.$confirm("是否确认删除本条数据", "删除", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "warning",
        }).then(() => {
          // 网络请求
          this.$http.deleteEventById(row.eventId).then(res => {
            if(res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功",
                duration: 2000,
              });
              this.getTimeLineData2();
            }
          })
        });
      }
    },
    handleLockEvent(row) {
      if (row.lock) {
        return;
      } else {
        this.$confirm("是否确认锁定：“" + row.title + "”", "锁定", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "warning",
        }).then(() => {
          // 网络请求
          this.$http.lockEventById(row.eventId).then(res => {
            if(res.code == 200) {
              this.$message({
                type: "success",
                message: "锁定成功",
                duration: 2000,
              });
              this.getTimeLineData2();
            }
          })
        });
      }
    },
    handleEditEvent(row) {
      if (row.lock) {
        return;
      }
      this.selectedRow = row;
      var fileList = [];
      if(row.fileURL) {
        var obj = {
          name: row.fileURL.split("/")[2],
          url: row.fileURL
        }
        fileList.push(obj)
      }
      this.formData = {
        title: row.title,
        content: row.content,
        eventDate: row.eventDate,
        fileURL: row.fileURL,
        fileList,
      }
      this.dialogTitle = "编辑大事记"
      this.dialogFormVisible = true;
    },
    loadMoreEvent() {
      this.currentPage ++;
      this.getTimeLineData();
    },
    handleExceed(fileList) {
      this.$message({
        type: "warning",
        message: `你已选择${fileList.length}个文件，限制上传一个文件`,
        duration: 2000,
      });
    },
    handleFileChange(fileList) {
      console.log(fileList)
      if(fileList.status == "fail") {
        this.$message({
          type: "warning",
          message: `仅支持上传word、图片、PDF格式、且小于10M文件`,
          duration: 2000,
        })
      }else if(fileList.response && fileList.response.success && fileList.response.data && fileList.response.data.data){
        this.formData.fileURL = fileList.response.data.data.filePath
        this.formData.fileName = fileList.response.data.data.fileName
      }
    },
    handleRmove(file, fileList) {
      if(fileList.length == 0) {
        this.formData.fileURL = ""
      }
    }
  },
};
</script>

<style lang="scss">
.eventRecord {
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-date-editor .el-range-separator{
    width: 22px;
  }
  &_search{
    display: flex;

    .el-input__inner{
      border-top-right-radius: 0; 
      border-bottom-right-radius: 0;
    }
    button{
      border-top-left-radius: 0; 
      border-bottom-left-radius: 0;
      border-left: none ;
      
    }
  }
}
</style>