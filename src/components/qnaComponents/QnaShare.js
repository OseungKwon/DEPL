import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Icon } from "@iconify/react";
import heartOutlined from "@iconify/icons-ant-design/heart-outlined";
import heartFilled from "@iconify/icons-ant-design/heart-filled";
import externalLinkFill from "@iconify/icons-eva/external-link-fill";

import { Stack, Button, Paper, Popover, Box } from "@material-ui/core";

import { toggleLike, viewQnaCount } from "src/redux/slices/qna";

export default function QnaShare() {
  const qna = useSelector(state => state.qna.qna);
  const dispatch = useDispatch();

  const [like, setLike] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [copyed, setCopyed] = useState(false);
  console.log("like", like);
  const onClickLike = async () => {
    dispatch(toggleLike(qna.id, like));
    setLike(!like);
  };

  useEffect(() => {
    setLike(
      Boolean(
        qna?.likes.find(
          el => el.fk_user_id === "a4b74926-30e3-43a3-9d9f-d4524e7748ae"
        )
      )
    );
  }, [qna?.likes]);
  return (
    <>
      <Paper
        sx={{
          p: 1,
          mb: 2,
          mt: 22,
          width: 50,
          height: 50
        }}
      >
        <Stack
          onClick={onClickLike}
          sx={{
            cursor: "pointer"
          }}
        >
          {like ? (
            <Icon icon={heartFilled} color="#f12" width={33} height={33} />
          ) : (
            <Icon icon={heartOutlined} color="#676673" width={33} height={33} />
          )}
        </Stack>
      </Paper>
      <Paper sx={{ p: 1, width: 50, height: 50 }}>
        <Stack
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          sx={{ cursor: "pointer" }}
        >
          <Icon
            icon={externalLinkFill}
            color="#676673"
            width={33}
            height={33}
          />
        </Stack>
      </Paper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <Box
          sx={{ p: 1, pl: 1, pr: 1, display: "flex", flexDirection: "column" }}
        >
          <Button sx={{ color: "gray", fontSize: "1rem", pl: 3, pr: 3 }}>
            SNS 공유
          </Button>
          {/* <CopyToClipboard text={window.location.href}>
            <Button
              sx={{ color: "gray", fontSize: "1rem", pl: 3, pr: 3 }}
              onClick={() => {
                setCopyed(true);
              }}
            >
              {copyed ? "(복사되었습니다)" : "링크 공유"}
            </Button>
          </CopyToClipboard> */}
        </Box>
      </Popover>
    </>
  );
}
