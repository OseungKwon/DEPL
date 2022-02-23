import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
// material
import { Container } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";
// routes
import { PATH_BLOG } from "src/routes/paths";
// components
import Page from "src/components/Page";
import { BlogNewPostForm } from "src/components/blog";
import React from "react";
import { useDispatch, useSelector } from "src/redux/store";
import { getPost } from "src/redux/slices/blog";
// layouts
import MainLayout from "src/layouts/main";
// ----------------------------------------------------------------------

export default function blogNewPost() {
  const router = useRouter();
  const postId = router.query.blogEditPostId;
  const dispatch = useDispatch();
  const { post, error, recentPosts } = useSelector(state => state.blog);
  const [session, loading] = useSession();
  const checkUserSession = post?.email === session?.user?.email ? true : false;

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  const ContentStyle = styled("div")(({ theme }) => ({
    overflow: "hidden",
    position: "flex",
    paddingTop: 100,
    backgroundColor: theme.palette.background.default
  }));
  return (
    <MainLayout>
      <ContentStyle>
        <Page title="Blog: Edit Post | Minimal-UI">
          <Container>
            {session && checkUserSession && (
              <>
                <BlogNewPostForm post={post} />
              </>
            )}
          </Container>
        </Page>
      </ContentStyle>
    </MainLayout>
  );
}
