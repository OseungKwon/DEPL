import { orderBy } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useCallback, useState } from "react";
// material
import {
  Box,
  Grid,
  Button,
  Skeleton,
  Container,
  OutlinedInput,
  InputAdornment,
  Stack
} from "@material-ui/core";
import searchFill from "@iconify/icons-eva/search-fill";
import { MainContentStyle } from "src/style/style";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getTagsInitial } from "src/redux/slices/tags";

// components
import Page from "src/components/Page";
import { TagCard } from "src/components/tags";
import ListSortTab from "src/components/etc/ListTab";
// layouts
import MainLayout from "src/layouts/main";
import NextLink from "next/link";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import axios from "src/utils/axios";
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "popular", label: "인기순" },
  { value: "name", label: "이름순" },
  { value: "latest", label: "최신순" }
];
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

export default function TagList() {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tag.tagList);
  const [filters, setFilters] = useState("popular");
  const [searchResults, setSearchResults] = useState([]);

  const { posts, hasMore, index, step } = useSelector(state => state.blog);
  const sortedPosts = applySort(posts, filters);
  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);

  const handleChangeSort = (event, value) => {
    setFilters(value);
  };

  const handleFilterByTag = async event => {
    try {
      const { value } = event.target;
      if (value) {
        const response = await axios.get("/api/tags", {
          params: { query: value }
        });
        setSearchResults(response.data.tags);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
    // setFilterTag(event.target.value);
  };
  useEffect(() => {
    dispatch(getTagsInitial());
  }, []);
  return (
    <MainLayout>
      <MainContentStyle>
        <Page title="태그 목록">
          <Container>
            <Stack
              mb={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row">
                <OutlinedInput
                  onChange={handleFilterByTag}
                  placeholder="태그검색"
                  startAdornment={
                    <InputAdornment position="start">
                      <Box
                        component={Icon}
                        icon={searchFill}
                        sx={{ color: "text.disabled" }}
                      />
                    </InputAdornment>
                  }
                  sx={{ marginTop: 10 }}
                />
              </Stack>
              <ListSortTab
                query={filters}
                options={SORT_OPTIONS}
                onSort={handleChangeSort}
                style={{ marginTop: 70 }}
              />
            </Stack>

            {/* <InfiniteScroll
              next={onScroll}
              hasMore={hasMore}
              loader={SkeletonLoad}
              style={{ overflow: "inherit" }}
            > */}
            <Grid container spacing={3}>
              {searchResults.map((tag, index) => (
                <TagCard key={index} tag={tag} index={index} maxDivide={3} />
              ))}
            </Grid>
            {/* <Grid container spacing={3}>
              {tags.map((tag, index) => (
                <TagCard key={index} tag={tag} index={index} maxDivide={3} />
              ))}
            </Grid> */}
            {/* </InfiniteScroll> */}
          </Container>
        </Page>
      </MainContentStyle>
    </MainLayout>
  );
}
