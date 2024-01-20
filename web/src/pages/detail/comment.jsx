import { Card, Avatar, Form, Input, Button, message } from "antd";
import { useTokenStore } from "../../stores";
import { addComment } from "../../service";
import { getImageUrl } from "../../tools";

const { TextArea } = Input;
const { Meta } = Card;
const CommentList = ({ comments, course }) => {
  const onFinish = async (values) => {
    console.log(values);
    values["course_id"] = course.id;
    const res = await addComment(values);
    if (res.data.msg) {
      message.success("评论成功，刷新页面生效");
    }
  };
  const { auth } = useTokenStore();
  return (
    <>
      {/* todo 新增评论 */}
      <Form onFinish={onFinish}>
        <Form.Item
          name="content"
          rules={[{ required: true, message: "好像忘记留下些什么了" }]}
        >
          <TextArea rows={4} placeholder="留下些什么" />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{ float: "right" }}
            type="primary"
            disabled={!auth?.user}
          >
            {auth?.user ? "评论" : "请登录"}
          </Button>
        </Form.Item>
      </Form>
      {comments.map((item) => (
        <Card
          className="wrap"
          style={{ width: "100%", marginTop: 16 }}
          key={item.id}
        >
          <Meta
            avatar={<Avatar src={getImageUrl(item.user.avatar)} />}
            title={item.user.username}
            description={item.content}
          />
        </Card>
      ))}
    </>
  );
};

export default CommentList;
