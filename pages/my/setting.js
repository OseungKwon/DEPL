import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
// layouts
import MainLayout from "src/layouts/main";
import { Container, Stack, Grid } from "@material-ui/core";
// components
import Page from "src/components/Page";
import UserProfile from "src/components/user/UserProfile";
import UserMenu from "src/components/user/UserMenu";
import { MainContentStyle } from "src/style/style";
function setting() {
  const router = useRouter();

  return (
    <MainLayout>
      <MainContentStyle>
        <Page title="설정">
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <UserMenu menu="setting" />
              </Grid>
              <Grid item xs={12} md={9}>
                <UserProfile />
              </Grid>
            </Grid>
          </Container>
        </Page>
      </MainContentStyle>
    </MainLayout>
  );
}

export default setting;
