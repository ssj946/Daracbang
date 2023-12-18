import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MyDarac from "../assets/images/room2.png";
import Head from "../components/Head";
import { Button, Card, CardContent, Chip, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dial from "../components/SpeedDial";
import Happy from "../assets/images/happy.png";
import Think from "../assets/images/thinking.png";
import Angry from "../assets/images/angry.png";
import MoodTracker from "../components/MoodTracker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { otherMemberInfo } from "../api/memberApi";
import { MemberInfo, logoutAction } from "../store/memberReducer";
import { isAxiosError } from "axios";
import { ResponseDataType } from "../api/responseType";
import { deleteToken } from "../utils/tokenUtil";
import { DiaryDetail, MoodTrackerItemType, MoodeStatus, getDiaryDeatailApi, getMoodStatusApi } from "../api/diaryApi";
import { formatDate } from "../utils/dateUtil";
import Swal from "sweetalert2";
import upArrow from "../assets/images/upArrow.png";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  width: 300,
  marginLeft: 10,
  marginBottom: 10,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
    backgroundColor: "theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'",
  },
}));

const Daracbang: React.FC = () => {
  const [daracMemberInfo, setDaracMemberInfo] = useState<MemberInfo>();
  const [activeDiary, setActiveDiary] = useState<MoodTrackerItemType | null>(null);
  const [activeDiaryInfo, setActiveDiaryInfo] = useState<DiaryDetail | null>(null);
  const [moodeStatus, setMoodStatus] = useState<MoodeStatus | null>(null);
  const member = useSelector((state: RootState) => {
    return state.memberReducer.member;
  });
  const params = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const onActive = (diary: MoodTrackerItemType) => {
    setActiveDiary(diary);
  };

  async function getDiaryDetail(id: number) {
    const res = await getDiaryDeatailApi(id);
    setActiveDiaryInfo(res.data);
  }
  useEffect(() => {
    if (activeDiary != null) {
      getDiaryDetail(activeDiary.diaryId);
    }
  }, [activeDiary]);

  async function getMoodStatus(id: number) {
    try {
      const res = await getMoodStatusApi(id);
      setMoodStatus(res.data);
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
    async function getOtherMemberInfo(id: number) {
      try {
        const res = await otherMemberInfo(id);
        setDaracMemberInfo(res.data);
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

    if (params.memberId) {
      getOtherMemberInfo(parseInt(params.memberId));
      getMoodStatus(parseInt(params.memberId));
    }
  }, []);

  return (
    <div>
      <Head />
      <ContainerWrap style={{ backgroundColor: "#F2EBEB" }}>
        <SideWrap>
          <Intro>
            <Card
              style={{
                height: "80px",
                marginBottom: "15px",
                borderRadius: "10px",
                boxShadow: "3px 3px 5px 1px #bdbdbd",
              }}
            >
              <Typography style={{ fontFamily: "omyu_pretty", fontWeight: "bold", fontSize: "20px" }}>
                {daracMemberInfo?.nickname} 님 다락방 소개글
              </Typography>
              <Typography style={{ fontFamily: "omyu_pretty", fontSize: "20px" }}>
                {daracMemberInfo?.introduce ? daracMemberInfo.introduce : "소개글이 없습니다."}
              </Typography>
            </Card>
          </Intro>
          <Emotions>
            <Card style={{ height: "130px", borderRadius: "10px", boxShadow: "3px 3px 5px 1px #bdbdbd" }}>
              <Typography
                marginBottom={1}
                style={{ fontFamily: "omyu_pretty", fontWeight: "bold", fontSize: "20px", marginBottom: 0 }}
              >
                나의 감정상태
              </Typography>
              <CardContent style={{ marginLeft: "10px" }}>
                <MoodIcon>
                  <img src={Happy} alt="happy" style={{ height: "20px", width: "20px", marginRight: "5px" }} />
                  <BorderLinearProgress
                    variant="determinate"
                    value={moodeStatus ? moodeStatus.positiveRate : 50}
                    style={{ marginTop: "2px" }}
                  />
                </MoodIcon>
                <MoodIcon>
                  <img src={Think} alt="think" style={{ height: "20px", width: "20px", marginRight: "5px" }} />
                  <BorderLinearProgress
                    variant="determinate"
                    value={moodeStatus ? moodeStatus.neutralRate : 50}
                    style={{ marginTop: "2px" }}
                  />
                </MoodIcon>
                <MoodIcon>
                  <img src={Angry} alt="angry" style={{ height: "20px", width: "20px", marginRight: "5px" }} />
                  <BorderLinearProgress
                    variant="determinate"
                    value={moodeStatus ? moodeStatus.negativeRate : 50}
                    style={{ marginTop: "2px" }}
                  />
                </MoodIcon>
              </CardContent>
            </Card>
          </Emotions>
          <MoodTracker memberId={member!.id} onClickTracker={onActive} />
          <SumDiary>
            <Card style={{ height: "130px", borderRadius: "10px", boxShadow: "3px 3px 5px 1px #bdbdbd" }}>
              <CardContent style={{ fontFamily: "omyu_pretty", fontWeight: "bold", fontSize: "15px", height: "50px" }}>
                {activeDiaryInfo === null ? (
                  "다이어리를 선택해주세요"
                ) : (
                  <div>
                    <div>{formatDate(activeDiaryInfo.createdAt)}</div>
                    <br />
                    <div className="content-hidden">{activeDiaryInfo.content}</div>
                  </div>
                )}
              </CardContent>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  if (activeDiaryInfo == null) {
                    alert("다이어리를 선택해주세요 ");
                    return;
                  }
                  navigator(`/daracbang/${member?.id}/diary/${activeDiaryInfo.id}`);
                }}
                style={{ fontFamily: "omyu_pretty", fontWeight: "bold", fontSize: "15px" }}
              >
                더 읽으러 가기
              </Button>
            </Card>
          </SumDiary>
        </SideWrap>
        <MidWrap style={{ display: "flex", flexDirection: "column" }}>
          <Link to={`/daracbang/${params.memberId}/guestbook`}>
            {" "}
            <img src={MyDarac} alt="myDarac" style={{ height: "550px" }} />
          </Link>
          <Typography
            style={{
              fontFamily: "omyu_pretty",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "20px",
              marginTop: "10px",
            }}
          >
            방명록보러가기 <img src={upArrow} alt="arrow" style={{ height: "25px" }}></img>{" "}
          </Typography>
        </MidWrap>

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
  padding-top: 17px;
  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 50px;
  .content-hidden {
    display: inline-block;
    width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SideWrap = styled.div`
  margin-right: 10%;
  text-align: center;
`;

const Intro = styled.div`
  width: 400px;
`;

const Emotions = styled.div`
  width: 400px;
`;

const SumDiary = styled.div`
  width: 400px;
`;

const Navi = styled.div``;

const MidWrap = styled.div``;

const MoodIcon = styled.div`
  display: flex;
  flex-direction: "row";
`;

export default Daracbang;
