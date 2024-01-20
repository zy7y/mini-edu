import { VideoCameraFilled } from "@ant-design/icons";

const ChapterItem = ({ item, clickVideo, index }) => {
  console.log(item);
  return (
    <div className="wrap">
      <h3>
        {index + 1}. {item.name}
      </h3>
      <div className="chapter-description">{item.briefly}</div>
      <div className="videos">
        {item.videos.map((el, index) => (
          <div
            key={el.id}
            onClick={() => clickVideo(el)}
            style={{ height: "30px" }}
          >
            <a className="video">
              <VideoCameraFilled />
              <p>
                {index + 1}. {el.title} ({el?.time ?? "06:33"})
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChapterList = ({ course, chapters, clickVideo }) => {
  return (
    <div>
      <div className="wrap">简介: {course.briefly}</div>
      {chapters.map((item, index) => (
        <ChapterItem
          item={item}
          index={index}
          key={item.id}
          clickVideo={clickVideo}
        />
      ))}
    </div>
  );
};

export default ChapterList;
