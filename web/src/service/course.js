import api from "./req";
// 课程详情
export function getCourseInfo(id) {
  return api({
    method: "get",
    url: "/course/" + id,
  });
}
// 获取课程章节列表
export function getChaptersByCourseId(course_id) {
  return api({
    method: "get",
    url: "/course/chapter/list",
    params: { course_id },
  });
}
// 课程评论列表
export function getConmentsByCourseId(course_id) {
  return api({
    method: "get",
    url: "/course/comment/list",
    params: { course_id },
  });
}

// 收藏 or 学习课程
export function addActByCourseId(course_id, act_type) {
  return api({
    method: "POST",
    params: { course_id, act_type },
    url: "/user/course",
  });
}

// 根据不同行为获取课程
export function getCourseByAct(act_type) {
  return api({
    method: "GET",
    params: { act_type },
    url: "/user/course",
  });
}
// 课程评论
export function addComment(data) {
  return api({
    method: "post",
    url: "/course/comment/add",
    data,
  });
}
