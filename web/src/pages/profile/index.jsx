import useAuthGuard from "../../hooks/useAuthGuard";
import { Tabs, Upload, message, Input, Button, Space } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./index.css";
import { CourseList } from "../../components/course";
import { changePsd, getCourseByAct, userAvatar } from "../../service";
import { getImageUrl } from "../../tools";

const Info = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [newPsd, setNewPsd] = useState("");

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const customRequest = async (options) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", options.file);
    const res = await userAvatar(formData);
    if (res.data.data.url) {
      setImageUrl(getImageUrl(res.data.data.url));
      message.success("修改成功，下次登录后即可刷新");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>修改头像(点击修改)</h1>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={customRequest}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>

      <h1>修改密码</h1>
      <Space.Compact style={{ width: "25%" }}>
        <Input.Password
          placeholder="输入新密码"
          onChange={(e) => setNewPsd(e.target.value)}
        />
        <Button
          type="primary"
          onClick={async () => {
            console.log(newPsd);

            if (newPsd.trim().length >= 6) {
              const res = await changePsd(newPsd);
              if (res.data.code) {
                message.success("修改成功,下次登录时生效");
              } else {
                message.error("修改失败");
              }
            }
          }}
        >
          确认
        </Button>
      </Space.Compact>
    </div>
  );
};

const UserCourse = () => {
  // 用户课程组件
  const [flavCourses, setFlavCourses] = useState([]);
  const [studyCourses, setStudyCourses] = useState([]);
  const [selectAct, setSelectAct] = useState(2);
  useEffect(() => {
    async function getData() {
      const res = await getCourseByAct(selectAct);
      console.log(selectAct);
      if (selectAct === 1) {
        setStudyCourses(res.data);
      } else {
        setFlavCourses(res.data);
      }
    }
    getData();
  }, [selectAct]);
  // todo 反馈留言，代码优化

  const items = [
    { key: 2, label: "收藏的", children: <CourseList courses={flavCourses} /> },
    {
      key: 1,
      label: "学习的",
      children: <CourseList courses={studyCourses} />,
    },
  ];

  return <Tabs items={items} onChange={(key) => setSelectAct(key)}></Tabs>;
};

const Profile = () => {
  useAuthGuard();

  const items = [
    {
      key: "user",
      label: "修改个人资料",
      children: <Info />,
    },
    {
      key: "flav",
      label: "我的课程",
      children: <UserCourse />,
    },
  ];
  return (
    <div style={{ margin: "20px" }}>
      <Tabs tabPosition={"left"} items={items} />
    </div>
  );
};
export default Profile;
