<template>
  <div class="workManage">
    <el-tabs @tab-click="tabChange" v-model="activeName">
      <el-tab-pane label="值班安排" name="first" class="workManage_first">
        <div class="workManage_first_icon"></div>
        <div class="workManage_first_cards">
          <el-card class="box-card">
            <el-row>
              <el-button @click="handleAdd()">
                <i class="el-icon-circle-plus-outline"></i>
                <span>新增</span>
              </el-button>
            </el-row>

            <el-row style="margin-top: 10px">
              <el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="index" label="序号" width="80" align="center">
                  <template #default="scope">
                    <span>{{
                      (pageInfo.currentPage - 1) * pageInfo.pageSize +
                      scope.$index + 1
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="zhuGuan" label="在位主官" width="100" align="center" />
                <el-table-column prop="lingDao" label="值班领导" width="100" align="center"/>
                <el-table-column prop="zhiBanYuan" label="值班员" width="100" align="center" />
                <el-table-column prop="beiBanYuan" label="备班员" width="100" align="center"/>
                <el-table-column prop="startTime" label="值班时间" width="200" align="center">
                  <template #default="scope">
                    <span>{{scope.row.startTime.slice(0,10) + " 至 " + scope.row.endTime.slice(0,10)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="qinWu" label="勤务保障" width="100" align="center" />
                <el-table-column prop="jiaShiYuan" label="驾驶员" width="100" align="center" />
                <el-table-column prop="lianzhi1" label="联指席位1" width="100" align="center" />
                <el-table-column prop="lianzhi2" label="联指席位2" width="100" align="center" />
                <el-table-column label="营门值班" width="160px" align="center" >
                  <template #default="scope">
                    <span
                      @click="handleDetail(scope.row)"
                      style="color: #3894ff; cursor: pointer;"
                      >查看全部</span>
                      <br  v-if="checkWeek(scope.row.startTime, scope.row.endTime)" />
                      <span v-if="checkWeek(scope.row.startTime, scope.row.endTime)" style="margin-right: 5px">今日值班：xxx</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template #default="scope">
                    <span
                      @click="handleEdit(scope.row)"
                      :class="checkTimeIsPassed(scope.row.startTime) ? 'publish' : 'draft'"
                      >编辑</span
                    >
                    <span
                      @click="handleDelete(scope.row)"
                      :class="checkTimeIsPassed(scope.row.startTime) ? 'publish' : 'draft'"
                      style="margin-left: 10px"
                      >删除</span >
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
          </el-card>
        </div>
      </el-tab-pane>
      <!-- 值班统计 -->
      <el-tab-pane label="值班统计" name="second">
        <div class="workManage_filters">
          <el-form ref="form" class="filter" :model="filterParams" label-width="80px">
            <el-form-item label="值班人员" prop="user">
              <el-select
                v-model="filterParams.user"
                placeholder="请选择"
                size="mini"
              >
                <el-option label="全部" value="quanbu"></el-option>
                <el-option label="张三" value="shanghai"></el-option>
                <el-option label="李四" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="排序方式">
              <el-select
                v-model="filterParams.orderWay"
                placeholder="请选择"
                size="mini"
              >
                <el-option label="升序" value="shanghai"></el-option>
                <el-option label="降序" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="类别">
              <el-select
                v-model="filterParams.dayType"
                placeholder="请选择"
                size="mini"
              >
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="工作日" value="beijing"></el-option>
                <el-option label="节假日" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div id="myChart"></div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      v-model="addModalVisible"
      width="40%"
      :close-on-click-modal="false"
      title="值班安排"
    >
      <el-form :model="formData" ref="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="在位主官:" label-width="100px" prop="zhuGuan">
              <el-select
                v-model="formData.zhuGuan"
                placeholder="请选择在位主官"
                value-key="userCode"
              >
                <el-option
                  v-for="item in zhuGuanList"
                  :key="item.userCode"
                  :label="item.userName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="值班领导:" label-width="100px" prop="lingDao">
              <el-select
                v-model="formData.lingDao"
                placeholder="请选择值班领导"
                value-key="userCode"
              >
                <el-option
                  v-for="item in lingDaoList"
                  :key="item.userCode"
                  :label="item.userName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="值班员:" label-width="100px" prop="zhiBanYuan">
              <el-select
                v-model="formData.zhiBanYuan"
                placeholder="请选择值班员"
                value-key="userCode"
              >
                <el-option
                  v-for="item in zhiBanList"
                  :key="item.userCode"
                  :label="item.userName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备班员:" label-width="100px" prop="beiBanYuan">
              <el-select
                v-model="formData.beiBanYuan"
                placeholder="请选择备班员"
                value-key="userCode"
              >
                <el-option
                  v-for="item in zhiBanList"
                  :key="item.userCode"
                  :label="item.userName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="勤务保障:" label-width="100px" prop="qinWu">
              <el-select
                v-model="formData.qinWu"
                placeholder="请选择勤务保障"
                value-key="userCode"
              >
                <el-option
                  v-for="item in zhiQinList"
                  :key="item.userCode"
                  :label="item.userName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驾驶员:" label-width="100px" prop="jiaShiYuan">
              <el-select
                v-model="formData.jiaShiYuan"
                placeholder="请选择驾驶员"
                value-key="userCode"
              >
                <el-option
                  v-for="item in jiaShiList"
                  :key="item.userCode"
                  :label="item.userName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="联指1:" label-width="100px" prop="lianzhi1">
              <el-select
                v-model="formData.lianzhi1"
                placeholder="请选择值班员"
                value-key="userCode"
              >
                <el-option
                  v-for="item in zhiQinList"
                  :key="item.userCode"
                  :label="item.userName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联指2:" label-width="100px" prop="lianzhi2">
              <el-select
                v-model="formData.lianzhi2"
                placeholder="请选择联指2"
                value-key="userCode"
              >
                <el-option
                  v-for="item in zhiQinList"
                  :key="item.userCode"
                  :label="item.userName"
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
                label="开始时间:"
                label-width="100px"
                prop="startTime"
              >
                <el-date-picker
                  v-model="formData.startTime"
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
                label="结束时间:"
                label-width="100px"
                prop="endTime"
              >
                <el-date-picker
                  v-model="formData.endTime"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 100%"
                  :clearable="false"
                  value-format="YYYY-MM-DD"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item
                label="备注:"
                label-width="100px"
                prop="remark"
              >
                <el-input v-model="formData.remark" placeholder="备注" />
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetAddForm('addForm')">取消</el-button>
          <el-button type="primary" @click="saveWork()">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog 
      v-model="dialogDetail" 
      :title="'岗哨排班 (' + detailTime + ')'"
      :close-on-click-modal="false"
    >
      <div class="detail_content">
        <div class="detail_content_item" v-for="(item, index) in detailOriginData" :key="item.scheduleId">
          <div v-text="weekMap(item.startTime).name" class="detail_content_item_week"></div>
          <div class="detail_content_item_name" @dblclick="handleCellDbclick" >
            <div class="input-box">
                <!-- <el-input size="small" @blur="handleInputBlur" v-model="item.zhiBanYuan" ></el-input> -->
                <el-select
                  v-model="item.zhiBanYuan"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入姓名"
                  :remote-method="remoteMethod"
                  @blur="handleInputBlur"
                  @change="(val)=>handleSelect(val, index)"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.userCode"
                    :label="item.userName"
                    :value="item"
                  >
                  </el-option>
                </el-select>
            </div>
            <span class="input-span">{{item.zhiBanYuan ? item.zhiBanYuan : "无"}}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDetail = false">关闭</el-button>
          <el-button type="primary" @click="saveTable()">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      filterParams: {
        user: "",
        orderWay: "",
        dayType: "",
      },
      formData: {
        zhuGuan: "",
        lingDao: "",
        zhiBanYuan: "",
        beiBanYuan: "",
        qinWu: "",
        jiaShiYuan: "",
        lianzhi1: "",
        lianzhi2: "",
        remark: "",
        startTime: "",
        endTime: "",
      },
      personOptions: [],//所有人
      zhuGuanList: [], // 主官
      lingDaoList: [], // 领导
      zhiBanList: [], // 干部人员
      jiaShiList: [], // 驾驶员列表
      zhiQinList: [], // 其余人员
      options: [],
      myChart: null, 
      addModalVisible: false,
      dialogDetail: false,
      detailOriginData: [],
      detailTime: "",
      pageInfo: {
        currentPage: 1,
        pageSize: 15,
        total: 0,
      },
      tableData: [],
    };
  },
  mounted() {
    this.initEcharts();
    this.getTableData(this.pageInfo.currentPage);
  },
  methods: {
    initEcharts() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        backgroundColor: "#f1f1f1",
        tooltip: {
          show: true,
          trigger: "axis",
        },
        legend: {
          left: "right",
          top: 4,
        },
        grid: {
          left: "5%",
          right: "5%",
        },
        xAxis: {
          type: "category",
          data: [
            "张三",
            "李四",
            "王二",
            "张三",
            "张三",
            "李四",
            "张三",
            "李四",
            "王二",
            "张三",
            "张三",
            "李四",
            "张三",
            "李四",
            "王二",
            "张三",
            "张三",
            "李四",
            "张三",
            "李四",
            "王二",
            "张三",
            "张三",
            "李四",
          ],
        },
        // 横向滚动条
        dataZoom: [
          { show: true, realtime: true, start: 0, end: 50 },
          { type: "inside", realtime: true, start: 0, end: 50 },
        ],
        yAxis: {
          type: "value",
          axisLine: {
            show: false, //y轴
          },
          axisTick: {
            show: false, //刻度线
          },
          splitLine: {
            show: true, //网格线
          },
        },
        series: [
          {
            name: "工作日",
            type: "bar",
            barWidth: "13",
            data: [
              5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10,
              20, 5, 20, 36, 10, 10, 20,
            ],
            itemStyle: {
              normal: {
                //设置柱状图颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#f75d5d" },
                  { offset: 1, color: "#f0caca" },
                ]),
                label: {
                  show: true, //是否显示
                  position: "top", //显示在顶部
                  textStyle: {
                    color: "black", //字体颜色
                    fontSize: 12, //字体大小
                  },
                },
              },
            },
          },
          {
            name: "节假日",
            type: "bar",
            barWidth: "13",
            data: [
              2, 6, 6, 2, 4, 7, 2, 6, 6, 2, 4, 7, 5, 20, 36, 10, 10, 20, 5, 20,
              36, 10, 10, 20,
            ],
            itemStyle: {
              normal: {
                //设置柱状图颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#5ad9e8" },
                  { offset: 1, color: "#caecf0" },
                ]),
                label: {
                  show: true, //是否显示
                  position: "top", //显示在顶部
                  textStyle: {
                    color: "black", //字体颜色
                    fontSize: 12, //字体大小
                  },
                },
              },
            },
          },
        ],
      });

      this.myChart = myChart;
    },
    tabChange(tab) {
      if (tab.paneName == "second" && this.myChart) {
        this.initEcharts();
        console.log("重绘制柱状图");
        setTimeout(() => {
          this.myChart.resize();
        }, 0);
      }
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
    },
    resetAddForm(formName) {
      this.$refs[formName].resetFields();
      this.addModalVisible = false;
    },
    getTableData(currentPage) {
      this.$http.findScheduleByPage({
          pageNum: currentPage,
          pageSize: this.pageInfo.pageSize,
          type: "EIGHT"
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.datalist ? res.data.datalist.result : [];
          this.pageInfo.total = res.data.datalist ? res.data.datalist.total : 0;
        }
      })
    },
    saveWork() {
      if(this.formData.startTime == null || this.formData.endTime == null) {
        this.$message({ message: "值班时间不能为空", type: "waring", duration: 2000});
        return;
      }
      let params = {
        zhuGuanId: this.formData.zhuGuan && this.formData.zhuGuan.userCode,
        zhuGuan: this.formData.zhuGuan && this.formData.zhuGuan.userName,
        lingDaoId: this.formData.lingDao && this.formData.lingDao.userCode,  
        lingDao: this.formData.lingDao && this.formData.lingDao.userName,
        zhiBanYuanId: this.formData.zhiBanYuan && this.formData.zhiBanYuan.userCode,
        zhiBanYuan: this.formData.zhiBanYuan && this.formData.zhiBanYuan.userName,
        beiBanYuan: this.formData.beiBanYuan && this.formData.beiBanYuan.userName,
        beiBanYuanId: this.formData.beiBanYuan && this.formData.beiBanYuan.userCode,
        qinWu: this.formData.qinWu && this.formData.qinWu.userName,
        jiaShiYuan: this.formData.jiaShiYuan && this.formData.jiaShiYuan.userName,
        lianzhi1: this.formData.lianzhi1 && this.formData.lianzhi1.userName,
        lianzhi2: this.formData.lianzhi2 && this.formData.lianzhi2.userName,
        remark: this.formData.remark,
        startTime: this.formData.startTime ? this.$moment(this.formData.startTime).startOf("day").format("YYYY-MM-DD HH:mm:ss") : "",
        endTime: this.formData.endTime ? this.$moment(this.formData.endTime).endOf("day").format("YYYY-MM-DD HH:mm:ss") : "",
      }
      if(params.zhuGuanId == params.lingDaoId) {
        this.$message({ message: "在位主官与值班领导不能为同一人！", type: "waring", duration: 2000});
        return;
      }
      if(params.zhiBanYuanId == params.beiBanYuanId) {
        this.$message({ message: "值班员与备班员不能为同一人！", type: "warning", duration: 2000});
        return;
      }
      this.$http.addAndEditSchedule(params).then(res => {
        if(res.code == 200) {
          this.resetAddForm('addForm');
          this.$message({
            message: "添加成功",
            type: "success",
            duration: 2000,
          });
          this.getTableData(this.pageInfo.currentPage);
        }
      })
      
    },
    queryUsers() {
      this.$http.findUserByDeptId("all").then((res) => {
        if (res.code == 200) {
          this.personOptions = res.data.data;
          this.lingDaoList = [];
          this.personOptions.forEach(item => {
            if(item.limitedId == 'LEADER') {//领导
              this.lingDaoList.push(item)
              if(item.deptId == "ZHONGXIN") {
                this.zhuGuanList.push(item);
              }
            } else if(item.positionId == 'CANMOU' || item.positionId == 'FUZHUREN') {//参谋+室副主任
              this.zhiBanList.push(item)
            } else if(item.limitedId == 'JIASHIYUAN') {
              this.jiaShiList.push(item)
            } else {
              this.zhiQinList.push(item)
            }
          })
          this.zhiQinList = this.zhiQinList.concat(this.jiaShiList);
        } else {
          console.log(res.message);
        }
      });
    },
    handleAdd() {
      this.queryUsers();
      this.addModalVisible = true;
    },
    checkTimeIsPassed(startTime) {
      if(new Date() >= new Date(startTime)) {
        return true;
      } else {
        return false;
      }
    },
    handleDelete(row) {
      if(this.checkTimeIsPassed(row.startTime)) {
        return;
      } else {
        this.$confirm("是否确认删除本条数据", "删除", {
          cancelButtonText: "取消",
          confirmButtonText: "确认",
          type: "warning",
        }).then(() => {
          // 网络请求
          this.$http.deletScheduleById(row.scheduleId).then(res => {
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
      }
    },
    tableRowClassName({ row }) {
      if (this.checkWeek(row.startTime, row.endTime)) {
        return 'todayStyle'
      }
      return ''
    },
    checkWeek(startTime, endTime) {
      var today = new Date();
      return (new Date(startTime) <= today && new Date(endTime) >= today)
    },
    handleDetail(row) {
      this.dialogDetail = true;
      // 获取人员信息
      this.queryUsers();
      this.$http.findZhiQinByPage({
        pageNum: 1,
        pageSize: 10,
        type: "ONE",
        remark: row.scheduleId
      }).then(res => {
        if (res.code == 200) {
          this.detailOriginData = res.data.datalist ? res.data.datalist.result : [];
          this.detailOriginData;
        }
      })
      
      this.detailTime =  row.startTime.slice(0,10) + "至" + row.endTime.slice(0,10);
    },
    // 根据输入内容过滤人员
    remoteMethod(query) {
      if (query !== '') {
        this.options = this.zhiQinList.filter((item) => {
          return item.userName.indexOf(query) > -1
        })
      } else {
        this.options = []
      }
    },
    // 选中人选后修改数据
    handleSelect(item, index) {
      this.detailOriginData[index].zhiBanYuanId = item.userCode;
      this.detailOriginData[index].zhiBanYuan = item.userName;
      this.options = [];
    },
    // 单元格双击显示input进行编辑
    handleCellDbclick(event) {
      var cell = event.target;
      cell.classList.add('current-cell')
      if(cell.getElementsByTagName('input').length > 0) {
        cell.getElementsByTagName('input')[0].focus();
      }
    },
    //input框失去焦点事件
    handleInputBlur:function(event){
        var _event = event;
        setTimeout(function(){
            var _inputNode = _event.target;
            var itemCell = _inputNode.parentElement.parentElement.parentElement.parentElement.parentElement;
           if(itemCell.classList.contains('detail_content_item_name')) {
             itemCell.classList.remove('current-cell');  
           }
        },100);
    },
    saveTable() {
      this.$http.editZhiQin(this.detailOriginData).then(res => {
        if(res.code == 200) {
           this.$message({
            message: "保存成功",
            type: "success",
            duration: 2000,
          });
          this.dialogDetail = false;
        }
      })
    },
    weekMap(startTime) {
      var key = this.$moment(startTime).weekday() + 1;
      switch(key) {
        // "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
        case 1: return {value: "monday", name: "周一"};
        case 2: return {value: "tuesday", name: "周二"};
        case 3: return {value: "wednesday", name: "周三"};
        case 4: return {value: "thursday", name: "周四"};
        case 5: return {value: "friday", name: "周五"};
        case 6: return {value: "saturday", name: "周六"};
        case 7: return {value: "sunday", name: "周日"};
      }
    }
  },
};
</script>

<style lang="scss">
.workManage {
  height: 100%;
  .filter{
    display: flex;
    margin: 30px 0;
    .el-form-item__content {
      width: 120px;
    }
  }

  .publish {
    color: #bbbbbb;
  }

  .draft {
    color: #3894ff;
    cursor: pointer;
  }

  &_filters {
    display: flex;

    .el-form-item {
      margin-right: 20px;
      margin-bottom: 16px;
    }
  }

  #myChart {
    width: 100%;
    height: 500px;
  }

  .el-table .todayStyle {
    background-color: #f0f9eb;
  }

  .detail_content{
    display: flex;
    border-top: 1px solid rgb(235, 238, 245);
    border-left: 1px solid rgb(235, 238, 245);
    &_item{
      flex: 1;
      line-height: 40px;
      text-align: center;
      display: flex;
      flex-direction: column;
      &_week{
        border-bottom: 1px solid rgb(235, 238, 245);
        border-right: 1px solid rgb(235, 238, 245);
      }
      &_name{
        border-bottom: 1px solid rgb(235, 238, 245);
        border-right: 1px solid rgb(235, 238, 245);
      }
    }

    .input-box {
      display: none;
    }
    .current-cell{
      .input-box {
        display: block;
        margin-left: 10px;
        text-align: center;
      }
      .input-span{
        display: none;
      }
    }
  }

  

}
</style>