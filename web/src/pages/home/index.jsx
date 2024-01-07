import { useEffect, useState } from "react";
import { getBanners } from "../../service";
import { Carousel } from "antd";
import { CourseList } from "../../components/course";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../../stores";
import { getImageUrl } from "../../tools";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();
  const { courses, getCoursesAct } = useTokenStore();

  useEffect(() => {
    async function getData() {
      const res = await getBanners();
      console.log(res.data);
      setBanners(res.data);
      getCoursesAct(null);
    }
    getData();
  }, []);

  const handleClickBanner = (item) => {
    console.log(" banner click", item);
    if (item.to_id) {
      navigate("/course/" + item.to_id);
    }
  };
  return (
    <div>
      {/* 轮播图 */}
      <Carousel autoplay>
        {banners.map((item) => {
          return (
            <img
              className="banner"
              src={getImageUrl(item.image)}
              key={item.id}
              onClick={() => handleClickBanner(item)}
            ></img>
          );
        })}
      </Carousel>
      {/* 课程列表 */}
      <CourseList courses={courses} />
    </div>
  );
};

export default Home;
