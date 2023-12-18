import React from 'react';
import MainHead from '../components/MainHead';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom';
import Arrow from "../assets/images/arrow.png";
import first from "../assets/images/1.png";
import second from "../assets/images/2.png";
import third from "../assets/images/3.png";

const Main: React.FC = () => {

    return (
        <div>
            <MainHead />
            <ContainerWrap>
                <ContentWrap>
                    <Card style={{ height: "505px", width: "540px", margin: "5px", boxShadow: "3px 3px 5px 3px #eeeeee", borderRadius: "15px" }}>
                        <CardMedia
                            component="img"
                            height="440"
                            image={third}
                            title="ex3"
                        />
                        <CardContent>
                            <Typography style={{ fontFamily: "omyu_pretty", display: "flex", justifyContent: "center", flexDirection: "row", fontSize: "20px", fontWeight: "bold" }}>
                                실시간으로 나의 다이어리를 분석하여 무드트래커를 완성해보세요
                            </Typography>
                        </CardContent>
                    </Card>

                    <div style={{ flexDirection: "column", margin: "5px" }}>
                        <Card style={{ height: "250px", width: "450px", marginBottom: "5px", boxShadow: "3px 3px 5px 3px #eeeeee", borderRadius: "15px" }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={first}
                                title="ex1"
                            />
                            <CardContent>
                                <Typography style={{ fontFamily: "omyu_pretty", display: "flex", justifyContent: "center", flexDirection: "row", fontSize: "20px", fontWeight: "bold" }}>
                                    친구의 방명록에 방문하여 발자국을 남겨보세요
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card style={{ height: "250px", width: "450px", boxShadow: "3px 3px 5px 3px #eeeeee", borderRadius: "15px" }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={second}
                                title="ex2"
                            />
                            <CardContent>
                                <Typography style={{ fontFamily: "omyu_pretty", display: "flex", justifyContent: "center", flexDirection: "row", fontSize: "20px", fontWeight: "bold" }}>
                                    달력을 통해 나의 일기에 달린 친구들의 말을 같이 봐요
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </ContentWrap>
                <Card style={{ height: "60px", width: "1000px", boxShadow: "3px 3px 5px 3px #eeeeee", borderRadius: "15px" }}>
                    <Link to="/SignUp" style={{
                        textDecoration: "none", display: "flex", justifyContent: "center", flexDirection: "row", color: "inherit"
                    }}>
                        < Typography style={{ fontFamily: "omyu_pretty", color: "inherit", fontSize: "20px", fontWeight: "bold", marginTop: "15px" }}>다락방에 입장하기 위해 회원가입 하러 가기!</Typography>
                        <img src={Arrow} alt='arrow' style={{ height: "40px", width: "100px", marginTop: "10px" }} />
                    </Link>

                </Card>
            </ContainerWrap >

        </div >
    );
};

const ContainerWrap = styled.div`
    display: flex;
    margin-top: 4%;
    margin-left: 18%;
    flex-direction: column;
`;

const ContentWrap = styled.div`
    display: flex;  
    flex-direction: row;
`;

export default Main;