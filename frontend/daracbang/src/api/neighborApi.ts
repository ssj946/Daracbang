import { AxiosResponse } from "axios";
import { jwtApiInstance } from "./http";

const jwtHttp = jwtApiInstance();

export interface NeighborObject {
  neighborId: number;
  memberId: number;
  nickname: string;
  profileImage: string;
}

export interface MemberSearchObject {
  memberId: number;
  nickname: string;
  profileImage: string;
  isNeighbor: boolean;
  isNeighborRequest: boolean;
}

export const getMyNeighborApi = async (): Promise<AxiosResponse<{ data: NeighborObject[] }>> => {
  const URL = "/api/neighbors";

  return await jwtHttp.get(URL);
};

// 신청 받은  목록
export const getMyNeighborAcceptListApi = async (): Promise<AxiosResponse<{ data: NeighborObject[] }>> => {
  const URL = "/api/neighbors/accepts";
  return await jwtHttp.get(URL);
};

//신청한 목록
export const getMyNeighborApplicationListApi = async (): Promise<AxiosResponse<{ data: NeighborObject[] }>> => {
  const URL = "/api/neighbors/request";
  return await jwtHttp.get(URL);
};

export const searchNeighborApi = async (nickname: string): Promise<AxiosResponse<{ data: MemberSearchObject[] }>> => {
  const URL = `/api/neighbors/search?nickname=${nickname}`;
  return await jwtHttp.get(URL);
};

// 이웃 신청
export const applicateNeigborApi = async (neighborId: number) => {
  const URL = `/api/neighbors/applications/${neighborId}`;
  return await jwtHttp.post(URL);
};

export const cancelApplicationApi = async (memberId: number) => {
  const URL = `/api/neighbors/applications/${memberId}`;
  await jwtHttp.delete(URL);
};

// 이웃 신청 승인
export const acceptApplicationNeigborApi = async (memberId: number) => {
  const URL = `/api/neighbors/accepts/${memberId}`;
  return await jwtHttp.put(URL);
};

export const removeAndRejectNeigborApi = async (neighborId: number) => {
  const URL = `/api/neighbors/${neighborId}`;
  await jwtHttp.delete(URL);
};
