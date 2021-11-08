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
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="index" label="序号" width="80" />
        <el-table-column prop="userName" label="姓名" width="160" />
        <el-table-column prop="userPhone" label="联系电话" width="180" />
        <el-table-column prop="status" label="在位状态" width="120" />

        <el-table-column label="操作" width="180">
          <template #default="scope">
            <span @click="handleEdit(scope.$index, scope.row)" class="edit"
              >编辑</span
            >
            <span @click="handleView(scope.$index, scope.row)" class="edit"
              >查看</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="statistics" label="统计" />
      </el-table>
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
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="在位状态" label-width="100px">
              <el-check-tag
                :checked="editForm.status == 'zaiwei'"
                @click="editForm.status = 'zaiwei'"
                style="margin-right: 8px"
                >在位</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'xuexi'"
                @click="editForm.status = 'xuexi'"
                style="margin-right: 8px"
                >学习</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'chuchai'"
                @click="editForm.status = 'chuchai'"
                style="margin-right: 8px"
                >出差</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'qingjia'"
                @click="editForm.status = 'qingjia'"
                style="margin-right: 8px"
                >请假</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'xiujia'"
                @click="editForm.status = 'xiujia'"
                style="margin-right: 8px"
                >休假</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'lunxiu'"
                @click="editForm.status = 'lunxiu'"
                style="margin-right: 8px"
                >轮休</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'jiediao'"
                @click="editForm.status = 'jiediao'"
                style="margin-right: 8px"
                >借调</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'zhuyuan'"
                @click="editForm.status = 'zhuyuan'"
                style="margin-right: 8px"
                >住院</el-check-tag
              >
              <el-check-tag
                :checked="editForm.status == 'prihu'"
                @click="editForm.status = 'prihu'"
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
                type="datetime"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" label-width="100px">
              <el-date-picker
                v-model="editForm.endDate"
                type="datetime"
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
      title="王小虎(在位)"
      class="PersonManage_detail"
    >
      <el-row class="PersonManage_detail_row">
        <el-col :span="4" class="PersonManage_detail_head">
          <span>2021年</span>
        </el-col>
        <el-col :span="20" class="PersonManage_detail_cellBox">
          <div
            class="PersonManage_detail_cellBox_cell"
            v-for="(item, index) in detailList.list1"
            :key="index"
          >
            {{ item.discript }}：{{ item.value }}天
          </div>
        </el-col>
      </el-row>

      <div class="PersonManage_detail_row" style="margin: 20px 0">
        <el-col :span="4" class="PersonManage_detail_head">
          <span>请假情况</span>
        </el-col>
        <el-col :span="20" class="PersonManage_detail_cellBlock">
          <el-scrollbar :always="true">
            <div style="display: flex">
              <div
                class="PersonManage_detail_cellBlock_cell"
                v-for="(item, index) in detailList.list2"
                :key="index"
              >
                <h4>{{ item.discript }}</h4>
                <p>{{ item.value }}</p>
              </div>
            </div>
          </el-scrollbar>
        </el-col>
      </div>

      <div class="PersonManage_detail_row">
        <el-col :span="4" class="PersonManage_detail_head2">
          <span>值班情况(24天)<br />工 作 日：4周<br />非工作日：2天</span>
        </el-col>
        <el-col :span="20" class="PersonManage_detail_cellBlock">
          <el-scrollbar :always="true">
            <div style="display: flex">
              <div
                class="PersonManage_detail_cellBlock_cell"
                v-for="(item, index) in detailList.list3"
                :key="index"
              >
                <h4>{{ item.discript }}</h4>
                <p>{{ item.value }}</p>
              </div>
            </div>
          </el-scrollbar>
        </el-col>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailVisible = false"
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
      <el-form :model="addUserForm" ref="addUserForm" :rules="addRules" style="margin-right: 20px">
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
  </div>
</template>

<script>
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
      editVisible: false,
      detailVisible: false,
      editForm: {
        userName: "王小虎",
        userCode: "admin",
        phoneNum: "18281373737",
        status: "zaiwei",
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
      tableData: [
        {
          index: 1,
          userName: "王小虎",
          userPhone: "18281575657",
          status: "在位",
          statistics: "请假天数：2天、休假天数：10天、假期剩余：0",
        },
        {
          index: 2,
          userName: "王小虎",
          userPhone: "18281575657",
          status: "请假",
        },
        {
          index: 3,
          userName: "王小虎",
          userPhone: "18281575657",
          status: "学习",
        },
      ],
      detailList: {
        list1: [
          { discript: "请假次数", value: 12 },
          { discript: "值班次数", value: 12 },
          { discript: "休假天数", value: 12 },
          { discript: "出差次数", value: 12 },
          { discript: "在位天数", value: 12 },
          { discript: "假期剩余", value: 12 },
        ],
        list2: [
          { discript: "2021.10.19-2021.10.21", value: "2天" },
          { discript: "2021.10.07-2021.10.08", value: "2天" },
          { discript: "2021.09.12-2021.09.13", value: "2天" },
          { discript: "2021.09.12-2021.09.13", value: 12 },
          { discript: "2021.09.12-2021.09.13", value: 12 },
        ],
        list3: [
          { discript: "2021年第12周", value: "1周" },
          { discript: "2021.10.02-2021.10.03", value: "2天(节假日)" },
          { discript: "2021年第12周", value: "1周" },
          { discript: "2021年第12周", value: "1周" },
          { discript: "2021年第12周", value: "1周" },
          { discript: "假期剩余", value: 12 },
        ],
      },
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
    };
  },
  created() {
    this.$http.getDepartment().then((res) => {
      if (res.code == 200) {
        this.departmentList = res.data;
        this.addUserForm.department = res.data[0];
      }
    });

    this.$http.getPosition().then((res) => {
      if (res.code == 200) {
        this.positionList = res.data;
        this.addUserForm.position = res.data[0];
      }
    });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.editVisible = true;
    },
    handleView(index, row) {
      console.log(index, row);
      this.detailVisible = true;
    },
    resetEditForm(formName) {
      this.$refs[formName].resetFields(formName);
      this.editVisible = false;
    },
    publishEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("tijiao");
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
          console.log(this.addUserForm);
          this.$http.addUser({ ...this.addUserForm,
          deptId:this.addUserForm.department.value,
          deptName: this.addUserForm.department.name,
          positionId: this.addUserForm.position.value,
          positionName: this.addUserForm.position.name}).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                message: "添加用户成功",
                type: "success",
                duration: 2000,
              });
              this.resetAddForm();
            } else {
              this.$message({
                message: res.message,
                type: "error",
                duration: 2000,
              });
            }
          });
        } else {
          console.log("数据验证不通过");
          return false;
        }
      });
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
      height: 80px;
      overflow: hidden;
    }

    &_head {
      height: 80px;
      line-height: 80px;
      border-right: 1px solid #e0e3ea;
      border-top: 1px solid #e0e3ea;
      padding-left: 10px;
      width: 16.6%;
    }

    &_head2 {
      height: 80px;
      padding-top: 10px;
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
    }
  }
}
</style>