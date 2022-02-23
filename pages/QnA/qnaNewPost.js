// material
import { Container } from "@material-ui/core";
import { MainContentStyle } from "src/style/style";
// routes
import { PATH_BLOG } from "src/routes/paths";
// components
import Page from "src/components/Page";
import React from "react";

// layouts
import MainLayout from "src/layouts/main";
import QnaNewPostForm from "src/components/qnaComponents/QnaNewPostForm";

//import { useSession } from "next-auth/client";
// ----------------------------------------------------------------------

export default function qnaNewPost() {
  //const [session, loading] = useSession();

  return (
    <MainLayout>
      <MainContentStyle>
        <Page title="Blog: New Post | Minimal-UI">
          <Container>
            <>
              <QnaNewPostForm />
            </>
          </Container>
        </Page>
      </MainContentStyle>
    </MainLayout>
  );
}
