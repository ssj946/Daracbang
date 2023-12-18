import { AxiosResponse } from "axios";
import { backApiInstance, jwtApiInstance } from "./http";
import { MemberInfo } from "../store/memberReducer";

const http = backApiInstance();
const jwtHttp = jwtApiInstance();

export const checkDuplicateLoginId = async (loginId: string): Promise<void> => {
  const CHECK_LOGINID_URL = "/api/members/login-id";

  await http.get(`${CHECK_LOGINID_URL}/${loginId}`);
};

export const checkDuplicatedNickname = async (nickname: string): Promise<void> => {
  const CHECK_NICKNAME_URL = "/api/members/nickname";
  await http.get(`${CHECK_NICKNAME_URL}/${nickname}`);
};

export const signUp = async (formdata: FormData) => {
  const SIGNUP_URL = "/api/members";
  await http.post(SIGNUP_URL, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const login = async (loginId: string, password: string) => {
  const LOGIN_URL = "/api/members/login";

  return await http.post(LOGIN_URL, { loginId, password });
};

export const getMyMemberInfo = async (): Promise<AxiosResponse<MemberInfo>> => {
  const GET_MY_INFO_URL = "/api/members/info";
  return await jwtHttp.get(GET_MY_INFO_URL);
};

export const otherMemberInfo = async (memberId: number) => {
  const OTHER_MEMBER_INFO = `/api/members/${memberId}/info`;
  return await jwtHttp.get(OTHER_MEMBER_INFO);
};
