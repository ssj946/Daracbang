import { Link } from "react-router-dom";
import React from "react";
import Logo from "../assets/images/logo.png";
import styled from "@emotion/styled";
import { Avatar, Badge, Button, Card, Popover, Typography } from "@mui/material";
import Music from "../assets/images/music.png";
import Bell from "../assets/images/bell.png";
import CheckAlert from "../assets/images/checkAlert.png";
import Mute from "../assets/images/mute.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../store/memberReducer";
import * as tokenUtil from "../utils/tokenUtil";
import { RootState } from "../store/rootReducer";
import Swal from "sweetalert2";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  bottom: 32,
  right: 13,
}));

const Head = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const member = useSelector((state: RootState) => {
    return state.memberReducer.member;
  });
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(logoutAction());
    Swal.fire({
      icon: "success",
      title: "로그아웃 성공",
      showConfirmButton: false,
      timer: 1500,
    });
    tokenUtil.deleteToken();
  };
  const open = Boolean(anchorEl);

  return (
    <Header style={{ backgroundColor: "#F2EBEB", height: "100px", display: "flex", alignItems: "center" }}>
      <Logos>
        <Link to={`/daracbang/${member?.id}`} style={{ textDecoration: "none", marginRight: "20px" }}>
          <img src={Logo} alt="logo" />
        </Link>
        <Typography
          style={{
            fontFamily: "omyu_pretty",
            fontSize: "30px",
            fontWeight: "bold",
            lineHeight: "70px",
          }}
        >
          다락방
        </Typography>
      </Logos>
      <BtnGroup>
        {/* <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<SmallAvatar alt="Remy Sharp" src={CheckAlert} />}
        >
          <Button onClick={handleClick}>
            <img src={Bell} alt="bell" />
          </Button>
          <Popover
            open={open}
            onClick={handleClose}
            anchorPosition={{ top: 190, left: 800 }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            The content of the Popover.
          </Popover>
        </Badge> */}

        <Link
          onClick={logout}
          to="/"
          style={{
            textDecoration: "none",
            marginTop: "7px",
            fontFamily: "omyu_pretty",
            fontSize: "20px",
            color: "inherit",
          }}
        >
          로그아웃
        </Link>
      </BtnGroup>
    </Header>
  );
};

const Header = styled.header`
  backgroung-color: F2EBEB;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 15px;
`;

const BtnGroup = styled.div`
  margin-right: 40px;
  display: flex;
  flex-direction: row;
`;
const Logos = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Head;
