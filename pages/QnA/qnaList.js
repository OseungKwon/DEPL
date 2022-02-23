// style
import { MainContentStyle } from "src/style/style";
import { Grid } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";
// layouts
import MainLayout from "src/layouts/main";
// components
import LeftBarMenu from "src/components/etc/LeftBarMenu";
import QnaTable from "src/components/qnaComponents/QnaTable";
// etc
import { orderBy } from "lodash";

// setStyle
const RootStyles = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor: theme.palette.background.neutral
}));

// QnaList Page
export default function QnaList() {
  return (
    <MainLayout>
      <MainContentStyle>
        <RootStyles>
          <Grid container spacing={2}>
            <Grid item xs={2} sx={{ m: 4 }}>
              <LeftBarMenu />
            </Grid>
            <Grid item xs={8}>
              <QnaTable />
            </Grid>
          </Grid>
        </RootStyles>
      </MainContentStyle>
    </MainLayout>
  );
}
