import React from "react";
import { Card, Typography } from "@mui/material";
import { DiaryDetail } from "../api/diaryApi";
import { formatDate } from "../utils/dateUtil";
import { getSentimentDiaryEmozi } from "../utils/getSentimentEmozi";

export type DayDiaryProps = {
  diary: DiaryDetail;
};

const DayDiary: React.FC<DayDiaryProps> = ({ diary }: DayDiaryProps) => {
  return (
    <div>
      <Typography
        style={{
          fontFamily: "omyu_pretty",
          fontWeight: "bold",
          fontSize: "20px",
          marginLeft: "50px",
          marginTop: "15px",
          marginRight: "50px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {formatDate(diary?.createdAt)}
          <img
            src={getSentimentDiaryEmozi(diary.sentimentResult)}
            alt="happy"
            style={{ height: "30px", marginLeft: "20px", marginTop: "7px" }}
          />
        </div>
      </Typography>

      <Card
        style={{
          maxHeight: "250px",
          width: "600px",
          marginLeft: "50px",
          padding: "20px",
          marginTop: "10px",
          borderRadius: "10px",
          boxShadow: "3px 3px 3px #eeeeee",
          borderStyle: "solid",
          borderColor: "#eeeeee",
          borderWidth: "1px",
          overflowY: "scroll",
        }}
        className="noscroll"
      >
        <Typography style={{ fontFamily: "KyoboHand" }}>{diary?.content}</Typography>
      </Card>
    </div>
  );
};

export default DayDiary;
