<template>
  <div class="workColect">
    <el-row class="workColect_fillter">
      <el-col :span="16">
        <el-button @click="fillterType('day')">日工作</el-button>
        <el-button @click="fillterType('week')">周工作</el-button>
        <el-button @click="fillterType('year')">年度工作</el-button>
        <el-select
          v-model="danweiValue"
          placeholder="Select"
          class="workColect_fillter_select"
        >
          <el-option
            v-for="item in danweiList"
            :key="item.danweiCode"
            :label="item.danweiName"
            :value="item.danweiCode"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="dateType"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-col>
    </el-row>

    <div class="workColect_noDanwei">
      <el-scrollbar class="workColect_noDanwei_box" height="400px">
        <el-row
          class="workColect_noDanwei_item"
          v-for="(item, index) in workList"
          :key="index"
        >
          <el-row class="workColect_noDanwei_date">
            <el-col :span="24">{{ item.workDate }}</el-col>
          </el-row>
          <el-row>
            <el-col
              :span="24 / item.danweiContents.length"
              v-for="v in item.danweiContents"
              :key="v.danWeiName"
            >
              <h2 class="workColect_noDanwei_danwei">{{ v.danWeiName }}</h2>
              <p class="workColect_noDanwei_content">{{ v.content }}</p>
            </el-col>
          </el-row>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateType: "",
      danweiValue: "quanbu",
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
      workList: [
        {
          workDate: "2021.10.19(当日)",
          danweiContents: [
            {
              danWeiName: "单位1",
              content: "内容1",
            },
            {
              danWeiName: "单位2",
              content: "内容3",
            },
            {
              danWeiName: "单位4",
              content: "内容4",
            },
            {
              danWeiName: "单位3",
              content: "内容3",
            },
          ],
        },
        {
          workDate: "2021.10.19(当日)",
          danweiContents: [
            {
              danWeiName: "单位1",
              content: "内容1",
            },
            {
              danWeiName: "单位2",
              content: "内容3",
            },
            {
              danWeiName: "单位4",
              content: "内容4",
            },
            {
              danWeiName: "单位3",
              content: "内容3",
            },
          ],
        },
        {
          workDate: "2021.10.19(当日)",
          danweiContents: [
            {
              danWeiName: "单位1",
              content: "内容1",
            },
            {
              danWeiName: "单位2",
              content: "内容3",
            },
            {
              danWeiName: "单位4",
              content: "内容4",
            },
            {
              danWeiName: "单位3",
              content: "内容3",
            },
          ],
        },
        {
          workDate: "2021.10.19(当日)",
          danweiContents: [
            {
              danWeiName: "单位1",
              content: "内容1",
            },
            {
              danWeiName: "单位2",
              content: "内容3",
            },
            {
              danWeiName: "单位4",
              content: "内容4",
            },
            {
              danWeiName: "单位3",
              content: "内容3",
            },
          ],
        },
        {
          workDate: "2021.10.19(当日)",
          danweiContents: [
            {
              danWeiName: "单位1",
              content: "内容1",
            },
            {
              danWeiName: "单位2",
              content: "内容3",
            },
            {
              danWeiName: "单位4",
              content: "内容4",
            },
            {
              danWeiName: "单位3",
              content: "内容3",
            },
          ],
        },
        {
          workDate: "2021.10.19(当日)",
          danweiContents: [
            {
              danWeiName: "单位1",
              content: "内容1",
            },
            {
              danWeiName: "单位2",
              content: "内容3",
            },
            {
              danWeiName: "单位4",
              content: "内容4",
            },
            {
              danWeiName: "单位3",
              content: "内容3",
            },
          ],
        },
      ],
      danweiList: [
        {
          danweiCode: "quanbu",
          danweiName: "全部",
        },
        {
          danweiCode: "nls",
          danweiName: "单位1",
        },
        {
          danweiCode: "yxs",
          danweiName: "单位2",
        },
        {
          danweiCode: "xqs",
          danweiName: "单位3",
        },
        {
          danweiCode: "zxb",
          danweiName: "中心办",
        },
      ],
    };
  },
  methods: {
    fillterType(workType) {
      console.log(workType);
    },
  },
};
</script>

<style lang="scss">
.workColect {
  height: 100%;
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

    &_box {
      height: 100%;
    }
    &_item {
      margin-bottom: 20px;
      border: 1px solid #e0e3ea;
      font-size: 14px;
      border-right: none;
    }

    &_date {
      height: 36px;
      line-height: 36px;
      border-bottom: 1px solid #e0e3ea;
      border-right: 1px solid #e0e3ea;
      padding-left: 10px;
    }
    &_danwei {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e0e3ea;
      border-right: 1px solid #e0e3ea;
      font-weight: 400;
      font-size: 14px;
      padding-left: 10px;
    }
    &_content {
      border-right: 1px solid #e0e3ea;
      min-height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }
  }
}
</style>