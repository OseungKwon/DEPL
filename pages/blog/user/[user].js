import { orderBy } from "lodash";
import { useSession } from "next-auth/client";
//import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useCallback, useState } from "react";
import heartFill from "@iconify/icons-eva/heart-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import roundPermMedia from "@iconify/icons-ic/round-perm-media";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
import { Icon } from "@iconify/react";
// material
import {
  Box,
  Card,
  Grid,
  Tabs,
  Tab,
  Button,
  Skeleton,
  Container,
  Stack
} from "@material-ui/core";
import { MainContentStyle } from "src/style/style";

import { experimentalStyled as styled } from "@material-ui/core/styles";
// redux
import { useSelector, useDispatch } from "react-redux";

import {
  getPosts,
  getFriends,
  getProfile,
  getFollowers,
  onToggleFollow
} from "src/redux/slices/user";

import InfiniteScroll from "react-infinite-scroll-component";
// components
import Page from "src/components/Page";
// layouts
import MainLayout from "src/layouts/main";
import NextLink from "next/link";
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileFollowers
} from "src/components/user/profile";
// ----------------------------------------------------------------------

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center"
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3)
  }
}));
export default function User() {
  const dispatch = useDispatch();
  const { myProfile, posts, followers, friends } = useSelector(
    state => state.user
  );
  const [currentTab, setCurrentTab] = useState("홈");
  const [findFriends, setFindFriends] = useState("");

  const [filters, setFilters] = useState("latest");
  const [session, loading] = useSession();

  const handleChangeSort = (event, value) => {
    setFilters(value);
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const handleFindFriends = event => {
    setFindFriends(event.target.value);
  };

  const PROFILE_TABS = [
    {
      value: "홈",
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Profile myProfile={myProfile} posts={posts} />
    },
    {
      value: "블로그",
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Profile myProfile={myProfile} posts={posts} />
    },
    {
      value: "팔로워",
      icon: <Icon icon={peopleFill} width={20} height={20} />,
      component: (
        <ProfileFriends
          friends={friends}
          findFriends={findFriends}
          onFindFriends={handleFindFriends}
        />
      )
    }
  ];
  return (
    <MainLayout>
      <MainContentStyle>
        <Page title="블로그">
          <Container sx={{ paddingTop: 10 }}>
            <Card
              sx={{
                mb: 3,
                height: 280,
                position: "relative"
              }}
            >
              <ProfileCover myProfile={myProfile} />

              <TabsWrapperStyle>
                <Tabs
                  value={currentTab}
                  scrollButtons="auto"
                  variant="scrollable"
                  allowScrollButtonsMobile
                  onChange={handleChangeTab}
                >
                  {PROFILE_TABS.map(tab => (
                    <Tab
                      disableRipple
                      key={tab.value}
                      value={tab.value}
                      icon={tab.icon}
                      label={tab.value}
                    />
                  ))}
                </Tabs>
              </TabsWrapperStyle>
            </Card>

            {PROFILE_TABS.map(tab => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </Container>
        </Page>
      </MainContentStyle>
    </MainLayout>
  );
}
