import faker from "faker";
import mock from "./mock";

const index = 7;

const users = [...Array(12)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `31a6d8e0-12d4-4aef-88c3-39229ea852f7-${setIndex}`,
    name: faker.name.findName(),
    avatarUrl: `/static/mock-images/avatars/avatar_${setIndex}.jpg`
  };
});

const POST_COMMENTS = [
  {
    id: faker.datatype.uuid(),
    name: users[0].name,
    avatarUrl: users[0].avatarUrl,
    message: faker.lorem.lines(),
    postedAt: faker.date.past(),
    users: [users[0], users[1], users[2]],
    replyComment: [
      {
        id: faker.datatype.uuid(),
        userId: users[1].id,
        message: faker.lorem.lines(),
        postedAt: faker.date.past()
      },
      {
        id: faker.datatype.uuid(),
        userId: users[0].id,
        message: faker.lorem.lines(),
        tagUser: users[1].name,
        postedAt: faker.date.past()
      },
      {
        id: faker.datatype.uuid(),
        userId: users[2].id,
        message: faker.lorem.lines(),
        postedAt: faker.date.past()
      }
    ]
  },
  {
    id: faker.datatype.uuid(),
    name: users[4].name,
    avatarUrl: users[4].avatarUrl,
    message: faker.lorem.lines(),
    postedAt: faker.date.past(),
    users: [users[5], users[6], users[7]],
    replyComment: [
      {
        id: faker.datatype.uuid(),
        userId: users[5].id,
        message: faker.lorem.lines(),
        postedAt: faker.date.past()
      },
      {
        id: faker.datatype.uuid(),
        userId: users[6].id,
        message: faker.lorem.lines(),
        postedAt: faker.date.past()
      },
      {
        id: faker.datatype.uuid(),
        userId: users[7].id,
        message: faker.lorem.lines(),
        postedAt: faker.date.past()
      }
    ]
  },
  {
    id: faker.datatype.uuid(),
    name: users[8].name,
    avatarUrl: users[8].avatarUrl,
    message: faker.lorem.lines(),
    postedAt: faker.date.past(),
    users: [],
    replyComment: []
  },
  {
    id: faker.datatype.uuid(),
    name: users[9].name,
    avatarUrl: users[9].avatarUrl,
    message: faker.lorem.lines(),
    postedAt: faker.date.past(),
    users: [],
    replyComment: []
  }
];

let posts = [...Array(23)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `0feb2990-4210-4170-93a4-37e8f5958a18-${setIndex}`,
    cover: "",
    title: `title${index}`,
    description: faker.lorem.paragraph(),
    createdAt: faker.date.past(),
    view: faker.datatype.number(),
    comment: faker.datatype.number(),
    share: faker.datatype.number(),
    favorite: faker.datatype.number(),
    author: {
      name: faker.name.findName(),
      avatarUrl: `/static/mock-images/avatars/avatar_${setIndex}.jpg`
    },
    tags: ["C", "C#", "JavaScript", "ios"],
    body: "### 안녕하세요 \n ```js\nconsole.log(`hi`)\n```\nasdadasdasdasdasdasdasdasdasd",
    favoritePerson: [...Array(50)].map((_, index) => {
      return {
        name: faker.name.findName(),
        avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`
      };
    }),
    comments: POST_COMMENTS
  };
});

// ----------------------------------------------------------------------

mock.onGet("/api/qna/posts/all").reply(200, { posts });

// ----------------------------------------------------------------------

mock.onGet("/api/qna/posts").reply(() => {
  try {
    //console.log(config);
    // const { index, step } = config.params;
    const maxLength = posts.length;
    // const loadMore = index + step;

    // const sortPosts = [...posts].sort((a, b) => {
    //   return new Date(b.createdAt) - new Date(a.createdAt);
    // });

    // const results = sortPosts.slice(0, loadMore);

    return [200, { posts, maxLength }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/qna/post").reply(config => {
  try {
    const { qnaId } = config.params;
    const post = posts.find(_post => _post.id === qnaId);

    if (!post) {
      return [404, { message: "Post not found" }];
    }

    return [200, { post }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/blog/posts/recent").reply(config => {
  try {
    const { title } = config.params;

    const recentPosts = posts
      .filter(_post => paramCase(_post.title) !== title)
      .slice(posts.length - 5, posts.length);

    if (!recentPosts) {
      return [404, { message: "Post not found" }];
    }

    return [200, { recentPosts }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/blog/posts/search").reply(config => {
  try {
    const { query } = config.params;
    const cleanQuery = query.toLowerCase().trim();
    const results = [];

    posts.forEach(post => {
      if (!query) {
        return results.push(post);
      }

      if (post.title.toLowerCase().includes(cleanQuery)) {
        return results.push(post);
      }
    });

    return [200, { results }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});
