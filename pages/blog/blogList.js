import { orderBy } from "lodash";
import { useSession } from "next-auth/client";
//import { Link as RouterLink } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useCallback, useState } from "react";
// material
import {
  Box,
  Grid,
  Button,
  Skeleton,
  Container,
  Stack
} from "@material-ui/core";
import { MainContentStyle } from "src/style/style";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getPostsInitial, getMorePosts } from "src/redux/slices/blog";
// routes
import { PATH_BLOG } from "src/routes/paths";
// components
import Page from "src/components/Page";
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch
} from "src/components/blog";
import Searchbar from "src/components/etc/Searchbar";
import ListSortTab from "src/components/etc/ListTab";
// layouts
import MainLayout from "src/layouts/main";
import NextLink from "next/link";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "oldest", label: "좋아요순" }
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === "latest") {
    return orderBy(posts, ["createdAt"], ["desc"]);
  }
  if (sortBy === "oldest") {
    return orderBy(posts, ["createdAt"], ["asc"]);
  }
  if (sortBy === "popular") {
    return orderBy(posts, ["view"], ["desc"]);
  }
  return posts;
};

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

export default function BlogPosts() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState("latest");
  const [session, loading] = useSession();
  const { posts, hasMore, index, step } = useSelector(state => state.blog);
  const sortedPosts = applySort(posts, filters);
  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);
  useEffect(() => {
    dispatch(getPostsInitial(index, step));
  }, [dispatch, index, step]);

  const handleChangeSort = (event, value) => {
    setFilters(value);
  };

  return (
    <MainLayout>
      <Searchbar />
      <MainContentStyle>
        <Page title="포스트 목록">
          <Container>
            <Stack
              mb={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <ListSortTab
                query={filters}
                options={SORT_OPTIONS}
                onSort={handleChangeSort}
              />
              {session && (
                <>
                  <NextLink href="/blog/blogNewPost" passHref>
                    <Button
                      variant="contained"
                      startIcon={<Icon icon={plusFill} />}
                    >
                      글쓰기
                    </Button>
                  </NextLink>
                </>
              )}
            </Stack>

            <InfiniteScroll
              next={onScroll}
              hasMore={hasMore}
              loader={SkeletonLoad}
              dataLength={posts.length}
              style={{ overflow: "inherit" }}
            >
              <Grid container spacing={3}>
                {sortedPosts.map((post, index) => (
                  <BlogPostCard
                    key={index}
                    post={post}
                    index={index}
                    maxDivide={3}
                  />
                ))}
              </Grid>
            </InfiniteScroll>
          </Container>
        </Page>
      </MainContentStyle>
    </MainLayout>
  );
}
