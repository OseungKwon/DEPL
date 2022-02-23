import { experimentalStyled as styled } from "@material-ui/core/styles";

export const MainContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "flex",
  paddingTop: 5,
  paddingBottom: 50,
  backgroundColor: theme.palette.background.default
}));
