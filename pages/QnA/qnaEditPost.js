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
import QnaEditPostForm from "src/components/qnaComponents/QnaEditPostForm";

//import { useSession } from "next-auth/client";
// ----------------------------------------------------------------------

export default function qnaEditPost() {
  //const [session, loading] = useSession();

  return (
    <MainLayout>
      <MainContentStyle>
        <Page title="Blog: New Post | Minimal-UI">
          <Container>
            <>
              <QnaEditPostForm />
            </>
          </Container>
        </Page>
      </MainContentStyle>
    </MainLayout>
  );
}
