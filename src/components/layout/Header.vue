<template>
  <div class="header">
    <div class="header_top">
      <div class="header_top_notice">
        <i class="el-icon-message-solid"></i>
      </div>

      <div class="header_top_userInfo">
        <el-dropdown>
          <span class="el-dropdown-link">
            admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item @click="dialogVisible = true"
                >修改密码</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-dialog
          v-model="dialogVisible"
          title="修改密码"
          width="30%"
          destroy-on-close
        >
          <el-form
            :model="passwordForm"
            :rules="rules"
            ref="passwordForm"
            class="demo-ruleForm"
          >
            <el-form-item
              label="原始密码"
              :label-width="formLabelWidth"
              prop="pass"
            >
              <el-input
                v-model="passwordForm.orginPassword"
                show-password
                autocomplete="off"
                placeholder="请输入原始密码"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="修改密码"
              :label-width="formLabelWidth"
              prop="pass"
            >
              <el-input
                v-model="passwordForm.newPassword"
                show-password
                autocomplete="off"
                placeholder="请输入修改密码"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="确认密码"
              :label-width="formLabelWidth"
              prop="checkPass"
            >
              <el-input
                v-model="passwordForm.confPassword"
                show-password
                autocomplete="off"
                placeholder="请输入确认密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="resetForm('passwordForm')">取消</el-button>
              <el-button type="primary" @click="handleModal('passwordForm')"
                >确认</el-button
              >
            </span>
          </template>
        </el-dialog>
      </div>

      <div class="header_top_out">
        <span @click="loginOut">退出登录</span>
      </div>
    </div>

    <div class="header_bottom">
      <div class="header_bottom_left">当前位置：<span>控制台</span></div>
      <div class="header_bottom_right">2021.10.21 21:57:42 周四</div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "Header",
  data() {
    return {
      dialogVisible: false,
      passwordForm: {
        orginPassword: "",
        newPassword: "",
        confPassword: "",
      },
      formLabelWidth: "80px",
      rules: {
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度应该在6至12位", trigger: "blur" },
        ],
        checkPass: [
          {
            required: true,
            message: "两次输入密码不一致",
            trigger: "blur",
            validator: (rule, value) => value === this.password.newPassword,
          },
        ],
      },
    };
  },
  methods: {
    handleModal(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          ElMessage({
            message: "密码修改成功",
            type: "success",
            duration: 2000,
          });
          this.dialogVisible = false;
        } else {
          console.log("数据验证不通过");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    loginOut() {
        this.$confirm("是否确认退出登录", "退出", {
          'cancel-button-text': "取消",
          'confirm-button-text': "确认",
        }).then(()=>{
          this.$router.push("/login");
        })
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  background: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;

  &_top {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: end;
    align-items: center;

    &_notice {
      margin-right: 30px;
      :hover {
        cursor: pointer;
      }
    }

    &_userInfo {
      margin-right: 20px;
      color: black;
    }

    &_out {
      font-size: 14px;
      padding: 0 30px;
      border-left: 1px solid #bbbbbb;
      margin-right: 10px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }

  &_bottom {
    display: flex;
    justify-content: space-between;
    color: black;
    height: 40px;
    line-height: 40px;
    padding-right: 40px;
    padding-left: 20px;
    background: #f2f6fc;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>