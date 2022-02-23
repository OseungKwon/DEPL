import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Chip
} from "@material-ui/core";

function TagCard({ tag, index }) {
  const thypographyColor = "text.secondary";
  const { name, descriptions, postViews, qnaViews } = tag;
  return (
    <Card
      sx={{ width: 282, margin: 2, display: "flex", flexDirection: "column" }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <Chip label={name} />
        </Typography>

        <Typography variant="body2" color={thypographyColor}>
          {descriptions}
        </Typography>
      </CardContent>

      <CardActions style={{ marginTop: "auto" }}>
        <Typography variant="body2" align="left" color={thypographyColor}>
          총 {postViews}개의 포스트
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          <Typography variant="body2" color={thypographyColor}>
            총 {qnaViews}개의 질문
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
}

export default TagCard;
