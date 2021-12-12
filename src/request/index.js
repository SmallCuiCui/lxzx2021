import axios from "axios";
import router from "../router"
import { ElMessage } from 'element-plus'

axios.defaults.baseURL = '/api'

const ajax = axios.create();

ajax.interceptors.request.use(config => {

  // 携带身份验证信息
  if (localStorage.getItem('Authorization')) {
    config.headers.Authorization = localStorage.getItem('Authorization');
  }
    
  return config;
})

ajax.interceptors.response.use(resp => {
  if (resp.status === 200) {
    // 状态码为3000的不需要提示
    if(resp.data.code !== 200 && resp.data.code != 3000) {
      ElMessage({
        message: resp.data.message,
        type: "error",
        duration: 1000,
      })
    }
    // 后端session过期
    if(resp.data.code == 3003) {
      router.replace("/login");
    }
    return resp.data
  } else {
    this.$message("接口异常");
    return resp
  }
  })

  // const baseUrl = "locolhost:8888/api"
// 用户相关接口-登录、新增、修改密码
export const postLogin = ({userCode, password}) => ajax.post("/user/userLogin", {userCode, password});
export const addUser = ({...paramas}) => ajax.post("/user/addUser", paramas)
export const changePassword = ({...paramas}) => ajax.post("/user/changePassword", paramas)
export const loginOut = () => ajax.get("/user/loginOut")
export const findAllByPage = ({...paramas}) => ajax.get(`/user/findAllByPage?pageNum=${paramas.pageNum}&pageSize=${paramas.pageSize}`)
export const findUserByDeptId = (deptId) => ajax.get(`/user/findUserByDeptId?deptId=${deptId}`)

// 获取单位列表、权限列表、职务列表
export const getDepartment = () => ajax.get("/common/getDepartment");
export const getLimited = () => ajax.get("/common/getLimited");
export const getPosition = () => ajax.get("/common/getPosition");

// 工作上报、工作汇总
export const addAndEditWork = ({...paramas}) => ajax.post("/work/addAndEditWork", paramas);
export const findAllWorkByPage = ({...paramas}) => ajax.get(`/work/findAllWorkByPage?pageNum=${paramas.pageNum}&pageSize=${paramas.pageSize}`);
export const deletWorkById = (workId) => ajax.get(`/work/deletWorkById?workId=${workId}`);
export const handleWorkPublish = (workId) => ajax.get(`/work/handleWorkPublish?workId=${workId}`);
export const getWorkColectList = ({...paramas}) => ajax.post(`/work/getWorkColectList`, paramas);

// 通知相关接口
export const addAndEditNotice = ({...paramas}) => ajax.post("/notice/addAndEditNotice", paramas);
export const findAllNoticeByPage = ({...paramas}) => ajax.get(`/notice/findAllByPage?pageNum=${paramas.pageNum}&pageSize=${paramas.pageSize}`);
export const deletNoticeById = (noticeId) => ajax.get(`/notice/deletNoticeById?noticeId=${noticeId}`);
export const handlePublishNow = (workId) => ajax.get(`/notice/handlePublishNow?workId=${workId}`);
export const queryAllPublishNotice = (pageNum) => ajax.get(`/notice/queryAllPublishNotice?pageNum=${pageNum}`);
export const handleUserRead = (paramas) => ajax.post(`/notice/handleUserRead`, paramas);
export const queryScreenNotice = () => ajax.get(`/notice/queryScreenNotice`);

// 值班管理
export const addAndEditSchedule = ({...paramas}) => ajax.post(`/schedule/addAndEditSchedule`, paramas);
export const editZhiQin = (paramas) => ajax.post(`/schedule/editZhiQin`, paramas);
export const findScheduleByPage = ({...paramas}) => ajax.get(`/schedule/findAllByPage?pageNum=${paramas.pageNum}&pageSize=${paramas.pageSize}&type=${paramas.type}`, paramas);
export const findZhiQinByPage = ({...paramas}) => ajax.get(`/schedule/findAllByPage?pageNum=${paramas.pageNum}&pageSize=${paramas.pageSize}&type=${paramas.type}&remark=${paramas.remark}`, paramas);
export const deletScheduleById = (scheduleId) => ajax.get(`/schedule/deletScheduleById?scheduleId=${scheduleId}`);

