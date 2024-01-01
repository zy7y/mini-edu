// 请求host更换,后端地址
export const host = "http://127.0.0.1:8000";

// 课程等级映射
const levelMap = {
  1: "高级",
  2: "中级",
  3: "初级",
};

export function getLevel(key) {
  return levelMap[key];
}
// 图片完整url
export function getImageUrl(image) {
  return `${host}${image}`;
}
