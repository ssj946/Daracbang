import { Card, CardContent, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { CommentType } from "../api/commentsApi";
import { getSentimentCommentEmozi } from "../utils/getSentimentEmozi";
export type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
  return (
    <Card style={{ height: "100px", width: "600px", marginLeft: "50px", marginTop: "15px" }}>
      <NeighInfo style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
        <img src={comment.profileImage} alt="sun" style={{ height: "20px", marginLeft: "10px" }} />
        <Typography style={{ fontFamily: "omyu_pretty", fontWeight: "bold", marginLeft: "10px" }}>
          {comment.nickname}
        </Typography>
        <img
          src={getSentimentCommentEmozi(comment.sentimentResult)}
          alt="sun"
          style={{ height: "20px", marginLeft: "490px" }}
        />
      </NeighInfo>
      <CardContent style={{ fontFamily: "KyoboHand" }}>{comment.content}</CardContent>
    </Card>
  );
}

const NeighInfo = styled.div``;
