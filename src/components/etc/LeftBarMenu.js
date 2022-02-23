import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { Typography, List, ListItem, Box } from "@material-ui/core";

const topTags = [
  {
    key: "android"
  },
  {
    key: "backend"
  },
  {
    key: "c/c++"
  },
  {
    key: "css"
  }
];

export default function LeftBarMenu() {
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  //const sortedPosts = applySort(qnaList, filters);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "20%", position: "fixed", marginTop: "4rem" }}>
      <List sx={{ width: "80%" }}>
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
          홈
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          팔로잉
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
          보관함
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
        >
          확인한 글
        </ListItem>
      </List>
      <Typography sx={{ mx: 2, mt: 2, fontWeight: "bold", color: "gray" }}>
        Top tags
      </Typography>
      <List>
        {topTags.map(tag => (
          <ListItem button key={tag.key}>
            {tag.key}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
