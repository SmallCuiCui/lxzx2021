import axios from "_axios@0.24.0@axios";

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
export const loginOut = ({...paramas}) => ajax.post("/user/loginOut", paramas)

// 获取单位列表、权限列表、职务列表
export const getDepartment = () => ajax.get("/common/getDepartment");
export const getLimited = () => ajax.get("/common/getLimited");
export const getPosition = () => ajax.get("/common/getPosition");

