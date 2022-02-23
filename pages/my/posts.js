import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getPostsInitial, getMorePosts } from "src/redux/slices/blog";
import { getQnasInitial, getMoreqnas } from "src/redux/slices/qna";
import { useState, useEffect } from "react";
// layouts
import MainLayout from "src/layouts/main";
import { Container, Stack, Grid } from "@material-ui/core";
// components
import Page from "src/components/Page";
import { BlogPostCard } from "src/components/blog";
import QnaTable from "src/components/qnaComponents/QnaTable";
import UserMenu from "src/components/user/UserMenu";
import { MainContentStyle } from "src/style/style";
import ListTab from "src/components/etc/ListTab";

const TAB_OPTIONS = [
  { value: "posts", label: "내가 쓴 포스트" },
  { value: "qnas", label: "내가 쓴 Q&A" },
  { value: "comments", label: "내가 쓴 댓글" }
];

const TabOption = ({ tabKey, data }) => {
  switch (tabKey) {
    case "qnas":
      return <QnaTable list={data.qnaList} />;
    case "comments":
      return "나의 댓글쓰";
    default:
      return (
        <>
          <Grid container spacing={3}>
            {data.posts.map((post, index) => (
              <BlogPostCard
                key={index}
                post={post}
                index={index}
                maxDivide={4}
              />
            ))}
          </Grid>
        </>
      );
  }
};
const dispatchData = (tabKey, index, step) => {
  switch (tabKey) {
    case "qnas":
      return getQnasInitial(index, step);
    case "comments":
      return getQnasInitial(index, step);
    default:
      return getPostsInitial(index, step);
  }
};

function posts() {
  const [tabKey, setTabkey] = useState("posts");
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector(state => {
    switch (tabKey) {
      case "qnas":
        return state.qna;
      case "comments":
        return "";
      default:
        return state.blog;
    }
  });
  const { index, step } = data;
  useEffect(() => {
    dispatch(dispatchData(tabKey, index, step));
  }, [dispatch, index, step]);
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setTabkey(newValue);
    dispatch(dispatchData(newValue, index, step));
    router.push(`/my/posts?tab=${newValue}`);
  };

  return (
    <MainLayout>
      <MainContentStyle>
        <Page title="내가 쓴 글">
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <UserMenu menu="/my/posts" />
              </Grid>
              <Grid item xs={12} md={9}>
                <ListTab
                  query={tabKey}
                  options={TAB_OPTIONS}
                  onSort={handleChange}
                />
                <TabOption tabKey={tabKey} data={data} />

                {/* <Stack spacing={3}>내가 쓴 글</Stack> */}
              </Grid>
            </Grid>
          </Container>
        </Page>
      </MainContentStyle>
    </MainLayout>
  );
}

export default posts;
