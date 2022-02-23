import React, { useEffect, useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Typography,
  List,
  Grid,
  ListItem,
  ListItemText,
  Skeleton,
  Button,
  Box,
  Stack
} from "@material-ui/core";
import { orderBy } from "lodash";

import ListSortTab from "src/components/etc/ListTab";
import { Icon } from "@iconify/react";

import heartOutlined from "@iconify/icons-ant-design/heart-outlined";
import commentOutlined from "@iconify/icons-ant-design/comment-outlined";

import { useRouter } from "next/router";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getQnasInitial } from "src/redux/slices/qna";

import { experimentalStyled as styled } from "@material-ui/core/styles";
import Searchbar from "../etc/Searchbar";

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(4)].map((_, index) => (
      <Grid item xs={12} md={3} key={index}>
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ height: 200, borderRadius: 2 }}
        />
        <Box sx={{ display: "flex", mt: 1.5 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "oldest", label: "좋아요순" }
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === "latest") {
    return orderBy(posts, ["created_at"], ["desc"]);
  }
  if (sortBy === "oldest") {
    return orderBy(posts, ["created_at"], ["asc"]);
  }
  if (sortBy === "popular") {
    return orderBy(posts, ["likes"], ["desc"]);
  }
  return posts;
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
    //backgroundColor: theme.palette.background.paper
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },

  listItem: {
    display: "inline-block",
    alignItems: "center",
    minHeight: "50px",
    lineHeight: "25px",

    // marginTop: '10px',
    backgroundColor: "white"
  },
  listItemText: {
    // maxWidth: '500px',
    fontSize: "20px"
  },
  itemBox: {
    textAlign: "center",
    fontSize: "1.1rem",
    display: "block",
    marginTop: "5px"
  }
}));

export default function QnaTable() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { qnaList } = useSelector(state => state.qna);
  const [filters, setFilters] = useState("latest");
  //const sortedPosts = applySort(qnaList, filters);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const classes = useStyles();

  const onListItemClick = (e, qnaId) => {
    e.preventDefault();
    //dispatch(addViewCount(qnaId));
    router.push(`/QnA/qnaPage`);
  };

  const handleChangeSort = (event, value) => {
    setFilters(value);
  };

  useEffect(() => {
    dispatch(getQnasInitial());
  }, [dispatch, qnaList.length]);
  return (
    <>
      <List className={classes.root}>
        <Searchbar />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: "2rem" }}
        >
          <ListSortTab
            query={filters}
            options={SORT_OPTIONS}
            onSort={handleChangeSort}
          />
          <Button onClick={() => router.push(`/QnA/qnaNewPost`)}>
            새 글 작성
          </Button>
        </Stack>

        {qnaList.length > 0 &&
          qnaList.map((qnaInfo, index) => {
            const labelId = `qna-${index}`;
            return (
              <Grid
                container
                sx={{ py: 3, textAlign: "center" }}
                key={qnaInfo.id}
              >
                <Link
                  href={{
                    pathname: "/QnA/qnaPage/",
                    query: { tab: qnaInfo.id }
                  }}
                >
                  <ListItem
                    className={classes.listItem}
                    key={index}
                    role={undefined}
                    dense
                    button
                    sx={{ borderRadius: 1, p: 3 }}
                  >
                    <ListItem>
                      <Avatar
                        style={{ marginRight: 10 }}
                        alt="Remy Sharp"
                        src={``}
                      />
                      <ListItemText primary={qnaInfo.user.profile.fk_user_id} />
                    </ListItem>
                    <ListItem>
                      <Typography variant="h4" gutterBottom>
                        {qnaInfo.title}
                      </Typography>
                    </ListItem>

                    <ListItem>
                      <ListItemText
                        className={classes.listItemText}
                        id={labelId}
                        primary={qnaInfo.text?.substr(0, 50)}
                      />
                    </ListItem>
                    <ListItem>
                      <Typography variant="subtitle1" gutterBottom>
                        {qnaInfo?.tags?.map((tagInfo, index) => (
                          <span style={{ marginRight: 5 }} key={index}>
                            #{tagInfo?.tag?.name}
                          </span>
                        ))}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <div style={{ marginLeft: 5 }}>
                        <Icon
                          icon={heartOutlined}
                          width={25}
                          height={25}
                          color="#676673"
                          style={{ position: "relative", top: 6 }}
                        />
                        <span style={{ paddingLeft: 5 }}>
                          {qnaInfo.aggregations.likes}명 좋아요
                        </span>
                      </div>
                      <div style={{ marginLeft: "5rem" }}>
                        <Icon
                          icon={commentOutlined}
                          width={25}
                          height={25}
                          color="#676673"
                          style={{ position: "relative", top: 6 }}
                        />
                        <span style={{ paddingLeft: 5 }}>
                          {qnaInfo.comments.length > 0
                            ? qnaInfo.comments.length
                            : 0}
                          명 코멘트
                        </span>
                      </div>
                    </ListItem>
                  </ListItem>
                </Link>
              </Grid>
            );
          })}
      </List>
    </>
  );
}
