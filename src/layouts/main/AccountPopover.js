import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import bookFill from "@iconify/icons-eva/book-fill";

// next
import NextLink from "next/link";
// material
import { alpha } from "@material-ui/core/styles";
import {
  Box,
  Avatar,
  Button,
  Divider,
  MenuItem,
  Typography
} from "@material-ui/core";
// components
import MenuPopover from "../../components/MenuPopover";
import { MIconButton } from "../../components/@material-extend";
import { signOut, useSession } from "next-auth/client";
// routes
import { PATH_MY } from "../../routes/paths";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  { label: "내 블로그", icon: homeFill, linkTo: PATH_MY.blog },
  { label: "글 목록", icon: bookFill, linkTo: PATH_MY.posts },
  { label: "설정", icon: settings2Fill, linkTo: PATH_MY.setting }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [session, loading] = useSession();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        style={{ marginLeft: "10px" }}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: theme => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar alt="My Avatar" src={session?.user.image} />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {session?.user.name}님
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {session?.user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map(option => (
          <NextLink key={option.label} href={option.linkTo}>
            <MenuItem
              onClick={handleClose}
              sx={{ typography: "body2", py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24
                }}
              />
              {option.label}
            </MenuItem>
          </NextLink>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={e => signOut()}
          >
            로그아웃
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
