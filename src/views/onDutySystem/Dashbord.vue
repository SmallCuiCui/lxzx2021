<template>
<div :class="isFull ? 'dashbord fullCss' : 'dashbord'">
    <div class="dashbord_condition" v-if="currentShow == 1">
        <div class="dashbord_condition_row">
            <div class="dashbord_condition_row_full">
                <img src="../../assets/icons/nofull.png" @click="isFull = false" v-if="isFull"/>
                <img src="../../assets/icons/fullScreen.png" @click="isFull = true" v-else/>
            </div>
            <div class="dashbord_condition_row_title">人员情况</div>
        </div>
        <div class="dashbord_condition_row" v-for="(danwei, index) in personList" :key="index">
            <div class="dashbord_condition_row_head">{{danwei.lineName}}</div>
            <ul class="dashbord_condition_row_ul">
                <li v-for="item in danwei.dataList" :key="item" class="dashbord_condition_row_ul_item">
                    <div class="dashbord_condition_row_ul_item_icon"><img :src="require('../../assets/icons/'+item.status+'.png')" /></div>
                    <div class="dashbord_condition_row_ul_item_name">{{item.userName}}</div>
                </li>
            </ul>
        </div>
        <div class="dashbord_condition_row">
            <div class="dashbord_condition_row_head">说明</div>
            <ul class="dashbord_condition_row_ul">
                <li v-for="item in statusList" :key="item.code" class="dashbord_condition_row_ul_item">
                    <div class="dashbord_condition_row_ul_item_icon"><img :src="require('../../assets/icons/'+item.code.toLowerCase()+'.png')" /></div>
                    <div class="dashbord_condition_row_ul_item_name">{{item.name}}</div>
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
                <td>王小虎</td>
                <td>王小虎</td>
                <td>王小虎</td>
                <td>王小虎</td>
                <td>王小虎</td>
                <td>王小虎</td>
                <td>王小虎</td>
                <td>王小虎</td>
            </tr>
            <tr>
                <td>备注</td>
                <td colspan="7">1.xxxx</td>
            </tr>
        </table>
    </div>
    <div class="dashbord_notice" v-else>
        <h2 class="dashbord_notice_title">{{noticeScreen.noticeTitle}}</h2>
        <p class="dashbord_notice_time">
            <span>{{noticeScreen.publishTime}}</span>
            <span>{{noticeScreen.createUserName}}</span>
        </p>
        <p class="dashbord_notice_content">{{noticeScreen.noticeContent}}</p>
    </div>
</div>
</template>

