import { Button, Card, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import Ban from "../assets/images/ban.png";
import Plus from "../assets/images/plus.png";
import styled from "@emotion/styled";
import { NeighborObject } from "../api/neighborApi";
import { useNavigate } from "react-router-dom";

interface RequestNeighProps {
  data: NeighborObject;
  onAccpet: (id: number) => void;
  onReject: (id: number) => void;
}

export default function RequestNeigh({ data, onAccpet, onReject }: RequestNeighProps) {
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
        <img src={data?.profileImage} alt="sun" style={{ height: "20px", marginLeft: "10px" }} />
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
              marginRight: "100px",
              lineHeight: "30px",
            }}
          >
            {data?.nickname}
          </Typography>
        </Tooltip>
        <Tooltip title="요청 승인">
          <Button onClick={() => onAccpet(data.neighborId)} style={{ marginLeft: "30px", padding: 0 }}>
            <img src={Plus} alt="plus" style={{ height: "20px" }} />
          </Button>
        </Tooltip>
        <Tooltip title="요청 거절">
          <Button onClick={() => onReject(data.neighborId)} style={{ padding: 0 }}>
            <img src={Ban} alt="ban" style={{ height: "20px" }} />
          </Button>
        </Tooltip>
      </NeighInfo>
    </Card>
  );
}

const NeighInfo = styled.div``;
