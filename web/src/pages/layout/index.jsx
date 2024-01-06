import Header from "./header";
import { Outlet } from "react-router-dom";

import "./index.css";
import FeedBack from "../../components/feedback";

const Layout = () => {
  return (
    <div>
      <Header />
      {/* 等同于router-view 动态展示 layout 下 的字组件 */}
      <Outlet />
      <FeedBack />
    </div>
  );
};

export default Layout;
