<template>
  <div :class="isFull ? 'dashbord fullCss' : 'dashbord'">
    <div class="dashbord_condition" v-if="currentShow == 1">
      <div class="dashbord_condition_row">
        <div class="dashbord_condition_row_full">
          <img
            src="../../assets/icons/nofull.png"
            @click="isFull = false"
            v-if="isFull"
          />
          <img
            src="../../assets/icons/fullScreen.png"
            @click="isFull = true"
            v-else
          />
        </div>
        <div class="dashbord_condition_row_title">人员情况</div>
      </div>
      <div
        class="dashbord_condition_row"
        v-for="(danwei, index) in personList"
        :key="index"
      >
        <div class="dashbord_condition_row_head">{{ danwei.deptName }}</div>
        <ul class="dashbord_condition_row_ul">
          <li
            v-for="item in danwei.userList"
            :key="item.userId"
            class="dashbord_condition_row_ul_item"
          >
            <div class="dashbord_condition_row_ul_item_icon">
              <img
                :src="require('../../assets/icons/' + item.status.toLowerCase() + '.png')"
              />
            </div>
            <div class="dashbord_condition_row_ul_item_name">
              {{ item.userName }}
            </div>
          </li>
        </ul>
      </div>
      <div class="dashbord_condition_row">
        <div class="dashbord_condition_row_head">说明</div>
        <ul class="dashbord_condition_row_ul">
          <li
            v-for="item in statusList"
            :key="item.code"
            class="dashbord_condition_row_ul_item"
          >
            <div class="dashbord_condition_row_ul_item_icon">
              <img
                :src="
                  require('../../assets/icons/' +
                    item.code.toLowerCase() +
                    '.png')
                "
              />
            </div>
            <div class="dashbord_condition_row_ul_item_name">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </div>
      <div class="dashbord_condition_row">
        <div class="dashbord_condition_row_head">在位统计</div>
        <ul class="dashbord_condition_row_ul">
          <li class="dashbord_condition_row_ul_item">
            <div class="dashbord_condition_row_ul_item_condition">{{"在位：" + zaiWeiCondition.zaiWeiNum}}</div>
          </li>
          <li class="dashbord_condition_row_ul_item">
            <div class="dashbord_condition_row_ul_item_condition">{{"学习：" + zaiWeiCondition.xueXiNum}}</div>
          </li>
          <li class="dashbord_condition_row_ul_item">
            <div class="dashbord_condition_row_ul_item_condition">{{"出差：" + zaiWeiCondition.chuChaiNum}}</div>
          </li>
          <li class="dashbord_condition_row_ul_item">
            <div class="dashbord_condition_row_ul_item_condition">{{"请假：" + zaiWeiCondition.qingJiaNum}}</div>
          </li>
          <li class="dashbord_condition_row_ul_item">
            <div class="dashbord_condition_row_ul_item_condition">{{"轮休：" + zaiWeiCondition.lunXiuNum}}</div>
          </li>
          <li class="dashbord_condition_row_ul_item">
            <div class="dashbord_condition_row_ul_item_condition">{{"借调：" + zaiWeiCondition.jieDiaoNum}}</div>
          </li>
          <li class="dashbord_condition_row_ul_item">
            <div class="dashbord_condition_row_ul_item_condition">{{"住院：" + zaiWeiCondition.zhuYuanNum}}</div>
          </li>
          <li class="dashbord_condition_row_ul_item">
            <div class="dashbord_condition_row_ul_item_condition">{{"陪护：" + zaiWeiCondition.peiHuNum}}</div>
          </li>
          <li class="dashbord_condition_row_ul_item">
            <div class="dashbord_condition_row_ul_item_condition">{{"休假：" + zaiWeiCondition.xiuJiaNum}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="dashbord_zhiban" v-if="currentShow == 2">
      <h2>2021年10月份第3周执勤值班表</h2>
      <table border="1">
        <tr>
          <th :colspan="2">后台执勤</th>
          <th colspan="6">本级xx值班</th>
        </tr>
        <tr>
          <td>席位1</td>
          <td>席位2</td>
          <td>在位主管</td>
          <td>值班领导</td>
          <td>值班员</td>
          <td>备班员</td>
          <td>勤务保障</td>
          <td>驾驶员</td>
        </tr>
        <tr>
          <td>{{thisWeekZB.lianzhi1 && thisWeekZB.lianzhi1}}</td>
          <td>{{thisWeekZB.lianzhi2 && thisWeekZB.lianzhi2}}</td>
          <td>{{thisWeekZB.zhuGuan && thisWeekZB.zhuGuan}}</td>
          <td>{{thisWeekZB.lingDao && thisWeekZB.lingDao}}</td>
          <td>{{thisWeekZB.zhiBanYuan && thisWeekZB.zhiBanYuan}}</td>
          <td>{{thisWeekZB.beiBanYuan && thisWeekZB.beiBanYuan}}</td>
          <td>{{thisWeekZB.qinWu && thisWeekZB.qinWu}}</td>
          <td>{{thisWeekZB.jiaShiYuan && thisWeekZB.jiaShiYuan}}</td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="7" style="padding: 10px 20px;">
            <p style="line-height: 40px;">①执勤值班人员原则上不得顶岗上班，遇特殊情况需替换时应报值班领导审批；</p>
            <p style="line-height: 40px;">②各级值班员要保持在位在岗，遇到情况需在12分钟之内到位；</p>
            <p style="line-height: 40px;">③xxx本级xx值班电话：507300。</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="dashbord_notice" v-if="currentShow == 3">
      <h2 class="dashbord_notice_title">{{ noticeScreen.noticeTitle }}</h2>
      <p class="dashbord_notice_time">
        <span>{{ noticeScreen.publishTime }}</span>
        <span>{{ noticeScreen.createUserName }}</span>
      </p>
      <p class="dashbord_notice_content">{{ noticeScreen.noticeContent }}</p>
    </div>
  </div>
</template>

<script>
import { statusMixin } from "@/assets/js/mixins.js";
export default {
  mixins: [statusMixin],
  data() {
    return {
      currentShow: 1, //1.人员情况、2.值班安排、3.投屏通知
      personList: [],
      zaiWeiCondition: {}, // 本周值班情况
      isFull: false,
      noticeScreen: {},// 投屏通知--后端只获取了一条
      ws: null,
      userInfo: {},
      thisWeekZB: {}, // 本周值班情况
      isDestroyed: false, // 页面是否销毁
      lockReconnect: false, // 是否真正建立连接
      timeout: 20000, // 20秒一次心跳
      timeoutObj: null, // 心跳心跳倒计时
      serverTimeoutObj: null, // 心跳倒计时
      timeoutnum: null, // 断开 重连倒计时
    };
  },
  created() {
    var userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  },
  mounted() {
    this.timer = setInterval(this.changeShow, 1000 * 10);
    let that = this;
    document.addEventListener("keyup", function (e) {
      // esc键
      if (e.keyCode == 27) {
        that.isFull = false;
      }
    });

    this.getScreenNotice();

    // 初始化websocket
    this.initWebSocket();
  },
  beforeUnmount() {
    clearInterval(this.timer);
    this.isDestroyed = true;
    this.timeoutnum && clearTimeout(this.timeoutnum);
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.ws.close();
  },
  methods: {
    changeShow() {
      this.currentShow++;
      if (this.currentShow > 3) {
        this.currentShow = 1;
      }
      // 重新获取本周值班安排
      if(this.currentShow == 2) {
        this.getWeekZhiBan();
      }
    },
    getScreenNotice() {
      this.$http.queryScreenNotice().then((res) => {
        if (res.code == 200) {
          this.noticeScreen = res.data.datalist[0];
        }
      });
    },
    getWeekZhiBan() {
      this.$http.getThisWeekZhiBan().then(res => {
        if(res.code) {
          this.thisWeekZB = res.data.data;
        }
      })
    },
    initWebSocket() {
      const _this = this;
      var websocketUrl  = "ws://localhost:8888/getZaiWei/" + this.userInfo.userCode;
      if (window.WebSocket) {
        _this.ws = new WebSocket(websocketUrl);
        _this.ws.onopen = function () {
          console.log("服务器连接成功");
          _this.start();
        };
        _this.ws.onclose = function (ev) {
          console.log("服务器连接关闭" + ev.reason);
          _this.reconnect();
        };
        _this.ws.onerror = function () {
          console.log("服务器连接出错");
          _this.reconnect();
        };
        _this.ws.onmessage = function (e) {
          _this.reset(); // 心跳重置
          // 接收服务器返回的数据
          const resData = JSON.parse(e.data);
          // console.log(resData)
          if (resData) {
            _this.personList = resData.zaiWeiList;
            _this.zaiWeiCondition = resData;
            delete _this.zaiWeiCondition.zaiWeiList;
            return;
          }
        };
      }
    },
    // 重新连接
    reconnect() {
      var self = this;
      if (self.lockReconnect || self.isDestroyed) {
        return;
      }
      console.log("重新连接。。。");
      self.lockReconnect = true;
      // 没连接上会一直重连，间隔5秒连接一次
      self.timeoutnum && clearTimeout(self.timeoutnum);
      self.timeoutnum = setTimeout(function () {
        // 新连接
        self.initWebSocket();
        self.lockReconnect = false;
      }, this.timeout);
    },
    // 重置心跳
    reset() {
      var self = this;
      // 清除时间
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      // 重启心
      self.start();
    },
    // 开启心跳
    start() {
      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(function () {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息
        if (self.ws.readyState === 1) {
          // 判断连接是否正常
          const ojb_params = {
            isHeartbeat: true,
            userWsId: self.userInfo.userCode + "-用户",
            contentText: "心跳中",
          };
          self.ws.send(JSON.stringify(ojb_params));
        } else {
          // 否则重连
          self.reconnect();
        }
        self.serverTimeoutObj = setTimeout(function () {
          self.ws.close(); // 超过3秒没收到心跳消息关闭重连
        }, 3000);
      }, 60 * 1000);
    },
  },
};
</script>

<style lang="scss" scope>
.dashbord {
  width: 100%;
  height: 100%;
  padding: 50px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;;
  & > div {
    width: 100%;
    // height: 100%;
  }
  &_condition {
    border: 1px solid #cccccc;
    overflow: hidden;

    &_row {
      width: 100%;
      display: flex;
      text-align: center;
      border-top: 1px solid #cccccc;
      &:first-child {
        border-top: none;
      }
      &_full {
        width: 100px;
        height: 50px;
        border-right: 1px solid #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 36px;
          cursor: pointer;
        }
      }
      &_title {
        flex: 1;
        text-align: center;
        line-height: 49px;
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 20px;
      }
      &_head {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #cccccc;
      }
      &_ul {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        li:nth-child(7) {
          border-right: 1px solid white;
        }
        &_item {
          width: 14.28%;
          height: 40px;
          line-height: 40px;
          border-right: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
          display: flex;
          &_icon {
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          &_name {
            flex: 1;
            border-left: 1px solid #cccccc;
          }
          &_condition{
            flex: 1;
          }
        }
      }
    }
  }

  &_zhiban {
    padding: 120px 40px;
    text-align: center;
    h2 {
      font-size: 24px;
      margin-bottom: 60px;
      letter-spacing: 5px;
    }
    table {
      border-radius: 4px;
      width: 100%;
      margin: 0 auto;
      border-spacing: 0;
      border-collapse: collapse;
      tr:first-child {
        height: 50px;
        line-height: 50px;
        letter-spacing: 2px;
      }
      tr:nth-child(2) {
        height: 60px;
        line-height: 60px;
      }
      tr:nth-child(3),
      tr:nth-child(4) {
        height: 100px;
        line-height: 100px;
      }
      tr:nth-child(4) td {
        text-align: left;
        padding-left: 20px;
      }
    }
  }

  &_notice {
    padding: 150px;
    text-align: center;
    &_title {
      font-size: 24px;
      margin-bottom: 10px;
      letter-spacing: 5px;
    }
    &_time {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      line-height: 24px;
      span {
        font-size: 14px;
      }
      span:first-child {
        margin-right: 20px;
      }
    }
    &_content {
      font-size: 20px;
      white-space: pre-wrap;
      word-break: break-word;
      // text-indent: 2em;
      word-break: normal;
      text-align: left;
      line-height: 30px;
      letter-spacing: 3px;
    }
  }
}
// 全屏样式
.fullCss {
  position: absolute;
  top: 0;
  left: 0;
}
</style>