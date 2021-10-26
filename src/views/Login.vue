<template>
  <div class="bg_container">
    <div class="form_container">
      <div class="form_left">
        <h2 class="title">值班子系统</h2>
        <p>
          值班系统介绍内容，包含人员在位情况、人员管理、每日及每周工作上报汇总等功能集成
        </p>
        <img src="../assets/images/login_left.png" />
      </div>
      <div class="form_right">
        <div class="title_container">
          <h2 class="title_h">欢迎登录</h2>
        </div>

        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item prop="userName">
            <el-icon color="#3A62D7" :size="24"><avatar /></el-icon>
            <el-input
              v-model="ruleForm.userName"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-icon color="#3A62D7" :size="24"><lock /></el-icon>
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-checkbox name="type" v-model="ruleForm.checked"></el-checkbox>
            <span style="margin-left: 10px; font-size: 14px">记住密码</span>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          style="width: 100%; font-size: 20px"
          >登 录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "@element-plus/icons/lib";
import lock from "@element-plus/icons/lib";

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        userName: "",
        password: "",
        checked: true
      },
      rules: {
        userName: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 4,
            message: "长度不小于4个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 12,
            message: "密码长度在6到12之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    avatar,
    lock,
  },
  methods: {
    submitForm(formName) {
      console.log(this.$router);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>


<style lang="scss">
.bg_container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/bg_login.png");
  display: flex;
  align-items: center;
  justify-content: center;

  .form_container {
    width: 850px;
    height: 400px;
    background: #ffffff;
    display: flex;
    .form_left {
      width: 400px;
      background: #3a62d7;
      color: white;
      font-family: Arial;
      padding: 40px 20px 0;

      .title {
        font-size: 22px;
        text-align: center;
        font-weight: 400;
      }

      p {
        font-size: 18px;
        margin-top: 20px;
      }

      img {
        width: 100%;
      }
    }
    .form_right {
      flex: 1;
      padding: 40px;

      .title_container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        .title_h {
          text-align: center;
          font-weight: 400;
          font-size: 22px;
          border-bottom: 2px solid #3a62d7;
          display: inline-block;
        }
      }

      .el-form-item{
          border-bottom: 1px solid #d3d3d3;
          &:last-child {
          border: none;
        }
      }

      .el-form-item__content {
        display: flex;
        align-items: center;

        .el-icon {
          border-right: 1px solid #3a62d7;
        }

        .el-input {
          flex: 1;

          input {
            border: none;
            border-radius: 0%;
          }
        }

        .el-form-item__error {
          margin-left: 40px;
        }
      }
    }
  }
}
</style>