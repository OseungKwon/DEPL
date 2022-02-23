import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Box, Button, AppBar, Toolbar, Container } from "@material-ui/core";
// hooks
import useOffSetTop from "../../hooks/useOffSetTop";
// components
import Logo from "../../components/Logo";
import Label from "../../components/Label";
import { MHidden } from "../../components/@material-extend";
//
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./MenuConfig";
import LoginModal from "../../components/auth/LoginModal";
import AccountPopover from "./AccountPopover";
import MainSearchBar from "./MainSearchBar";
import NotificationsPopover from "./NotificationsPopover";
// import Link from 'next/link'
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const [session, loading] = useSession();
  const isOffset = useOffSetTop(100);
  const { pathname } = useRouter();
  const isHome = pathname === "/";

  return (
    <AppBar sx={{ boxShadow: 0 }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: "background.default",
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <a
            href="/"
            style={{
              backgroundColor: "white",
              textDecoration: "none",
              fontSize: 25
            }}
          >
            QLICK
          </a>
          <Box sx={{ flexGrow: 1 }} />
          <MainSearchBar />
          <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>

          <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
          {!session ? (
            <LoginModal />
          ) : (
            <>
              <NotificationsPopover />
              <AccountPopover />
            </>
          )}
        </Container>
      </ToolbarStyle>
      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
