export const coursesSort = (courses, keyword) => {
  let result = {};
  // console.log(courses, "courses", keyword, "keyword");
  for (let i = 0; i < courses.length; i++) {
    let currentkeyword;
    if (keyword == "name") {
      currentkeyword = courses[i]?.creator?.[keyword];
    } else {
      currentkeyword = courses[i][keyword];
    }
    if (result[currentkeyword] == "undefined") {
    } else if (result[currentkeyword] > 0) {
      result[currentkeyword]++;
    } else {
      result[currentkeyword] = 1;
    }
  }
  return result;
};
