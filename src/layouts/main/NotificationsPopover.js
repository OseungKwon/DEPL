import faker from "faker";
import PropTypes from "prop-types";
import { noCase } from "change-case";
import { useRef, useState } from "react";
import Link from "next/link";
import { set, sub, formatDistanceToNow } from "date-fns";
import { Icon } from "@iconify/react";
import bellFill from "@iconify/icons-eva/bell-fill";
import clockFill from "@iconify/icons-eva/clock-fill";
import doneAllFill from "@iconify/icons-eva/done-all-fill";
// material
import { alpha } from "@material-ui/core/styles";
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar
} from "@material-ui/core";
// components
import Scrollbar from "../../components/Scrollbar";
import MenuPopover from "../../components/MenuPopover";
import { MIconButton } from "../../components/@material-extend";

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: "누구누구의 글",
    description: "글을올였어여",
    avatar: null,
    type: "order_placed",
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true
  },
  {
    id: faker.datatype.uuid(),
    title: "누구누구의 신규 글 2",
    description: "ㅇㅇㅇㅇㅇㅇㅇ",
    avatar: null,
    type: "friend_interactive",
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true
  },
  {
    id: faker.datatype.uuid(),
    title: "누구누구가 내 글에 댓을을 달았습니다.",
    description: "뭐시기뭐시기...",
    avatar: null,
    type: "chat_message",
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false
  },
  {
    id: faker.datatype.uuid(),
    title: "누구누구가 내 Q&A에 답글을 달았습니다.",
    description: "이 문제는 이렇게 저렇게...",
    avatar: null,
    type: "mail",
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false
  }
];

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === "order_placed") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_package.svg"
        />
      ),
      title
    };
  }
  if (notification.type === "order_shipped") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_shipping.svg"
        />
      ),
      title
    };
  }
  if (notification.type === "mail") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_mail.svg"
        />
      ),
      title
    };
  }
  if (notification.type === "chat_message") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_chat.svg"
        />
      ),
      title
    };
  }
  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title
  };
}

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);
  return (
    <ListItem
      button
      to="#"
      disableGutters
      component={""}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected"
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled"
            }}
          >
            <Box
              component={Icon}
              icon={clockFill}
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {formatDistanceToNow(new Date(notification.createdAt))}
          </Typography>
        }
      />
    </ListItem>
  );
}

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const totalUnRead = notifications.filter(
    item => item.isUnRead === true
  ).length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        isUnRead: false
      }))
    );
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        color={open ? "primary" : "default"}
        sx={{
          ...(open && {
            bgcolor: theme =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              )
          })
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">
              읽지 않은 알림 {totalUnRead} 개
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <MIconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                새로운 알림
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                이전 알림
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple to="#">
            더 많은 알림 보기
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
