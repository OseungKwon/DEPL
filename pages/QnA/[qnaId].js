import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/client";
import { sentenceCase } from "change-case";
//import { useParams } from 'react-router-dom';
// material
import {
  Grid,
  Box,
  Card,
  Divider,
  Skeleton,
  Container,
  Typography,
  Pagination
} from "@material-ui/core";
import { MainContentStyle } from "src/style/style";
import { LoadingButton } from "@material-ui/lab";
// redux
import { useDispatch, useSelector, useRef } from "src/redux/store";
import { getQna } from "src/redux/slices/qna";
// routes
import { PATH_DASHBOARD } from "src/routes/paths";
// layouts
import MainLayout from "src/layouts/main";
// components
import Page from "src/components/Page";
import QnaCommentForm from "src/components/qnaComponents/QnaCommentForm";
// import Markdown from 'src/components/Markdown';
// import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostRecent,
  BlogPostCommentList,
  BlogPostCommentForm
} from "src/components/blog";
import BlogEtc from "src/components/blog/BlogEtc";

// ----------------------------------------------------------------------

const Viewer = dynamic(() => import("src/components/editor/TuiViewer"), {
  ssr: false
});

const SkeletonLoad = (
  <>
    <Skeleton
      width="100%"
      height={560}
      variant="rectangular"
      sx={{ borderRadius: 2 }}
    />
    <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  </>
);

export default function Qna() {
  const [session, loading] = useSession();
  const router = useRouter();
  const qnaId = router.query.qnaId;
  //console.log(qnaId);
  const dispatch = useDispatch();
  //const { title } = useParams();
  const { qna, error, recentPosts } = useSelector(state => state.qna);
  useEffect(() => {
    dispatch(getQna(qnaId, session?.user));
    // dispatch(getRecentPosts(qnaId));
  }, [dispatch, qnaId, session]);
  return (
    <MainLayout>
      <MainContentStyle>
        <Page title="Qna 상세">
          <Container>
            {qna && (
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <div style={{ position: "fixed", paddingBottom: "100px" }}>
                    <BlogEtc post={qna} />
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <Card>
                    {/* <BlogPostHero post={qna} /> */}

                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                      <Typography variant="h6" sx={{ mb: 5 }}>
                        {qna.title}
                      </Typography>

                      <Viewer
                        post={qna}
                        initialValue="hello111 react editor world!"
                      />
                      {/* <Markdown children={post.body} /> */}

                      <Box sx={{ my: 5 }}>
                        <Divider />
                        <BlogPostTags post={qna} />
                        <Divider />
                      </Box>

                      <Box sx={{ display: "flex", mb: 2 }}>
                        <Typography variant="h4">Comments</Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "text.disabled" }}
                        >
                          {/* ({post.comments.length}) */}
                        </Typography>
                      </Box>

                      <BlogPostCommentList post={qna} />

                      {/* <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                            <Pagination count={8} color="primary" />
                                        </Box> */}

                      <QnaCommentForm />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* {!post && SkeletonLoad}

                        {error && <Typography variant="h6">404 Post not found</Typography>}

                        {recentPosts.length > 0 && <BlogPostRecent posts={recentPosts} />} */}
          </Container>
        </Page>
      </MainContentStyle>
    </MainLayout>
  );
}
