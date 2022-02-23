import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { getQna, removeQna, viewQnaCount } from "src/redux/slices/qna";

import dynamic from "next/dynamic";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Paper, Button, Divider, Grid, Stack } from "@material-ui/core";
import Comment from "./Comment";
import UserInfo from "./UserInfo";
import QnaShare from "./QnaShare";
import QnaNewPostForm from "./QnaNewPostForm";
const Viewer = dynamic(() => import("../editor/ToastViewer"), { ssr: false });
const Editor = dynamic(() => import("../editor/TuiEditor"), { ssr: false });

const ViewerWithForwardedRef = forwardRef((props, ref) => (
  <Viewer {...props} forwardedRef={ref} />
));

const RootStyles = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor: theme.palette.background.neutral
}));

export default function QnaDetails() {
  const dispatch = useDispatch();
  const router = useRouter();

  const qna = useSelector(state => state.qna.qna);
  const commentSample = useSelector(state => state.commentSample);
  //console.log(qna);
  //console.log("route", router.query.tab);
  const [edit, setEdit] = useState(false);
  const viewerRef = useRef();

  const user = "자몽";

  const removePost = async () => {
    dispatch(removeQna(qna.id));
    router.push(`/QnA/qnaList`);
  };

  useEffect(() => {
    router.query.tab && dispatch(viewQnaCount(router.query.tab));
  }, [router.query.tab]);

  useEffect(() => {
    router.query.tab && dispatch(getQna(router.query.tab, user));
  }, [router.query.tab, commentSample.isLoading, Link]);

  return (
    <>
      <RootStyles>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Stack>
            <QnaShare />
          </Stack>

          {qna && (
            <Grid item xs={7}>
              <Paper sx={{ p: 5, mt: 20, mb: 5 }}>
                <Button onClick={removePost}>삭제</Button>
                <Button>
                  <Link
                    style={{ textDecoration: "none" }}
                    href={{
                      pathname: "/QnA/qnaEditPost/",
                      query: { tab: qna.id }
                    }}
                  >
                    수정
                  </Link>
                </Button>
                <h1 style={{ fontSize: "50px" }}>{qna.title}</h1>
                <div>
                  {qna.tags.map(tagInfo => (
                    <span
                      style={{ marginRight: "0.4rem" }}
                      key={tagInfo?.tag?.id}
                    >
                      #{tagInfo?.tag?.name}
                    </span>
                  ))}
                  <span style={{ color: "grey", marginLeft: "3rem" }}>
                    <span>{qna.updated_at}</span>
                    <span style={{ marginLeft: "1rem" }}>
                      조회수 {qna.aggregations.views}
                    </span>
                  </span>
                </div>
                <div style={{ marginTop: "3rem", marginBottom: "4rem" }}>
                  <ViewerWithForwardedRef
                    initialValue={qna.text}
                    ref={viewerRef}
                  />
                </div>
              </Paper>
              <Paper sx={{ p: 5 }}>
                <h3
                  style={{
                    color: "#676673",
                    marginBottom: "2rem"
                  }}
                >
                  답변({qna.comments.length})
                </h3>
                <Comment user={user} />
              </Paper>
            </Grid>
          )}
          <Grid item xs={2}>
            <UserInfo />
          </Grid>
        </Grid>
      </RootStyles>
    </>
  );
}
