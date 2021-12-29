<template>
  <div class="PersonManage">
    <el-row>
      <el-col :span="21">
        在位：<span>{{ personSituaton.zaiwei }}</span> 请假：<span>{{
          personSituaton.qingjia
        }}</span>
        借调：<span>{{ personSituaton.jiediao }}</span>
      </el-col>
      <el-col :span="3">
        <img
          src="@/assets/images/user_add.png"
          @click="addVisible = true"
          style="cursor: pointer"
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-table 
        :data="tableData" 
        border 
        style="width: 100%" 
        :default-sort="{ prop: 'createTime', order: 'descending' }"
        v-loading="loading"
      >
        <el-table-column prop="index" label="序号" width="80">
          <template #default="scope">
            <span>{{(pageInfo.currentPage - 1) * pageInfo.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" width="160" />
        <el-table-column prop="userCode" label="账号" width="160" />
        <el-table-column prop="phoneNum" label="联系电话" width="180" />
        <el-table-column prop="deptName" label="所在科室" width="180" />
        <el-table-column prop="status" label="在位状态" width="120">
          <template #default="scope">
            <span>{{ statusMap(scope.row.status) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template #default="scope">
            <span @click="handleEdit(scope.$index, scope.row)" class="edit">编辑</span>
            <span @click="handleDelete(scope.row)" class="edit">删除</span>
            <span @click="handleView(scope.$index, scope.row)" class="edit">查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="statistics" label="不在位状态记录">
          <template #default="scope">
            <span @click="handleViewZaiWei(scope.row)" class="edit"
              >查看</span>
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

    <el-dialog v-model="editVisible" title="人员管理">
      <el-form :model="editForm" ref="editForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" label-width="100px">
              <el-input
                v-model="editForm.userName"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码" label-width="100px">
              <el-input
                v-model="editForm.phoneNum"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="在位状态" label-width="100px">
              <el-check-tag
                :checked="editForm.status == 'ZAIWEI'"
                @click="editForm.status = 'ZAIWEI'"
                style="margin-right: 8px"
                >在位</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'XUEXI'"
                @click="editForm.status = 'XUEXI'"
                style="margin-right: 8px"
                >学习</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'CHUCHAI'"
                @click="editForm.status = 'CHUCHAI'"
                style="margin-right: 8px"
                >出差</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'QINGJIA'"
                @click="editForm.status = 'QINGJIA'"
                style="margin-right: 8px"
                >请假</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'XIUJIA'"
                @click="editForm.status = 'XIUJIA'"
                style="margin-right: 8px"
                >休假</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'LUNXIU'"
                @click="editForm.status = 'LUNXIU'"
                style="margin-right: 8px"
                >轮休</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'JIEDIAO'"
                @click="editForm.status = 'JIEDIAO'"
                style="margin-right: 8px"
                >借调</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'ZHUYUAN'"
                @click="editForm.status = 'ZHUYUAN'"
                style="margin-right: 8px"
                >住院</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'PEIHU'"
                @click="editForm.status = 'PEIHU'"
                style="margin-right: 8px"
                >陪护</el-check-tag
              >
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" label-width="100px">
              <el-date-picker
                v-model="editForm.startDate"
                type="date"
                placeholder="请选择"
                :disabled="editForm.status == 'ZAIWEI'"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" label-width="100px">
              <el-date-picker
                v-model="editForm.endDate"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetEditForm('editForm')">取消</el-button>
          <el-button type="primary" @click="publishEditForm('editForm')"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detailVisible"
      :title="selectedRow.userName + '(' + statusMap(selectedRow.status)+ ')'"
      class="PersonManage_detail"
    >
      <el-row class="PersonManage_detail_row">
        <el-col :span="4" class="PersonManage_detail_head">
          <span>{{new Date().getFullYear()}}</span>年
        </el-col>
        <el-col :span="20" class="PersonManage_detail_cellBox">
          <div class="PersonManage_detail_cellBox_cell">请假天数：{{detailData.qingJiaNum ? detailData.qingJiaNum : 0}} 天</div>
          <div class="PersonManage_detail_cellBox_cell">值班天数：{{detailData.zhiBanNum ? detailData.zhiBanNum : 0}} 天</div>
          <div class="PersonManage_detail_cellBox_cell">出差天数：{{detailData.chuChaiNum ? detailData.chuChaiNum : 0}} 天</div>
          <div class="PersonManage_detail_cellBox_cell">轮休天数：{{detailData.lunXiuNum ? detailData.lunXiuNum : 0}} 天</div>
          <div class="PersonManage_detail_cellBox_cell">休假天数：{{detailData.xiuJiaNum ? detailData.xiuJiaNum : 0}} 天</div>
          <div class="PersonManage_detail_cellBox_cell">假期剩余：{{detailData.jiaQiRemain ? detailData.jiaQiRemain : 0}} 天</div>
        </el-col>
      </el-row>

      <div class="PersonManage_detail_row" style="margin: 20px 0">
        <el-col :span="4" class="PersonManage_detail_head">
          <span>不在位情况</span>
        </el-col>
        <el-col :span="20" class="PersonManage_detail_cellBlock">
          <el-scrollbar :always="true">
            <div style="display: flex">
              <div
                class="PersonManage_detail_cellBlock_cell"
                v-for="(item, index) in notZaiWeiList"
                :key="index"
              >
                <h4>{{ item.startTime.slice(0, 10) + "至" + item.endTime.slice(0, 10) }}</h4>
                <p>{{ item.dayNum + "天" }}</p>
              </div>
            </div>
          </el-scrollbar>
          <div v-if="notZaiWeiList.length == 0" class="PersonManage_detail_cellBlock_noData">暂无记录</div>
        </el-col>
      </div>

      <div class="PersonManage_detail_row">
        <el-col :span="4" class="PersonManage_detail_head2">
          <span>值班情况({{detailData.zhiBanNum ? detailData.zhiBanNum : 0}}天)
            <br />工 作 日：{{detailData.workZbDay ? detailData.workZbDay : 0}}天
            <br />非工作日：{{detailData.festivalZbDay ? detailData.festivalZbDay : 0}}天</span>
        </el-col>
        <el-col :span="20" class="PersonManage_detail_cellBlock">
          <el-scrollbar :always="true">
            <div style="display: flex">
              <div
                class="PersonManage_detail_cellBlock_cell"
                v-for="(item, index) in zhiBanList"
                :key="index"
              >
                <h4>{{ item.startTime.slice(0, 10) + "至" + item.endTime.slice(0, 10) }}</h4>
                <p>{{ item.dayNum}}<span>{{item.weekday ? " 天" : " 天(节假日)"}}</span></p>
              </div>
            </div>
          </el-scrollbar>
          <div v-if="notZaiWeiList.length == 0" class="PersonManage_detail_cellBlock_noData">暂无记录</div>
        </el-col>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleDetailOk()"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="addVisible"
      title="新增人员"
      width="40%"
      destroy-on-close
    >
      <el-form
        :model="addUserForm"
        ref="addUserForm"
        :rules="addRules"
        style="margin-right: 20px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户姓名" label-width="100px" prop="userName">
              <el-input
                v-model="addUserForm.userName"
                autocomplete="off"
                placeholder="请输入用户姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户账号" label-width="100px" prop="userCode">
              <el-input
                v-model="addUserForm.userCode"
                autocomplete="off"
                placeholder="请输入用户账号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" label-width="100px" prop="phoneNum">
              <el-input
                v-model="addUserForm.phoneNum"
                autocomplete="off"
                placeholder="请输入联系电话"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人员类别" label-width="100px">
              <el-select
                v-model="addUserForm.position"
                value-key="value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in positionList"
                  :key="item.value"
                  :label="item.name"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="所属科室"
              label-width="100px"
              prop="department"
            >
              <el-select
                v-model="addUserForm.department"
                value-key="value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in departmentList"
                  :key="item.value"
                  :label="item.name"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科室管理员" label-width="100px">
              <el-radio-group v-model="addUserForm.limitedId">
                <el-radio :label="'NORMAL'">否</el-radio>
                <el-radio :label="'MANAGE'">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetAddForm('addUserForm')">取消</el-button>
          <el-button type="primary" @click="handleAddModal('addUserForm')"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="zaiWeiVisible" title="不在位记录表">
      <p style="margin-bottom: 15px;font-size: 16px;">
        <span>{{"姓名：" + this.selectedRow.userName}}</span>
        <span style="margin-left: 20px">{{"单位：" + this.selectedRow.deptName}}</span>
      </p>
      <el-table :data="tableData2" border :default-sort="{ prop: 'createTime', order: 'descending' }">
        <el-table-column prop="index" label="序号" width="80" align="center">
          <template #default="scope">
            <span>{{(pageInfo.currentPage - 1) * pageInfo.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="changeStatus" label="不在位状态" width="100" align="center">
          <template #default="scope">
            <span>{{ statusMap(scope.row.changeStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dayNum" label="天数" width="80" align="center" />
        <el-table-column prop="startTime" label="开始时间" width="180" align="center">
          <template #default="scope">
            <span>{{scope.row.startTime.slice(0,10)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="180" align="center">
          <template #default="scope">
            <span>{{scope.row.endTime.slice(0,10)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="commitUserName" label="提交人" width="100" align="center"/>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <span @click="handleDeleteRecord(scope.row)"
              :class="checkTimeIsPassed(scope.row.startTime) ? 'publish' : 'draft'"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="pageInfo2.total"
        :current-page="pageInfo2.currentPage"
        :page-size="pageInfo2.pageSize"
        @current-change="handleCurrentChange2"
        style="margin-top: 15px"
      >
      </el-pagination>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="zaiWeiVisible = false"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { statusMixin } from "@/assets/js/mixins.js";
export default {
  name: "PersonManage",
  data() {
    return {
      addVisible: false,
      personSituaton: {
        zaiwei: 12,
        qingjia: 2,
        jiediao: 2,
      },
      loading: false,
      editVisible: false,
      detailVisible: false,
      zaiWeiVisible: false,
      editForm: {
        userName: "王小虎",
        userCode: "admin",
        phoneNum: "18281373737",
        status: "zaiwei",
        originStatus: "",
        startDate: "",
        endDate: "",
      },
      addUserForm: {
        userName: "",
        userCode: "",
        phoneNum: "",
        department: {},
        limitedId: "NORMAL",
        position: {},
      },
      departmentList: [],
      positionList: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      pageInfo2: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],// 人员表格数据
      tableData2: [], // 不在位表格数据
      detailData: {}, // 在位统计
      notZaiWeiList: [],
      zhiBanList: [],
      addRules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, message: "长度应该大于两位", trigger: "blur" },
        ],
        userCode: [
          { required: true, message: "请输入用户账户", trigger: "blur" },
          { min: 4, max: 12, message: "长度应该在4至12位", trigger: "blur" },
        ],
        phoneNum: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { min: 6, max: 11, message: "请输入正确的电话号码", trigger: "blur" },
        ],
        department: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      selectedRow:{},//当前选中列
    };
  },
  mixins: [statusMixin],
  created() {
    this.getTableData(this.pageInfo.currentPage);
    this.$http.getDepartment().then((res) => {
      if (res.code == 200) {
        this.departmentList = res.data.data;
        this.addUserForm.department = res.data.data[0];
      }
    });

    this.$http.getPosition().then((res) => {
      if (res.code == 200) {
        this.positionList = res.data.data;
        this.addUserForm.position = res.data.data[0];
      }
    });
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
      this.editVisible = true;
      this.editForm = {
        userName: row.userName,
        userCode: row.userCode,
        phoneNum: row.phoneNum,
        status: row.status,
        originStatus: row.status,
        startDate: "",
        endDate: "",
      }
    },
    handleDelete(row) {
      this.$confirm("是否确认删除本条数据", "删除", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "warning",
        }).then(() => {
          // 网络请求
          this.$http.deleteUser(row.userId).then(res => {
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
    },
    handleView(index, row) {
      this.detailVisible = true;
      this.selectedRow = row;
      this.$http.queryUserDetail(row.userCode).then(res => {
        console.log(res)
        if(res.code == 200) {
          this.detailData = res.data.data.detailData ? res.data.data.detailData : {};
          this.notZaiWeiList = res.data.data.zaiWeiList;
          this.zhiBanList = res.data.data.scheduleList;
        }
      })
    },
    handleDetailOk() {
      this.detailVisible = false;
      this.detailData = {}; // 在位统计
      this.notZaiWeiList = [];
      this.zhiBanList = [];
    },
    resetEditForm(formName) {
      this.$refs[formName].resetFields(formName);
      this.editVisible = false;
    },
    publishEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.editUserStatus({
            targetUserCode: this.editForm.userCode,
            targetUserName: this.editForm.userName,
            startTime: this.editForm.startDate ? this.$moment(this.editForm.startDate).startOf().format("YYYY-MM-DD HH:mm:ss") : null,
            endTime: this.editForm.endDate ? this.$moment(this.editForm.endDate).endOf().format("YYYY-MM-DD HH:mm:ss") : null,
            originStatus: this.editForm.originStatus,
            changeStatus: this.editForm.status,
          }).then(res => {
            if(res.code == 200) {
              this.$message({
                message: "提交成功",
                type: "success",
                duration: 2000,
              });
              this.resetEditForm('editForm');
              this.getTableData(this.pageInfo.currentPage);
            }
          })
        }
      });
    },
    resetAddForm(formName) {
      this.$refs[formName].resetFields();
      this.addVisible = false;
    },
    handleAddModal(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.addUser({
              ...this.addUserForm,
              deptId: this.addUserForm.department.value,
              deptName: this.addUserForm.department.name,
              positionId: this.addUserForm.position.value,
              positionName: this.addUserForm.position.name,
            })
            .then((res) => {
              console.log(res);
              if (res.success) {
                this.$message({
                  message: "添加用户成功",
                  type: "success",
                  duration: 2000,
                });
                this.resetAddForm("addUserForm");
                this.getTableData(this.pageInfo.currentPage);
              }
            });
        } else {
          console.log("数据验证不通过");
          return false;
        }
      });
    },
    getTableData(currentPage) {
      this.loading = true;
      this.$http.findAllByPage({
          pageNum: currentPage,
          pageSize: this.pageInfo.pageSize,
        }).then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.tableData = res.data.datalist ? res.data.datalist.result : [];
            this.pageInfo.total = res.data.datalist ? res.data.datalist.total : 0;
          }
        });
    },
    // 不在位记录查询
    getTableData2(currentPage) {
      this.$http.findRecordByPage({
          pageNum: currentPage,
          pageSize: this.pageInfo.pageSize,
          userCode: this.selectedRow.userCode
        })
        .then((res) => {
          if (res.code == 200) {
            this.tableData2 = res.data.datalist ? res.data.datalist.result : [];
            this.pageInfo.total = res.data.datalist ? res.data.datalist.total : 0;
          }
        });
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getTableData(val);
    },
    handleCurrentChange2(val) {
      this.pageInfo2.currentPage = val;
      this.getTableData2(val);
    },
    handleViewZaiWei(row) {
      this.zaiWeiVisible = true;
      this.selectedRow = row;
      this.getTableData2(this.pageInfo2.currentPage);
    },
    handleDeleteRecord(row) {
      if(this.checkTimeIsPassed(row.startTime)) {
        return;
      } 
      this.$confirm("是否确认删除本条数据", "删除", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "warning",
        }).then(() => {
          // 网络请求
          this.$http.deletRecordById(row.recordId).then(res => {
            if(res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功",
                duration: 2000,
              });
              this.getTableData2(this.pageInfo2.currentPage);
            }
          })
      });
    },
    checkTimeIsPassed(startTime) {
      if(new Date() >= new Date(startTime)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.PersonManage {
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;

  .edit {
    color: #3894ff;
    cursor: pointer;
    margin: 0 5px;
  }

  .el-check-tag.is-checked {
    color: white;
    background-color: #409eff;
  }

  &_detail {
    &_row {
      border: 1px solid #e0e3ea;
      border-top: none;
      border-right: none;
      overflow: hidden;
      display: flex;
    }

    &_head {
      line-height: 80px;
      border-right: 1px solid #e0e3ea;
      border-top: 1px solid #e0e3ea;
      padding-left: 10px;
      width: 16.6%;
    }

    &_head2 {
      padding: 10px 0;
      line-height: 20px;
      border-right: 1px solid #e0e3ea;
      border-top: 1px solid #e0e3ea;
      padding-left: 10px;
      width: 16.6%;
      br {
        height: 1px;
      }
    }
    &_cellBox {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      &_cell {
        width: 33.334%;
        height: 40px;
        line-height: 40px;
        border-right: 1px solid #e0e3ea;
        border-top: 1px solid #e0e3ea;
        padding-left: 10px;
      }
    }

    &_cellBlock {
      height: 100%;
      overflow: hidden;
      &_cell {
        width: 33.33%;
        display: inline-block;
        border-right: 1px solid #e0e3ea;
        flex-shrink: 0;

        h4,
        p {
          height: 40px;
          line-height: 40px;
          border-top: 1px solid #e0e3ea;
          text-align: center;
        }
      }

      &_noData{
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #e0e3ea;
        border-right: 1px solid #e0e3ea;
        line-height: 80px;
      }
    }
  }

  .publish {
    color: #bbbbbb;
  }

  .draft {
    color: #3894ff;
    cursor: pointer;
  }
}
</style>