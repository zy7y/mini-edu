import { Input, Avatar, message } from "antd";
import { useTokenStore } from "../../stores";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../../components/login";
import { getImageUrl } from "../../tools";

const { Search } = Input;

const Header = () => {
  const { auth, loginAct, logoutAct, getCoursesAct } = useTokenStore();

  const location = useLocation();

  const [showLogin, setShowLogin] = useState(false);

  const onSearch = (value) => {
    if (!value) {
      return;
    }
    if (location.pathname != "/") {
      message.warning("当前页面无法搜索");
      return;
    }

    getCoursesAct(value);
  };
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const result = await loginAct(values);
    if (result) {
      setShowLogin(false);
    }
  };

  return (
    <div className="layout-header">
      <div className="header-left">
        <Link to="/">Mini EDU</Link>
      </div>
      <Search placeholder="Django" onSearch={onSearch} style={{ width: 300 }} />
      <div className="header-right">
        {auth ? (
          <div>
            <Avatar
              size={30}
              src={getImageUrl(auth.user.avatar)}
              onClick={() => navigate("/profile")}
            />
            <span onClick={async () => await logoutAct()}>退出</span>
          </div>
        ) : (
          <span onClick={() => setShowLogin(true)}>登录</span>
        )}
      </div>
      <LoginModal
        open={showLogin}
        close={() => setShowLogin(false)}
        login={handleLogin}
      />
    </div>
  );
};

export default Header;
