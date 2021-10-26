<template>
  <div class="header">
    <div class="header_top">
      <div class="header_top_notice">
        <i class="el-icon-arrow-down"></i>
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
          <el-form :model="password" :rules="rules" ref="passwordForm">
            <el-form-item label="原始密码" :label-width="formLabelWidth">
              <el-input
                v-model="password.orginPassword"
                show-password
                autocomplete="off"
                placeholder="请输入原始密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="修改密码" :label-width="formLabelWidth">
              <el-input
                v-model="password.newPassword"
                show-password
                autocomplete="off"
                placeholder="请输入修改密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth">
              <el-input
                v-model="password.confPassword"
                show-password
                autocomplete="off"
                placeholder="请再次输入修改密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleModal(false)">取消</el-button>
              <el-button type="primary" @click="handleModal(true)"
                >确认</el-button
              >
            </span>
          </template>
        </el-dialog>
      </div>

      <div class="header_top_out">退出登录</div>
    </div>

    <div class="header_bottom">
      <div class="header_bottom_left">当前位置：<span>控制台</span></div>
      <div class="header_bottom_right">2021.10.21 21:57:42 周四</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      password: {
        orginPassword: "",
        newPassword: "",
        confPassword: "",
      },
      formLabelWidth: "80px",
      rules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 12,
            message: "长度应该在6至12位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleModal: (tag) => {
      console.log(tag);
      if (tag) {
        this.$refs['passwordForm'].validate((valid) => {
          if (valid) {
            alert("修改成功");
          } else {
            console.log("数据验证不通过");
            return false;
          }
        });
      } else {
        this.$refs["passwordForm"].resetFields();
        this.data.dialogVisible = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  background: #ffffff;

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
      font-size: 16px;
      padding: 0 30px;
      border-left: 1px solid #bbbbbb;
      margin-right: 10px;
      height: 30px;
      line-height: 30px;
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
  }
}
</style>