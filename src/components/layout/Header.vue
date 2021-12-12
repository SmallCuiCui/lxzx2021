<template>
  <div class="header">
    <div class="header_top">
      <div class="header_top_left">
        <span v-html="timeString"></span>
      </div>
      <div class="header_top_right">
        <div class="header_top_notice">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="position:relative;padding: 3px;"> 
            <i class="el-icon-message-solid"></i>
            <span v-if="haveUnRead != 0" class="numRed">{{haveUnRead}}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu :infinite-scroll-immediate="false" v-infinite-scroll="loadMoreNotice" style="height: 120px;overflow: auto">
              <el-dropdown-item v-for="(item, index) in noticeList" :key="index">
                <div class="header_top_notice_item" @click="showDetail(item)">
                  <p class="header_top_notice_item_title">{{item.noticeTitle}}</p>
                  <span :class="item.read ? '' : 'dot'"></span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-dialog 
        v-model="noticeDetailVisible" 
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :center="true">
        <div>
          <p class="detailModal_info">
            <span>发布人：{{detailNotice.createUserName}}</span>
            <span>发布时间：{{detailNotice.publishTime}}</span>
          </p>
          <p class="detailModal_content">{{detailNotice.noticeContent}}</p>
        </div>
        <template #title>
          <p class="detailModal_title">{{detailNotice.noticeTitle}}</p>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="handleRead()">确认</el-button>
          </span>
        </template>
      </el-dialog>

      <div class="header_top_userInfo">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ userInfo.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
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
              prop="orginPassword"
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
              prop="newPassword"
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
              prop="confPassword"
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
    </div> 
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "Header",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      haveUnRead: 0,
      noticeDetailVisible: false,
      detailNotice: {},
      pageNum: 1,//请求第一页，默认十条
      totalPage: 0,
      userInfo: {
        userCode: "admin",
        userName: "",
      },
      noticeList:[],
      passwordForm: {
        orginPassword: "",
        newPassword: "",
        confPassword: "",
      },
      formLabelWidth: "80px",
      rules: {
        orginPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度应该在6至12位", trigger: "blur" },
        ],
        confPassword: [
          // { required: true, message: "两次输入密码不一致", trigger: "blur", validator: (rule, value) => value === this.password.newPassword},
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      timeString: ""
    };
  },
  created() {
    var userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
    this.loadNotice();
  },
  mounted() {
    this.timer = setInterval(()=>{
      this.timeString = this.$moment().format("YYYY-MM-DD HH:mm:ss") + "&nbsp;&nbsp;&nbsp;&nbsp;周" + this.num2word(this.$moment().weekday());
    }, 1000);
  },
  methods: {
    showDetail(notice) {
      this.detailNotice = notice;
      this.noticeDetailVisible = true;
    },
    handleModal(formName) {
      console.log(formName);
      this.$refs[formName].validate((valid) => {
        console.log("修改密码");
        if (valid) {
          this.$http
            .changePassword({
              userCode: this.userInfo.userCode,
              orginPassword: this.passwordForm.orginPassword,
              newPassword: this.passwordForm.newPassword,
            })
            .then((res) => {
              if (res.code == 200) {
                ElMessage({
                  message: "密码修改成功，请重新登录",
                  type: "success",
                  duration: 2000,
                });
                this.resetForm("passwordForm");
              } else {
                ElMessage({
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    loginOut() {
      this.$confirm("是否确认退出登录", "退出", {
        cancelButtonText: "取消",
        confirmButtonText: "确认",
        type: "warning",
      }).then(() => {
        // 清除token信息
        this.$http.loginOut().then((res) => {
          if (res.code == 200) {
            localStorage.removeItem("Authorization");
            this.$router.push("/login");
          }
        });
      });
    },
    loadMoreNotice() {
      this.pageNum ++;
      // 请求到了最大页数时不再请求
      if(this.pageNum > this.totalPage) {
        return;
      }
      this.loadNotice();
    },
    loadNotice() {
      this.$http.queryAllPublishNotice(this.pageNum).then(res => {
        if(res.code == 200) {
          this.noticeList = this.noticeList.concat(res.data.datalist.result);
          res.data.datalist.result.forEach((value) => {
            if(!value.read){
              this.haveUnRead++;
            }
          })
          this.totalPage = res.data.datalist.page;
          // 第一条未读，默认弹框显示
          if(this.noticeList[0].read == false) {
            this.detailNotice = this.noticeList[0];
            this.noticeDetailVisible = true;
          }
        }
      })
    },
    handleRead() {
      if(this.detailNotice.read == false) {
        let noticeId = this.detailNotice.noticeId;
        // 接口请求阅读
        this.$http.handleUserRead({
          userCode: this.userInfo.userCode,
          noticeId,
          readUserCodes: this.detailNotice.readUserCodes
        }).then(res => {
          if(res.code == 200) {
            var newList = this.noticeList.map(item => {
              if(item.noticeId == noticeId) {
                item.read = true;
              }
              return item;
            })
            this.noticeList = newList;
            this.haveUnRead--;
          }
        })
      }
      this.noticeDetailVisible = false;
      this.detailNotice = {};
    },
    num2word(num) {
      switch(num) {
        case 0: return "一";
        case 1: return "二";
        case 2: return "三";
        case 3: return "四";
        case 4: return "五";
        case 5: return "六";
        case 6: return "七";
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="scss">
.header {
  background: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  background-color: #ffffff;
  height: 100%;

  &_top {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &_left{
      padding-left: 30px;
      font-size: 16px;
    }

    &_right{
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    &_notice {
      margin-right: 30px;
      :hover {
        cursor: pointer;
      }
      .el-icon-message-solid{
        font-size: 16px;
      }

      .numRed{
        display: inline-block;
        width: 14px;
        height: 14px;
        text-align: center;
        position: absolute;
        top: -5px;
        right: -10px;
        font-size: 12px;
        color: red;
        border: 1px solid red;
        border-radius: 50%;
      }

      &_item{
        height: 32px;
        line-height: 32px;
        position: relative;

        .dot{
          display: inline-block;
          position: absolute;
          top: 5px;
          right: 10px;
          width: 5px;
          height: 5px;
          background-color: red;
          border-radius: 10px;
        }

        &_title{
          width: 140px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    .detailModal_info{
        display: flex;
        width: 100%;
        justify-content: space-around;
        height: 28px;
        line-height: 24px;
      }
      .detailModal_title{
        text-align: center;
        font-weight: 400;
        font-size: 22px;
      }

      .detailModal_content{
        text-indent:2em;
        line-height: 32px;
        font-size: 16px;
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
}
.el-dialog__body{
  padding-top: 0 !important;
}

</style>