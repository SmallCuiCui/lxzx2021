<template>
  <div class="workColect">
    <el-row class="workColect_fillter">
      <el-col :span="16">
        <div @click="fillterType('day')" :class="workType=='day' ? 'checked' : ''" class="workColect_fillter_btn">日工作</div>
        <div @click="fillterType('week')" :class="workType=='week' ? 'checked' : ''" class="workColect_fillter_btn">周工作</div>
        <div @click="fillterType('year')" :class="workType=='year' ? 'checked' : ''" class="workColect_fillter_btn">年度工作</div>
        <el-select
          v-model="danweiValue"
          placeholder="Select"
          class="workColect_fillter_select"
          @change="getTableDatas"
        >
          <el-option
            v-for="item in danweiList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="selectDate"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
          @change="getTableDatas"
        ></el-date-picker>
      </el-col>
    </el-row>

    <div class="workColect_noDanwei">
      <el-scrollbar class="workColect_noDanwei_box">
        <el-row
          class="workColect_noDanwei_item"
          v-for="(item, index) in workList"
          :key="index"
        >
        <table v-if="danweiValue == 'all'" class="workColect_noDanwei_item_table1" v-loading="loading">
          <tr><td>{{ item.workTime }}</td></tr>
          <tr>
            <td>科室</td>
            <td
              v-for="v in item.workList"
              :key="v.workId"
            >{{v.deptName}}</td>
          </tr>
          <tr>
            <td>工作内容</td>
            <td
              v-for="v in item.workList"
              :key="v.workId"
              v-html="v.workContent"
            ></td>
          </tr>
          <tr v-if="item.workType=='week'">
            <td>下周计划</td>
            <td
              v-for="v in item.workList"
              :key="v.workId"
              v-html="v.workContentPlan"
            ></td>
          </tr>
        </table>

        <table v-else class="workColect_noDanwei_item_table2">
          <tr>
            <td>日期</td>
            <td>工作内容</td>
            <td>类型</td>
            <td>填报人</td>
            <td>提交时间</td>
          </tr>
          <tr>
            <td :rowspan="item.workType == 'week' ? 2 : 1" style="width: 84px">{{item.workTime}}</td>
            <td v-html="item.workContent"></td>
            <td style="width: 130px">{{item.workType == "day" ? "日工作" : item.workType == "week" ? "周工作(本周完成)" : "年度工作"}}</td>
            <td :rowspan="item.workType == 'week' ? 2 : 1" style="width: 150px">{{item.fillUserNames}}</td>
            <td :rowspan="item.workType == 'week' ? 2 : 1" style="width: 150px">{{item.commitTime}}</td>
          </tr>

          <tr v-if="item.workType == 'week'">
            <td v-html="item.workContentPlan"></td>
            <td>{{item.workType == "day" ? "日工作" : item.workType == "week" ? "周工作(下周计划)" : "年度工作"}}</td>
          </tr>
        </table>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectDate: "",
      workType: "",
      danweiValue: "all",
      loading: false,
      shortcuts: [
        {
          text: "最近一周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "最近一月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "最近三个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
      workList: [],
      danweiList: [],
    };
  },
  created() {
    this.getTableDatas();

    this.$http.getDepartment().then(res => {
      if(res.code == 200) {
        this.danweiList = res.data.data;
        // 前面插入数据
        this.danweiList.unshift({
          value: "all",
          name: "全部",
        })
      }
    })
  },
  methods: {
    fillterType(workType) {
      if(this.workType == workType){
        this.workType = "";
      } else {
        this.workType = workType;
      }
      this.getTableDatas();
    },
    getTableDatas() {
      this.loading = true;
      this.$http.getWorkColectList({
        workType: this.workType,
        deptId: this.danweiValue == "all" ? null : this.danweiValue,
        startTime: this.selectDate ? this.$moment(this.selectDate[0]).startOf("day").format("YYYY-MM-DD HH:mm:ss") : null,
        endTime: this.selectDate ? this.$moment(this.selectDate[1]).endOf("day").format("YYYY-MM-DD HH:mm:ss") : null,
      }).then(res => {
        this.loading = false;
        if(res.code == 200) {
          this.workList = res.data.data;
        }
      })
    }
  },
};
</script>

<style lang="scss">
.workColect {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .el-range-separator {
    width: 10%;
  }
  .el-row {
    width: 100%;
  }

  &_fillter {
    padding-bottom: 10px;
    height: 50px;

    &_btn{
      display: inline-block;
      line-height: 1;
      min-height: 40px;
      white-space: nowrap;
      cursor: pointer;
      background: white;
      border: 1px solid #dcdfe6;
      border-color: #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      margin-right: 10px;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
    .checked{
      color: #8cc5ff;
      background-color: #ecf5ff;
      border-color: #d9ecff;
    }
    &_select {
      margin-left: 10px;
      width: 100px;
      .el-input__inner {
        background: #409eff;
        color: #ffffff;
      }
    }
  }

  &_noDanwei {
    flex: 1;
    overflow: hidden;

    &_box {
      height: 100%;
      
    }
    &_item {
      margin-bottom: 20px;
      font-size: 14px;
      overflow: hidden;


      table {
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        width: 100%;
				margin: 0 auto;
				border-spacing: 0;
				border-collapse: collapse;
        tr{
          td{
            border: 1px solid #dcdfe6;
            min-height: 30px;
            line-height: 30px;
            white-space: pre-wrap;
            padding-left: 5px;
          }
        }
      }

      &_table1{
        tr{
          td:first-child{ 
            width: 84px;
            text-align: center;
          }
        }
        tr:first-child{
          td:first-child{ 
            border-right: none;;
          }
        }
      }
    }

  }
}
</style>