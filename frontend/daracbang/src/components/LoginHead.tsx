import React from 'react';
import Logo from "../assets/images/logo.png";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const LoginHead = () => {

    return (
        <Header>
            <Logos>
                <img src={Logo} alt="logo" />
                <Typography style={{ fontFamily: "omyu_pretty", fontSize: "30px", fontWeight: "bold", marginTop: "5px" }}>다락방</Typography>
            </Logos>
        </Header>
    );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin: 15px;
`;
const Logos = styled.div`        
    display: flex;
    flex-direction: row;
`;


export default LoginHead;
