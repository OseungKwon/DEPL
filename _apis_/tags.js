import faker from "faker";
// utils
import mock from "./mock";
const TAG_NAME = [];
for (let i = 0; i < 1000; i++) {
  TAG_NAME.push("react_" + i.toString());
}
mock.onGet("/api/tags").reply(() => {
  const tags = [...Array(1000)].map((_, index) => {
    return {
      id: faker.datatype.uuid(),
      name: TAG_NAME[index],
      descriptions: "내용 ㅎㅎㅎ",
      postViews: 111,
      qnaViews: 222
    };
  });
  return [200, { tags }];
});
