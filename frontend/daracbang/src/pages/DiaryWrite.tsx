import React, { useState } from "react";
import Head from "../components/Head";
import styled from "@emotion/styled";
import MyDarac from "../assets/images/room2.png";
import Dial from "../components/SpeedDial";
import {
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { uploadDiary } from "../api/diaryApi";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { isAxiosError } from "axios";
import { ResponseDataType } from "../api/responseType";
import { logoutAction } from "../store/memberReducer";
import { deleteToken } from "../utils/tokenUtil";
import Swal from "sweetalert2";

const Diary: React.FC = () => {
  const [scope, setScoop] = useState<string>("PUBLIC");
  const [content, setContent] = useState<string>("");
  const contentLeng = 1000;
  const member = useSelector((state: RootState) => {
    return state.memberReducer.member;
  });
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const onChangeScope = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScoop(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const submitDiary = async () => {
    if (content.length < 50) {
      Swal.fire({
        icon: "info",
        title: "50자 이상 작성해야 합니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    try {
      await uploadDiary(scope, content);
      Swal.fire({
        icon: "success",
        title: "등록 성공!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigator("/daracbang/" + member?.id);
    } catch (error) {
      if (isAxiosError<ResponseDataType>(error)) {
        if (error.response?.status === 401) {
          Swal.fire({
            icon: "info",
            title: "다시 로그인해주세요",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(logoutAction());
          deleteToken();
          navigator("/");
          return;
        }
        if (error.response?.status === 409 && error.response.data.errorCode === "DIARY_002") {
          Swal.fire({
            icon: "info",
            title: "오늘 이미 다이어리를 작성했습니다.",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
      }
      Swal.fire({
        icon: "error",
        title: "서버 에러..!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
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
        <img src={MyDarac} alt="myDarac" style={{ marginLeft: "50px", height: "300px", marginTop: "260px" }} />

        <ContentWrap>
          <Paper style={{ height: "530px", borderRadius: "10px", boxShadow: "3px 3px 5px 1px #bdbdbd" }}>
            <Typography
              style={{
                marginLeft: "50px",
                paddingTop: "30px",
                fontFamily: "omyu_pretty",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              공개범위
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
              onChange={onChangeScope}
            >
              <FormControlLabel
                value="PUBLIC"
                control={<Radio />}
                label="전체공개"
                style={{ marginRight: "80px" }}
                sx={{ ".MuiFormControlLabel-label": { fontFamily: "omyu_pretty", fontSize: "20px" } }}
              />
              <FormControlLabel
                value="NEIGHBOR"
                control={<Radio />}
                label="친구만공개"
                style={{ marginRight: "80px" }}
                sx={{ ".MuiFormControlLabel-label": { fontFamily: "omyu_pretty", fontSize: "20px" } }}
              />
              <FormControlLabel
                value="PRIVATE"
                control={<Radio />}
                label="나만보기"
                sx={{ ".MuiFormControlLabel-label": { fontFamily: "omyu_pretty", fontSize: "20px" } }}
              />
            </RadioGroup>
            <ThemeProvider theme={theme}>
              <TextField
                variant="outlined"
                multiline
                rows={10}
                value={content}
                className="no-scroll"
                onChange={onChangeContent}
                inputProps={{ maxLength: 1000 }}
                style={{
                  width: "600px",
                  height: "100px",
                  marginLeft: "50px",
                  marginTop: "30px",
                  fontFamily: "KyoboHand",
                }}
              >
                일기작성
              </TextField>
            </ThemeProvider>
            <Typography style={{ marginTop: "135px", marginLeft: "590px" }} sx={{ fontFamily: "omyu_pretty" }}>
              {content.length}/{contentLeng}
            </Typography>
            <Typography
              style={{ marginTop: "10px", marginLeft: "55px" }}
              sx={{ fontFamily: "omyu_pretty", color: "#B22727" }}
            >
              * 감정분석을 위해 최소 50자 이상 작성해야 등록이 가능합니다
            </Typography>

            <Button
              onClick={submitDiary}
              variant="outlined"
              style={{ left: "570px", marginTop: "10px", fontFamily: "omyu_pretty" }}
            >
              작성완료
            </Button>
          </Paper>
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
  padding-top: 40px;
  padding-bottom: 66px;
  textarea {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Navi = styled.div``;

const ContentWrap = styled.div`
  padding-top: 20px;
  margin-left: 150px;
  width: 700px;
`;

export default Diary;
