import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addComment,
  editComment,
  removeComment
} from "../../redux/slices/commentSample";
//import ReplyComment from "./ReplyComment";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import ReplyComment from "./ReplyComment";
// dot icon
//import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Stack, Button, Divider, Box, Avatar } from "@material-ui/core";
import dynamic from "next/dynamic";
// markdown, toast editor
const Viewer = dynamic(() => import("../editor/ToastViewer"), { ssr: false });
const Editor = dynamic(() => import("../editor/TuiEditor"), { ssr: false });
const ViewerWithForwardedRef = forwardRef((props, ref) => (
  <Viewer {...props} forwardedRef={ref} />
));
const EditorWithForwardedRef = forwardRef((props, ref) => (
  <Editor {...props} forwardedRef={ref} />
));
import { check_kor, timeForToday } from "./CommentTool";
const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  textAlign: "center",
  color: "#737373",
  fontSize: "1rem",
  lineHeight: "1rem"
}));

const ProfileIcon = styled(Avatar)(() => ({
  //backgroundColor: "orangered",
  width: "2rem",
  height: "2rem"
}));
const Comment = () => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.qna.qna.comments);
  const qnaId = useSelector(state => state.qna.qna.id);

  const [display, setDisplay] = useState(false);
  const commentRef = useRef();
  const editorRef = useRef();
  const viewerRef = useRef({});

  // open editor to edit comment
  const [openEditor, setOpenEditor] = useState("");

  const [openCommentRef, setOpenCommentRef] = useState(true);

  const onSubmit = async e => {
    console.log("submit");
    e.preventDefault();

    // 마크다운 변환
    const editorInstance = editorRef.current.getInstance();
    const getContent = editorInstance.getMarkdown();
    setDisplay(!display);

    if (getContent !== "") {
      const data = {
        is_private: false,
        reply_to: null,
        level: 0,
        qna_id: qnaId,
        text: getContent,
        is_reply: false
      };
      await dispatch(addComment(data));
    }

    setOpenCommentRef(!openCommentRef);
  };

  // Edit comment
  const onEdit = (commentId, index) => {
    console.log(commentId);
    const editorInstance = commentRef.current.getInstance();
    const getContent = editorInstance.getMarkdown();
    console.log(getContent);
    viewerRef.current[index].getInstance().setMarkdown(getContent); // vewerRef 위치 문제있음

    let data = { text: getContent };
    dispatch(editComment(qnaId, commentId, data));
  };

  // Remove comment
  const onRemove = commentId => {
    dispatch(removeComment(qnaId, commentId));
  };
  console.log(viewerRef);
  console.log(openCommentRef);
  return (
    <Box>
      <h2>답변 작성하기</h2>
      {openCommentRef && <EditorWithForwardedRef ref={editorRef} />}

      <Button
        onClick={e => {
          openCommentRef ? onSubmit(e) : setOpenCommentRef(!openCommentRef);
        }}
      >
        작성하기
      </Button>
      {comments.map((comment, index) => (
        <Box sx={{ m: 2 }} key={comment.id}>
          <Stack direction="row" spacing={2}>
            <ProfileIcon></ProfileIcon>
            <Item>{comment.fk_user_id}</Item>

            <Item>{timeForToday(comment.created_at)}</Item>
          </Stack>
          <Box
            key={index}
            sx={{ padding: "0px 20px" /*, color: comment.exist || "grey"*/ }}
            // exist는 초기값으로 true를 가지며, removeComment를 통해 false로 변경된다.
          >
            <ViewerWithForwardedRef
              initialValue={comment.text}
              ref={el => (viewerRef.current[index] = el)}
            />
          </Box>

          <Button
            onClick={() => {
              onRemove(comment.id);
            }}
          >
            삭제
          </Button>
          {/* comment 수정 */}

          <>
            {openEditor === comment.id && (
              <EditorWithForwardedRef
                initialValue={comment.text}
                ref={commentRef}
              />
            )}
            <Button
              onClick={() => {
                if (comment.id === openEditor) {
                  onEdit(comment.id, index);
                  setOpenEditor("");
                } else {
                  setOpenEditor(comment.id);
                }
              }}
            >
              수정
            </Button>
          </>

          {/* 대댓글 컴포넌트 */}
          {/* <ReplyComment responseTo={comment.commentId} /> */}
          <Divider variant="middle" />
        </Box>
      ))}
    </Box>
  );
};

export default Comment;
