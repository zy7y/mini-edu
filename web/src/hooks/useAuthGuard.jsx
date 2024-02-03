import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../stores";
import { message } from "antd";
// 自定义的路由守卫 hooks
function useAuthGuard() {
  const { auth } = useTokenStore(); // 使用你自己定义的 hooks 获取认证信息
  const navigate = useNavigate(); // 使用 useNavigate 获取导航函数

  useEffect(() => {
    if (!auth?.token) {
      message.error("请重新登录");
      navigate("/"); // 如果未认证，则重定向到指定页面
    }
  }, [auth, navigate]); // 依赖项中包含 auth 和 navigate

  // 可以根据需求返回其他信息或函数
}

export default useAuthGuard;
