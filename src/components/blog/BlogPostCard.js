import { useRouter } from "next/router";

import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { paramCase } from "change-case";
import eyeFill from "@iconify/icons-eva/eye-fill";
import { Link as RouterLink } from "react-router-dom";
import shareFill from "@iconify/icons-eva/share-fill";
import messageCircleFill from "@iconify/icons-eva/message-circle-fill";
// material
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  CardActionArea
} from "@material-ui/core";
// routes
import { PATH_BLOG } from "../../routes/paths";
// utils
import { fDate } from "../../utils/formatTime";
import { fShortenNumber } from "../../utils/formatNumber";
//
import SvgIconStyle from "../SvgIconStyle";
import React from "react";
// ----------------------------------------------------------------------

const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)"
});

const TitleStyle = styled(Typography)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical"
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute"
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function BlogPostCard({ post, index, maxDivide }) {
  const { cover, title, view, comment, share, author, createdDate, postId } =
    post;
  // const linkTo = `${PATH_BLOG.root}/${paramCase(title)}`;
  const linkTo = `${PATH_BLOG.root}/${postId}`;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: messageCircleFill },
    { number: view, icon: eyeFill },
    { number: share, icon: shareFill }
  ];

  return (
    <Grid item xs={12} sm={6} md={maxDivide}>
      <Card sx={{ position: "relative" }}>
        <CardActionArea href={linkTo}>
          <CardMediaStyle
            sx={{
              ...{
                pt: "calc(100% * 4 / 3)",
                "&:after": {
                  top: 0,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  bgcolor: theme => alpha(theme.palette.grey[900], 0.72)
                }
              },
              ...{
                pt: {
                  xs: "calc(100% * 4 / 3)",
                  sm: "calc(100% * 3 / 4.66)"
                }
              }
            }}
          >
            <SvgIconStyle color="paper" src="/static/icons/shape-avatar.svg" />
            <AvatarStyle alt={post.name} src={post.avatarUrl} />

            <CoverImgStyle alt={title} src={cover} />
          </CardMediaStyle>

          <CardContent
            sx={{
              pt: 4
            }}
          >
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block" }}
            >
              {fDate(createdDate)}
            </Typography>

            <TitleStyle
              color="inherit"
              variant="subtitle2"
              sx={{
                ...{ typography: "h5", height: 60 }
              }}
            >
              {title}
            </TitleStyle>

            <InfoStyle>
              {POST_INFO.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: index === 0 ? 0 : 1.5,
                    ...{
                      color: "grey.500"
                    }
                  }}
                >
                  <Box
                    component={Icon}
                    icon={info.icon}
                    sx={{ width: 16, height: 16, mr: 0.5 }}
                  />
                  <Typography variant="caption">
                    {fShortenNumber(info.number)}
                  </Typography>
                </Box>
              ))}
            </InfoStyle>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
