import React, { useEffect, useRef, useState } from "react";
import LoginHead from "../components/LoginHead";
import styled from "@emotion/styled";
import { Avatar, Button, TextField } from "@mui/material";
import DefaultImg from "../assets/images/defaultImg.png";
import { isAxiosError } from "axios";
import * as signUpApis from "../api/memberApi";
import { ResponseDataType } from "../api/responseType";
import { loginIdValidator, nicknameValidator } from "../utils/validator";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const [profilefile, setProfileFile] = useState<any>(null);
  const [img, setImg] = useState(DefaultImg);
  const [loginId, setLoginId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [loginHeplerText, setLoginHelperText] = useState<string>("알파벳,숫자 포함하여 8자리로 설정해주세요");
  const [loginIdValidate, setLoginIdValidate] = useState<boolean>(true);
  const [nicknameValidate, setNicknameValidate] = useState<boolean>(true);
  const [nicknameHeplerText, setNicknameHelperText] = useState<string>("알파벳,숫자 포함하여 8자리로 설정해주세요");
  const [loginIdCheck, setLoginIdCheck] = useState<boolean>(false);
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);

  const navigate = useNavigate();
  const imageUp = useRef<HTMLInputElement>(null);

  const onClickImage = () => {
    if (imageUp.current) {
      imageUp.current.click();
    }
  };

  // 이미지 파일 변경
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setImg(URL.createObjectURL(file));
      setProfileFile(file);
    }
  };

  // 아이디 변경
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(event.target.value); // onChange를 위한 함수
  };
  // useEffect의 비동기 처리를 위해 한번더 트래킹 해준다.
  useEffect(() => {
    if (loginId.length > 0) {
      setLoginId((curValue) => curValue);

      if (!loginIdValidator(loginId)) {
        setLoginIdValidate(false);
      } else {
        setLoginIdValidate(true);
      }
    }
  }, [loginId]);

  // 아이디 중복 확인 함수
  const checkLoginId = async () => {
    if (!loginIdValidate) {
      Swal.fire({
        icon: "question",
        title: "값을 정확히 입력해주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    try {
      await signUpApis.checkDuplicateLoginId(loginId);
      setLoginIdCheck(true);
      setLoginHelperText("사용 가능한 아이디입니다!");
    } catch (error) {
      if (isAxiosError<ResponseDataType>(error)) {
        if (error.response!.status === 409) {
          Swal.fire({
            icon: "error",
            title: "중복된 id 입니다..",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
        if (error.response!.status === 400) {
          Swal.fire({
            icon: "error",
            title: "잘못된 id 입니다..",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
      }
      // 그외
      Swal.fire({
        icon: "error",
        title: "서버 에러...",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    }
  };

  // 닉네임 변경
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  useEffect(() => {
    if (nickname.length > 0) {
      setNickname((curValue) => curValue);

      if (!nicknameValidator(nickname)) {
        setNicknameValidate(false);
      } else {
        setNicknameValidate(true);
      }
    }
  }, [nickname]);

  // 닉네임 중복 확인 함수
  const checkNickname = async () => {
    if (!nicknameValidate) {
      Swal.fire({
        icon: "question",
        title: "정확한 값을 입력해주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    try {
      await signUpApis.checkDuplicatedNickname(nickname);
      setNicknameCheck(true);
      setNicknameHelperText("사용 가능한 닉네임입니다!");
    } catch (error) {
      if (isAxiosError<ResponseDataType>(error)) {
        if (error.response!.status === 409) {
          Swal.fire({
            icon: "error",
            title: "중복된 닉네임 입니다.",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
        if (error.response!.status === 400) {
          Swal.fire({
            icon: "error",
            title: "잘못된 닉네임 입니다..",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
      }
      // 그외
      Swal.fire({
        icon: "error",
        title: "서버 에러..",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    }
  };

  // 패스워드 변경
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const CHARACTER_MAX_LIMIT = 10;
  const CHARACTER_MIX_LIMIT = 2;

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    let formData = new FormData();

    if (!preSignUpRequestValidation()) {
      return;
    }
    formData.append("loginId", loginId);
    formData.append("nickname", nickname);
    formData.append("password", password);
    formData.append("image", profilefile);

    try {
      await signUpApis.signUp(formData);
      Swal.fire({
        icon: "success",
        title: "회원가입 성공!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      if (isAxiosError<ResponseDataType>(error)) {
        if (error.status === 409) {
          Swal.fire({
            icon: "error",
            title: "중복 체크를 진행해주세요!.",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
        if (error.status === 400) {
          Swal.fire({
            icon: "error",
            title: "잘못된 값 입니다..",
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
  };

  // 회원가입전 검사
  // 이미지 파일 있는지,닉네임, loginId 값이 있는지 ?  중복 체크 둘 다 했는지, 패스워드 빈 값인지?
  const preSignUpRequestValidation = (): boolean => {
    if (profilefile === null) {
      Swal.fire({
        icon: "error",
        title: "이미지를 업로드 해 주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    if (!loginIdValidator(loginId) || !nicknameValidator(nickname) || password.length === 0) {
      Swal.fire({
        icon: "error",
        title: "값을 정확히 입력해 주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    if (!loginIdCheck || !nicknameCheck) {
      Swal.fire({
        icon: "error",
        title: "중복 체크를 진행해 주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    return true;
  };

  return (
    <div>
      <LoginHead />
      <ContainerWrap>
        <ContentWrap>
          <AddImgWrap>
            <input type="file" style={{ display: "none" }} ref={imageUp} onChange={handleFileChange} />
            {img && (
              <Avatar onClick={onClickImage} alt="Default Img" src={img} style={{ width: 300, height: 300 }}></Avatar>
            )}
          </AddImgWrap>

          <InfoWrap>
            <div>
              <TextField
                inputProps={{ minLength: 2, maxLength: 10 }}
                id="standard-basic"
                label="아이디"
                error={!loginIdValidate}
                variant="standard"
                style={{ margin: "20px" }}
                value={loginId}
                onChange={handleIdChange}
                helperText={loginHeplerText}
                InputProps={{ maxRows: CHARACTER_MAX_LIMIT, minRows: CHARACTER_MIX_LIMIT }}
              />
              <Button
                style={{ width: "90px", marginLeft: "10px", height: "40px", marginTop: "20px" }}
                variant="contained"
                onClick={checkLoginId}
              >
                중복확인
              </Button>
            </div>
            <TextField
              inputProps={{ minLength: 4, maxLength: 20 }}
              id="standard-basic"
              label="비밀번호"
              variant="standard"
              style={{ margin: "20px" }}
              value={password}
              type="password"
              onChange={handlePasswordChange}
              InputProps={{ maxRows: 20, minRows: 4 }}
            />
            <div>
              <TextField
                inputProps={{ minLength: 2, maxLength: 10 }}
                id="standard-basic"
                label="닉네임"
                variant="standard"
                error={!nicknameValidate}
                style={{ margin: "20px" }}
                value={nickname}
                onChange={handleNicknameChange}
                helperText={nicknameHeplerText}
                InputProps={{ maxRows: CHARACTER_MAX_LIMIT, minRows: CHARACTER_MIX_LIMIT }}
              />
              <Button
                style={{ width: "90px", marginLeft: "10px", height: "40px", marginTop: "20px" }}
                variant="contained"
                onClick={checkNickname}
              >
                중복확인
              </Button>
            </div>
          </InfoWrap>
        </ContentWrap>
        <ButtonWrap>
          <Button variant="outlined" onClick={handleSubmit}>
            시작하기
          </Button>
        </ButtonWrap>
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 7%;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const AddImgWrap = styled.div`
  background-color: #green;
  margin-right: 80px;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrap = styled.div`
  margin-top: 80px;
`;

export default SignUp;