<script>
import { statusMixin } from "@/assets/js/mixins.js";
export default {
    mixins: [statusMixin],
    data(){
        return {
            currentShow: 1,//1.人员情况、2.值班安排、3.投屏通知
            personList: [
                {
                    lineName: "领导",
                    dataList: [{userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zhuyuan"}, {userName: "里斯", status: "xiujia"}]
                },
                {
                    lineName: "单位1",
                    dataList: [{userName: "王小虎", status: "zaiwei"}, {userName: "里斯", status: "xiujia"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "xuexi"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "xuexi"}, {userName: "里斯", status: "zaiwei"}]
                },
                {
                    lineName: "单位2",
                    dataList: [{userName: "王小虎", status: "qingjia"}, {userName: "里斯", status: "chuchai"}, {userName: "里斯", status: "lunxiu"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "chuchai"}, {userName: "里斯", status: "jiediao"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zaiwei"}]
                },
                {
                    lineName: "单位3",
                    dataList: [{userName: "王小虎", status: "zaiwei"}, {userName: "里斯", status: "jiediao"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "chuchai"}]
                },
                {
                    lineName: "单位4",
                    dataList: [{userName: "王小虎", status: "peihu"}, {userName: "王小虎", status: "zaiwei"}, {userName: "里斯", status: "xiujia"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "xuexi"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "xuexi"}, {userName: "里斯", status: "zaiwei"}]
                },
                {
                    lineName: "单位5",
                    dataList: [{userName: "王小虎", status: "peihu"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zhuyuan"}, {userName: "里斯", status: "xiujia"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zhuyuan"}, {userName: "里斯", status: "xiujia"}, {userName: "里斯", status: "zaiwei"}, {userName: "里斯", status: "zhuyuan"}, {userName: "里斯", status: "xiujia"}]
                }
            ],
            illustrations:[],
            isFull: false,
            noticeScreen: {}
        }
    },
    mounted() {
        this.timer = setInterval(this.changeShow, 1000 * 60);
        let that = this
        document.addEventListener("keyup",function(e){
            // esc键
            if (e.keyCode == 27) {
                that.isFull = false;
            }
        })

        this.getScreenNotice();
    },
    beforeUnmount() {
      clearInterval(this.timer);
    },
    methods: {
        getStatus(status) {
            switch(status) {
                case "":return "";
                default: return "";
            }
        },
        changeShow() {
            this.currentShow ++;
            if(this.currentShow > 3) {
                this.currentShow = 0;
            }
        },
        getScreenNotice() {
            this.$http.queryScreenNotice().then(res => {
                if(res.code == 200) {
                    this.noticeScreen = res.data.datalist[0];
                }
            })
        }
    }
}
</script>

<style lang="scss" scope>
.dashbord{
    width: 100%;
    height: 100%;
    padding: 50px;
    background-color: white;
    &>div{
        width: 100%;
        height: 100%;
    }
    &_condition{
        border: 1px solid #cccccc;
        overflow: hidden;
        
        &_row{
            width: 100%;
            display: flex;
            text-align: center;
            border-top: 1px solid #cccccc;
            &:first-child{
                border-top: none;
            }
            &_full{
                width: 100px;
                height: 50px;
                border-right: 1px solid #cccccc;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 36px;
                    cursor: pointer;
                }
            }
            &_title{
                flex: 1;
                text-align: center;
                line-height: 49px;
                font-size: 20px;
            }
            &_head{
                width: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: 1px solid #cccccc;
            }
            &_ul{
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                li:nth-child(7){
                    border-right: 1px solid white;
                }
                &_item{
                    width: 14.28%;
                    height: 40px;
                    line-height: 40px;
                    border-right: 1px solid #cccccc;
                    border-bottom: 1px solid #cccccc;
                    display: flex;
                    &_icon{
                        width: 40px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    &_name{
                        flex: 1;
                        border-left: 1px solid #cccccc;
                    }
                }
            }
        }
    }

    &_zhiban{
        padding: 120px 40px;
        text-align: center;
        h2{
            font-size: 24px;
            margin-bottom: 60px;
            letter-spacing: 5px;
        }
        table{
            border-radius: 4px;
            width: 100%;
            margin: 0 auto;
            border-spacing: 0;
            border-collapse: collapse;
            tr:first-child{
                height: 50px;
                line-height: 50px;
                letter-spacing: 2px;
            }
            tr:nth-child(2){
                height: 60px;
                line-height: 60px;
            }
            tr:nth-child(3), tr:nth-child(4){
                height: 100px;
                line-height: 100px;
            }
            tr:nth-child(4) td{
                text-align: left;
                padding-left: 20px;
            }
        }
    }

    &_notice{
        padding: 150px;
        text-align: center;
        &_title{
            font-size: 24px;
            margin-bottom: 10px;
            letter-spacing: 5px;
        }
        &_time{
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
            line-height: 24px;
            span{
                font-size: 14px;
            }
            span:first-child{
                margin-right: 20px;
            }
        }
        &_content{
            font-size: 20px;
            white-space: pre-wrap;
            word-break: break-word;
            // text-indent: 2em;
            word-break:normal; 
            text-align: left;
            line-height: 30px;
            letter-spacing: 3px;
        }
    }
}
// 全屏样式
.fullCss{
    position: absolute;
    top: 0;
    left: 0;
}
</style>