export const statusMixin = {
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