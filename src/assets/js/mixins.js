export const statusMixin = {
    data() {
        return {
            statusList: [
                {code: "ZAIWEI", name: "在位"},
                {code: "XUEXI", name: "学习"},
                {code: "CHUCHAI", name: "出差"},
                {code: "QINGJIA", name: "请假"},
                {code: "LUNXIU", name: "轮休"},
                {code: "JIEDIAO", name: "借调"},
                {code: "ZHUYUAN", name: "住院"},
                {code: "PEIHU", name: "陪护"},
                {code: "XIUJIA", name: "休假"},
            ]
        }
    },
    methods: {
        statusMap(status) {
            switch (status) {
                case "ZAIWEI":
                    return "在位";
                case "XUEXI":
                    return "学习";
                case "CHUCHAI":
                    return "出差";
                case "QINGJIA":
                    return "请假";
                case "LUNXIU":
                    return "轮休";
                case "JIEDIAO":
                    return "借调";
                case "ZHUYUAN":
                    return "住院";
                case "PEIHU":
                    return "陪护";
                case "XIUJIA":
                    return "休假";
                default:
                    return null;
            }
        }
    }
}