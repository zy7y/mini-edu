import api from "./req";

// 获取轮播图
export function getBanners() {
  return api({
    method: "GET",
    url: "/user/banner",
  });
}

// 获取所有课程
export function getCourses(name) {
  return api({
    method: "GET",
    url: "/course/all",
    params: { name },
  });
}

// 用户登录
export function userLogin(paylaod) {
  return api({
    method: "post",
    data: paylaod,
    url: "/user/login",
  });
}

// 用户登出
export function userLogout() {
  return api({
    method: "post",
    url: "/user/logout",
  });
}
// 上传用户头像
export function userAvatar(data) {
  return api({
    method: "post",
    url: "/user/avatar",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}
// 修改用户密码
export function changePsd(password) {
  return api({
    method: "patch",
    url: "/user/profile",
    data: { password },
  });
}
// 用户反馈
export function addMsg(data) {
  return api({
    method: "post",
    url: "/user/feedback",
    data,
  });
}
