import { useState } from "react";
import NextLink from "next/link";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { IconButton } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import {
  Grid,
  Paper,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { MCheckbox } from "../@material-extend";
import Block from "../Block";
// utils
import { fShortenNumber } from "../../utils/formatNumber";
// redux
import { useDispatch } from "src/redux/store";
import { editLikes } from "src/redux/slices/like";
// routes
import { PATH_BLOG } from "../../routes/paths";
import { useSession } from "next-auth/client";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
function BlogEtc({ post }) {
  const dispatch = useDispatch();
  const [session, loading] = useSession();
  const [checked, setChecked] = useState(post.likeId);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const checkUserSession = post?.email === session?.user?.email ? true : false;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { favorite, tags, favoritePerson, postId } = post;
  const ListWrapperStyle = styled(Paper)(({ theme }) => ({
    width: "100%",
    border: `solid 1px ${theme.palette.divider}`
  }));
  const editLink = `${PATH_BLOG.general.editPost}/${postId}`;

  const checkHandler = e => {
    const updateCount = checked ? -1 : 1;
    setChecked(!checked);
    setLikeCount(likeCount + updateCount);
    const requsetBody = {
      likeId: post.likeId,
      contentId: post.postId ?? post.qnaId,
      likeCount: updateCount,
      userEmail: session?.user?.email,
      contentType: "qna"
    };
    dispatch(editLikes(requsetBody, "qna"));
  };
  return (
    <>
      <ListWrapperStyle>
        <List
          component="nav"
          aria-label="좋아요"
          style={{ textAlign: "center" }}
        >
          <ListItem button>
            <Checkbox
              style={{ paddingLeft: "12px" }}
              color="error"
              icon={<FavoriteBorder />}
              checked={checked}
              checkedIcon={<Favorite />}
              onChange={checkHandler}
            />
          </ListItem>
          {likeCount}
          <Divider />
          <ListItem button>
            <IconButton color="secondary" aria-label="공유">
              <ShareOutlinedIcon />
            </IconButton>
            {/* <ListItemText primary="Inbox" /> */}
          </ListItem>

          {session && checkUserSession && (
            <>
              <Divider />
              <ListItem button>
                <NextLink href={editLink} passHref>
                  <IconButton aria-label="수정">
                    <EditOutlinedIcon />
                  </IconButton>
                </NextLink>

                {/* <ListItemText primary="Inbox" /> */}
              </ListItem>
              <Divider />
              <ListItem button>
                <IconButton aria-label="삭제">
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
                {/* <ListItemText primary="Inbox" /> */}
              </ListItem>
            </>
          )}
        </List>
      </ListWrapperStyle>
    </>
  );
}

export default BlogEtc;
