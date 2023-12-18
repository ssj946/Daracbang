import React, { useEffect } from "react";
import Head from "../components/Head";
import styled from "@emotion/styled";
import MyDarac from "../assets/images/room2.png";
import Dial from "../components/SpeedDial";
import NeighPost from "../components/NeighPost";
import { Button, Card, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import Sun from "../assets/images/sun.png";
import { GuestBookObject, getGuestBook, writeGuestBook } from "../api/guestBookApi";
import { GuestBookEntry } from "../api/guestBookApi";

import { useParams } from "react-router-dom";
import { getMyMemberInfo } from "../api/memberApi";
import { formatDate } from "../utils/dateUtil";
import Swal from "sweetalert2";

const Guestbook = () => {
  const parm = useParams();
  console.log(parm.memberId);

  const [guestBook, setGuestBook] = React.useState<GuestBookObject | null>(null);
  const [entry, setEntry] = React.useState(new GuestBookEntry(""));
  const [userNickname, setUserNickname] = React.useState("");
  const [today, setToday] = React.useState("");

  useEffect(() => {
    getUserInfo();
    if (parm.memberId) {
      getOne(parseInt(parm.memberId));
    }

    // 삭제 성공 이벤트 리스너를 등록
    const handleDeleteSuccess = () => {
      if (parm.memberId) {
        getOne(parseInt(parm.memberId));
      }
    };
    window.addEventListener("deleteSuccess", handleDeleteSuccess);

    return () => {
      window.removeEventListener("deleteSuccess", handleDeleteSuccess);
    };
  }, [parm.memberId]);

  async function getOne(id: number) {
    const response = await getGuestBook(id);
    setGuestBook(response.data);
  }

  const getUserInfo = async () => {
    try {
      const response = await getMyMemberInfo();
      setUserNickname(response.data.nickname);
      setToday(formatDate(new Date().toISOString().slice(0, 10)));
    } catch (error) {
      console.error("Failed to get user info", error);
      Swal.fire({
        icon: "error",
        title: "서버 에러..!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntry(new GuestBookEntry(event.target.value));
  };

  const handleButtonClick = async () => {
    if (!parm.memberId) {
      console.error("memberId is undefined");
      return;
    }
    if (entry.content.trim() === "") {
      Swal.fire({
        icon: "info",
        title: "내용을 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const ownerId = parseInt(parm.memberId);
    try {
      await writeGuestBook(ownerId, entry);
      Swal.fire({
        icon: "success",
        title: "방명록을 작성했습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      setEntry(new GuestBookEntry(""));
      getOne(ownerId);
    } catch (error) {
      console.error("Failed to write guest book", error);
      Swal.fire({
        icon: "error",
        title: "서버 에러..!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "KyoboHand",
    },
  });

  return (
    <div>
      <Head />
      <ContainerWrap style={{ backgroundColor: "#F2EBEB" }}>
        <img src={MyDarac} alt="myDarac" style={{ marginLeft: "80px", height: "300px", marginTop: "300px" }} />

        <ContentWrap>
          <Card
            style={{
              height: "480px",
              width: "700px",
              backgroundColor: "rgba( 255, 255, 255, 0.3 )",
              marginLeft: "130px",
            }}
          >
            {guestBook && guestBook.datas.map((item, index) => <NeighPost key={index} data={item} />)}
          </Card>

          <Card style={{ height: "135px", width: "700px", marginLeft: "130px", marginTop: "10px" }}>
            <NeighInfo style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
              <img src={Sun} alt="sun" style={{ height: "20px", marginLeft: "10px" }} />
              <Typography style={{ fontFamily: "omyu_pretty", fontWeight: "bold", marginLeft: "10px" }}>
                {userNickname}
              </Typography>
              <Typography
                style={{ height: "20px", marginLeft: "510px", fontFamily: "omyu_pretty", fontWeight: "bold" }}
              >
                {today}
              </Typography>
            </NeighInfo>
            <ThemeProvider theme={theme}>
              <TextField
                style={{ fontFamily: "KyoboHand", width: "650px", marginLeft: "25px", marginTop: "10px" }}
                value={entry.content}
                onChange={handleContentChange}
              ></TextField>
            </ThemeProvider>
            <Button
              variant="outlined"
              style={{ fontFamily: "omyu_pretty", marginLeft: "580px", marginTop: "5px", height: "25px" }}
              onClick={handleButtonClick}
            >
              방명록남기기
            </Button>
          </Card>
        </ContentWrap>
        <Navi style={{ transform: "translateZ(0px)", flexGrow: 1 }}>
          <Dial />
        </Navi>
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 22px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Navi = styled.div``;

const NeighInfo = styled.div``;

export default Guestbook;
