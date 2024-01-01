import { message } from "antd";
import axios from "axios";
import { host } from "../tools";

function getToken() {
  const authStorage = localStorage.getItem("auth-storage");
  const storage = JSON.parse(authStorage);
  return storage?.state?.auth?.token;
}

// 创建axios实例
const api = axios.create({
  baseURL: `${host}/api`,
});

// 请求拦截器：在请求头中添加token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：处理token过期等情况
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      if (getToken()) {
        localStorage.clear();
        location.reload();
      }

      message.error("凭证或已过期，请登录");
    } else {
      message.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
