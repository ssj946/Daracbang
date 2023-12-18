import { Button, Card, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import Ban from "../assets/images/ban.png";
import Plus from "../assets/images/plus.png";
import styled from "@emotion/styled";
import { MemberSearchObject } from "../api/neighborApi";
import { hover } from "@testing-library/user-event/dist/hover";
import { useNavigate } from "react-router-dom";

interface SearchNeighProps {
  data: MemberSearchObject;
  onApplicate: (id: number) => void;
  onCancel: (id: number) => void;
}

const SearchNeigh: React.FC<SearchNeighProps> = ({ data, onApplicate, onCancel }) => {
  const navigator = useNavigate();
  return (
    <Card
      style={{
        height: "50px",
        width: "360px",
        margin: "15px auto",
        boxShadow: "2px 2px 1px 1px #eeeeee",
        borderRadius: "10px",
      }}
    >
      <NeighInfo style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
        <img src={data?.profileImage} alt="sun" style={{ height: "30px", marginLeft: "10px", width: "50px" }} />
        <Tooltip
          title="다락방 이동"
          placement="top-start"
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigator(`/daracbang/${data.memberId}`)}
        >
          <Typography
            style={{
              fontFamily: "omyu_pretty",
              fontWeight: "bold",
              width: "100px",
              marginLeft: "10px",
              lineHeight: "30px",
              whiteSpace: "nowrap",
            }}
          >
            {data.nickname}
          </Typography>
        </Tooltip>
        {data.isNeighborRequest ? (
          <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
            <Typography
              style={{
                fontFamily: "omyu_pretty",
                fontWeight: "bold",
                width: "100px",
                marginLeft: "50px",
                textAlign: "center",
                lineHeight: "30px",
              }}
            >
              신청 대기중
            </Typography>
            <Tooltip title="신청 취소">
              <Button onClick={() => onCancel(data.memberId)} style={{}}>
                <img src={Ban} alt="plus" style={{ height: "20px" }} />
              </Button>
            </Tooltip>
          </div>
        ) : data.isNeighbor ? (
          <Typography
            style={{
              fontFamily: "omyu_pretty",
              fontWeight: "bold",
              width: "100px",
              marginLeft: "50px",
              lineHeight: "30px",
            }}
          >
            이미 이웃입니다!
          </Typography>
        ) : (
          <Tooltip title="이웃 신청">
            <Button onClick={() => onApplicate(data.memberId)} style={{ marginLeft: "120px" }}>
              <img src={Plus} alt="plus" style={{ height: "20px" }} />
            </Button>
          </Tooltip>
        )}
      </NeighInfo>
    </Card>
  );
};

const NeighInfo = styled.div``;

export default SearchNeigh;
