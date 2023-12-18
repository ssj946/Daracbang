import React, { useEffect, useState } from "react";
import Head from "../components/Head";
import styled from "@emotion/styled";
import MyDarac from "../assets/images/room2.png";
import MoodTracker from "../components/MoodTracker";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Dial from "../components/SpeedDial";
import DayDiary from "../components/DayDiary";
import Comment from "../components/Comment";
import Foot from "../assets/images/foot.png";
import FootPrint from "../assets/images/footprint.png";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDetail, MoodTrackerItemType, getDiaryDeatailApi } from "../api/diaryApi";
import { useDispatch } from "react-redux";
import { logoutAction } from "../store/memberReducer";
import { deleteToken } from "../utils/tokenUtil";
import { isAxiosError } from "axios";
import { ResponseDataType } from "../api/responseType";
import { CommentType, createCommentApi, getCommentApi } from "../api/commentsApi";
import Swal from "sweetalert2";

const Diary = () => {
  const [open, setOpen] = React.useState(false);
  const [diary, setDiary] = useState<DiaryDetail | null>(null);
  const [activeDiary, setActiveDiary] = useState<MoodTrackerItemType | null>(null);
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const onActive = (diary: MoodTrackerItemType) => {
    setActiveDiary(diary);
  };
  const [content, setContent] = useState<string>("");
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const param = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitComment = async () => {
    if (content.trim().length === 0) {
      Swal.fire({
        icon: "info",
        title: "댓글을 입력해주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    try {
      await createCommentApi(diary!.id, content);
      Swal.fire({
        icon: "success",
        title: "댓글 등록 성공",
        showConfirmButton: false,
        timer: 1500,
      });
      handleClose();
      getCommentList(diary!.id);
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
        console.error(error);
      }
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "KyoboHand",
    },
  });

  useEffect(() => {
    if (activeDiary != null) {
      getDiaryDetail(activeDiary.diaryId);
    }
  }, [activeDiary]);

  async function getDiaryDetail(id: number) {
    try {
      const res = await getDiaryDeatailApi(id);
      setDiary(res.data);
      getCommentList(res.data.id);
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
        console.error(error);
      }
    }
  }

  async function getCommentList(id: number) {
    try {
      const res = await getCommentApi(id);
      setCommentList(res.data.commentList);
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
        console.error(error);
      }
    }
  }

  useEffect(() => {
    if (param.diaryId) {
      getDiaryDetail(parseInt(param.diaryId));
      getCommentList(parseInt(param.diaryId));
    }
  }, []);

  return (
    <div>
      <Head />
      <ContainerWrap style={{ backgroundColor: "#F2EBEB" }}>
        <LsideWrap>
          <MoodTracker memberId={param.memberId ? parseInt(param!.memberId) : 1} onClickTracker={onActive} />
          <img src={MyDarac} alt="myDarac" style={{ height: "300px", marginTop: "10px" }} />
        </LsideWrap>

        <ContentWrap>
          <DiaryWrap>
            <Card
              style={{
                height: "400px",
                width: "700px",
                marginLeft: "100px",
                borderRadius: "10px",
                boxShadow: "3px 3px 5px 1px #bdbdbd",
              }}
            >
              {diary && <DayDiary diary={diary} />}
            </Card>

            <Card
              style={{
                height: "200px",
                width: "700px",
                backgroundColor: "rgba( 255, 255, 255, 0.3 )",
                marginLeft: "100px",
                marginTop: "10px",
                paddingBottom: "20px",
                overflowY: "scroll",
              }}
              className="noscroll"
            >
              {commentList.map((com, index) => (
                <Comment comment={com} key={index} />
              ))}
            </Card>
          </DiaryWrap>

          <Button
            variant="outlined"
            onClick={handleClickOpen}
            style={{ borderColor: "#F2EBEB", height: "40px", width: "170px", color: "black", marginLeft: "10px" }}
          >
            <img src={Foot} alt="foot" style={{ marginRight: "10px" }} />
            발자국 남기기
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent style={{ height: "350px", marginTop: "20px" }}>
              <ThemeProvider theme={theme}>
                <TextField
                  variant="outlined"
                  multiline
                  value={content}
                  onChange={onChangeContent}
                  rows={10}
                  inputProps={{ maxLength: 1000 }}
                  style={{
                    width: "530px",
                    height: "100px",
                    marginLeft: "10px",
                    marginTop: "30px",
                    fontFamily: "KyoboHand",
                  }}
                ></TextField>
              </ThemeProvider>
              <Typography
                style={{
                  fontFamily: "KyoboHand",
                  fontWeight: "bold",
                  color: "#B22727",
                  marginLeft: "20px",
                  marginTop: "170px",
                }}
              >
                20자 이하로 작성 시 감정분석이 되지 않습니다. 작성을 완료했다면 발자국을 눌러주세요!
              </Typography>
            </DialogContent>
            <DialogActions style={{ marginBottom: "10px" }}>
              <Button onClick={onSubmitComment}>
                <img src={FootPrint} alt="foot" />
              </Button>
            </DialogActions>
          </Dialog>
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
  padding-top: 13px;
  padding-bottom: 19px;

  .noscroll {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const LsideWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
`;

const ContentWrap = styled.div`
  display: flex;
  flexdirection: row;
`;

const Navi = styled.div``;

const DiaryWrap = styled.div``;

export default Diary;
