import { CustomerServiceOutlined } from "@ant-design/icons";
import { useTokenStore } from "../../stores";

import { Button, FloatButton, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { addMsg } from "../../service";
import "./index.css";

const { TextArea } = Input;

const phoneNumberValidator = (rule, value, callback) => {
  const regExp = /^1[3456789]\d{9}$/; // 手机号正则表达式

  if (value && !regExp.test(value)) {
    callback("请输入有效的手机号！");
  } else {
    callback(); // 校验通过
  }
};

const FeedBack = () => {
  const { auth } = useTokenStore();

  const [open, setOpen] = useState(false);

  const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await addMsg(values);
    console.log(res);
    if (res.data.msg) {
      message.success("稍后将有工作人员给您回电");
    } else {
      message.error("未知错误");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {auth?.user ? (
        <FloatButton
          shape="circle"
          type="primary"
          style={{ right: 94 }}
          icon={<CustomerServiceOutlined className="m-icon" />}
          onClick={() => setOpen(true)}
        />
      ) : null}
      <Modal
        title={"留言咨询"}
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose={true}
        footer={null}
      >
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="phone"
            rules={[
              {
                validator: phoneNumberValidator,
                message: "请输入有效的手机号！",
              },
            ]}
          >
            <Input placeholder="联系我"></Input>
          </Form.Item>
          <Form.Item
            name="content"
            rules={[{ required: true, message: "你好像忘记留下问题哦" }]}
          >
            <TextArea rows={4} placeholder="我想了解些" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{ float: "right" }} type="primary">
              {" "}
              就这些
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FeedBack;
