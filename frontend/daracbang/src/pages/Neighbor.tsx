import React, { useEffect, useState } from "react";
import Head from "../components/Head";
import styled from "@emotion/styled";
import Dial from "../components/SpeedDial";
import { Button, Card, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import Search from "../assets/images/search.png";
import SearchNeigh from "../components/SearchNeigh";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import FriendNeigh from "../components/FriendNeigh";
import RequestNeigh from "../components/RequestNeigh";
import {
  MemberSearchObject,
  NeighborObject,
  acceptApplicationNeigborApi,
  applicateNeigborApi,
  cancelApplicationApi,
  getMyNeighborAcceptListApi,
  getMyNeighborApi,
  removeAndRejectNeigborApi,
  searchNeighborApi,
} from "../api/neighborApi";
import { isAxiosError } from "axios";
import { ResponseDataType } from "../api/responseType";
import Swal from "sweetalert2";

const theme = createTheme({
  typography: {
    fontFamily: "KyoboHand",
  },
});

const Neighbor = () => {
  const member = useSelector((state: RootState) => {
    return state.memberReducer.member;
  });

  const [searchedNickname, setSearchedNickname] = useState<string>("");
  const [searchMember, setSearchMember] = React.useState<MemberSearchObject[]>([]);
  const [requireAccepteMember, setRequireAcceptMember] = useState<NeighborObject[]>([]);
  const [friendMember, setFriendMember] = useState<NeighborObject[]>([]);
  const [intro, setIntro] = useState<string>("");
  async function searchNeigbor(keyword: string) {
    const res = await searchNeighborApi(keyword);
    const searchMem = res.data.data
      .filter((mem) => mem.memberId !== member!.id)
      .map((mem) => {
        return {
          ...mem,
        };
      });
    setSearchMember(searchMem);
  }

  // 이웃 신청
  async function onApplicationNeighbor(id: number) {
    try {
      await applicateNeigborApi(id); // 이웃 신청 후
      Swal.fire({
        icon: "success",
        title: "이웃 신청 성공!",
        showConfirmButton: false,
        timer: 1500,
      });

      await searchNeigbor(searchedNickname);
    } catch (error) {
      if (isAxiosError<ResponseDataType>(error)) {
        if (error.response?.status === 409) {
          Swal.fire({
            icon: "error",
            title: "이미 신청한 회원입니다.",
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
      console.error(error);
    }
  }

  async function cancelApplication(memberId: number) {
    await cancelApplicationApi(memberId);
    Swal.fire({
      icon: "success",
      title: "취소 성공!",
      showConfirmButton: false,
      timer: 1500,
    });
    await searchNeigbor(searchedNickname);
  }

  // 내가 신청 받은 목록
  async function getMyAcceptedList() {
    const res = await getMyNeighborAcceptListApi();
    setRequireAcceptMember(res.data.data);
  }

  // 나의 이웃 목록
  async function getMyNeigbhor() {
    const res = await getMyNeighborApi();
    setFriendMember(res.data.data);
  }

  // 신청 수락하기
  async function accept(id: number) {
    await acceptApplicationNeigborApi(id);
    await getMyAcceptedList();
    await getMyNeigbhor();
  }
  async function reject(neighborId: number) {
    await removeAndRejectNeigborApi(neighborId);
    Swal.fire({
      icon: "success",
      title: "거절 요청 성공",
      showConfirmButton: false,
      timer: 1500,
    });
    await getMyAcceptedList();
  }

  async function removeNeighbor(neighborId: number) {
    await removeAndRejectNeigborApi(neighborId);
    Swal.fire({
      icon: "success",
      title: "신청 취소 성공",
      showConfirmButton: false,
      timer: 1500,
    });
    await getMyNeigbhor();
  }

  useEffect(() => {
    if (searchedNickname.length > 1) {
      searchNeigbor(searchedNickname);
    } else {
      setSearchMember([]);
    }
  }, [searchedNickname]);

  // 처음 로딩
  useEffect(() => {
    getMyAcceptedList();
    getMyNeigbhor();
  }, []);

  return (
    <div>
      <Head />
      <ContainerWrap style={{ backgroundColor: "#F2EBEB" }}>
        <ContentWrap>
          <Card
            style={{
              height: "600px",
              width: "420px",
              backgroundColor: "rgba( 255, 255, 255, 0.3 )",
              marginLeft: "100px",
              boxShadow: "3px 3px 2px 1px #bdbdbd",
              borderRadius: "15px",
            }}
          >
            <ThemeProvider theme={theme}>
              <img src={Search} alt="search" style={{ marginTop: "15px", marginLeft: "15px" }} />
              <TextField
                value={searchedNickname}
                onChange={(e) => setSearchedNickname(e.target.value)}
                variant="standard"
                style={{
                  width: "300px",
                  marginLeft: "20px",
                  marginRight: "10px",
                  marginTop: "15px",
                  fontFamily: "KyoboHand",
                }}
              />
            </ThemeProvider>
            <div style={{ height: "200px", overflowY: "scroll" }} className="noscroll">
              {searchMember.map((member) => (
                <SearchNeigh
                  key={member.memberId}
                  data={member}
                  onApplicate={onApplicationNeighbor}
                  onCancel={cancelApplication}
                />
              ))}
            </div>

            <Card
              style={{
                height: "400px",
                width: "400px",
                margin: "10px",
                marginTop: "30px",
                boxShadow: "3px 3px 2px 1px #bdbdbd",
                borderRadius: "15px",
              }}
            >
              <Typography
                style={{
                  fontFamily: "omyu_pretty",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "5px",
                }}
              >
                이웃 수락 / 거절 하기
              </Typography>
              {requireAccepteMember.length === 0 ? (
                <Typography
                  style={{
                    fontFamily: "omyu_pretty",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginTop: "5px",
                  }}
                >
                  이웃 신청 온 회원이 없습니다.
                </Typography>
              ) : (
                requireAccepteMember.map((requests) => (
                  <RequestNeigh key={requests.memberId} data={requests} onReject={reject} onAccpet={accept} />
                ))
              )}
            </Card>
          </Card>

          <CardWrap>
            <Card
              style={{
                height: "150px",
                marginLeft: "50px",
                marginBottom: "10px",
                boxShadow: "3px 3px 2px 1px #bdbdbd",
                borderRadius: "15px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ThemeProvider theme={theme}>
                <TextField
                  value={member?.introduce}
                  multiline
                  style={{ fontFamily: "KyoboHand", marginTop: "15px", marginLeft: "30px", width: "360px" }}
                  rows={2}
                ></TextField>
              </ThemeProvider>
              <Button
                variant="outlined"
                style={{ marginLeft: "300px", marginTop: "10px", width: "90px", height: "30px" }}
              >
                수정하기
              </Button>
            </Card>
            <Card
              style={{
                height: "440px",
                width: "420px",
                backgroundColor: "rgba( 255, 255, 255, 0.3 )",
                marginLeft: "50px",
                boxShadow: "3px 3px 2px 1px #bdbdbd",
                borderRadius: "15px",
              }}
            >
              <Typography
                style={{
                  fontFamily: "omyu_pretty",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "5px",
                }}
              >
                나의 BFF
              </Typography>
              {friendMember.length === 0 ? (
                <Typography
                  style={{
                    fontFamily: "omyu_pretty",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginTop: "5px",
                  }}
                >
                  현재 이웃이 없습니다. 이웃을 만들어 보세요!
                </Typography>
              ) : (
                friendMember.map((friends) => (
                  <FriendNeigh key={friends.memberId} data={friends} onRemove={removeNeighbor} />
                ))
              )}
            </Card>
          </CardWrap>

          {/* <Card
            style={{
              height: "410px",
              width: "420px",
              backgroundColor: "rgba( 255, 255, 255, 0.3 )",
              marginLeft: "50px",
              boxShadow: "3px 3px 2px 1px #bdbdbd",
              borderRadius: "15px",
            }}
          >
            <SearchBar style={{ marginTop: "15px", marginLeft: "30px" }}>
              <ThemeProvider theme={theme}>
                <TextField
                  variant="standard"
                  style={{ width: "270px", marginRight: "10px", fontFamily: "KyoboHand" }}
                ></TextField>
              </ThemeProvider>
              <Button variant="outlined" size="small">
                추가하기
              </Button>
            </SearchBar>
          </Card> */}
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
  padding-top: 27px;
  padding-bottom: 40px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const Navi = styled.div``;

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBar = styled.div``;

export default Neighbor;
