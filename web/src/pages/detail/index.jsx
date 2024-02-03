// course detail
import { Breadcrumb, Card, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import {
  getCourseInfo,
  getChaptersByCourseId,
  getConmentsByCourseId,
} from "../../service";
import { useParams } from "react-router-dom";
import "./index.css";
import ReactMarkdown from "react-markdown";
import ChapterList from "./chapter";
import ReactPlayer from "react-player";
import { Modal } from "antd";
import CommentList from "./comment";
import { addActByCourseId } from "../../service";
import { getImageUrl, getLevel } from "../../tools";

const onChange = (key) => {
  console.log(key);
};

const Detail = () => {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [comments, setConmments] = useState([]);
  const parmas = useParams();

  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    async function getData() {
      const res = await getCourseInfo(parmas.id);
      console.log(res.data);
      setCourse(res.data);
      const res1 = await getChaptersByCourseId(parmas.id);
      setChapters(res1.data);

      const res2 = await getConmentsByCourseId(parmas.id);
      setConmments(res2.data);
    }
    getData();
  }, [parmas.id]);

  const clickVideo = async (item) => {
    // 学习
    const res = await addActByCourseId(parmas.id, 1);
    if (res) {
      setOpen(true);
      setVideoUrl(getImageUrl(item.video));
      setCurrentVideo(item);
    }
  };

  const items = [
    {
      key: "1",
      label: "章节",
      children: (
        <ChapterList
          course={course}
          chapters={chapters}
          clickVideo={clickVideo}
        />
      ),
    },
    {
      key: "2",
      label: "评论",
      children: <CommentList comments={comments} course={course} />,
    },
  ];
  return (
    <div style={{ margin: "20px" }}>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "Home",
            href: "/",
          },
          {
            title: course.name,
          },
        ]}
      />

      <Card
        className="course-info"
        style={{ backgroundImage: `url(${getImageUrl(course.image)})` }}
      >
        <h3>{course.name}</h3>
        <p>
          <span className="level">
            <span className="label">难度</span>
            <span>{getLevel(course.level)}</span>
          </span>
          .
          <span className="use-time">
            <span className="label">时长</span>

            <span>{course.level}</span>
          </span>
          .
          <span className="study">
            <span className="label">学习人数</span>
            <span>{course.study_number}</span>
          </span>
        </p>
      </Card>

      <div className="content">
        <Tabs
          className="content-tab"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          indicatorSize={(origin) => origin - 16}
          size="16px"
        />
        <div className="sider">
          <div className="sider-inner">
            <ReactMarkdown children={course.tell} />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        title={currentVideo?.title}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose={true}
      >
        <ReactPlayer
          url={videoUrl}
          controls={true}
          width="100%"
          height="100%"
        />
      </Modal>
    </div>
  );
};

export default Detail;
