import React, { useState } from "react";
import MainLayout from "src/layouts/main";
import { MainContentStyle } from "src/style/style";
import Page from "src/components/Page";
import { Typography, Tabs, Tab, Button } from "@material-ui/core";
import QnaDetails from "src/components/qnaComponents/QnaDetails";
const qnaPage = () => {
  return (
    <MainLayout>
      <MainContentStyle>
        <QnaDetails />
      </MainContentStyle>
    </MainLayout>
  );
};

export default qnaPage;
