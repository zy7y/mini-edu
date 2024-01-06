import { InfoCircleOutlined } from "@ant-design/icons";
import "./index.css";

import { Button, Modal, Form, Input, Tooltip } from "antd";

const LoginForm = ({ login }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    login(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input type="password" placeholder="password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          请登录
        </Button>
      </Form.Item>
    </Form>
  );
};

const LoginModal = ({ open, close, login }) => {
  const ModalTitle = (
    <div>
      <span>用户登录</span>
      <Tooltip title="未注册用户，将自动注册并登录">
        <InfoCircleOutlined style={{ marginLeft: "5px" }} />
      </Tooltip>
    </div>
  );
  return (
    <Modal
      width={384}
      open={open}
      onCancel={close}
      footer={null}
      destroyOnClose={true}
      title={ModalTitle}
    >
      <div className="login-form">
        <LoginForm login={login} />
      </div>
    </Modal>
  );
};
export default LoginModal;
