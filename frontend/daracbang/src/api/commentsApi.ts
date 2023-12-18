import { AxiosResponse } from "axios";
import { jwtApiInstance } from "./http";

const jwtHttp = jwtApiInstance();

export interface CommentType {
  memberId: number;
  nickname: string;
  profileImage: string;
  diaryId: number;
  createdAt: string;
  content: string;
  sentimentResult: string;
  positiveProbability: string;
  neutralProbability: string;
  negativeProbability: string;
}

export const getCommentApi = async (diaryId: number): Promise<AxiosResponse<{ commentList: CommentType[] }>> => {
  const URL = `/api/comments/${diaryId}`;

  return await jwtHttp.get(URL);
};

export const createCommentApi = async (diaryId: number, content: string) => {
  const URL = `/api/comments/${diaryId}`;
  await jwtHttp.post(URL, { content });
};

export const deleteCommentApi = async (commentId: number) => {
  const URL = `/api/comments/${commentId}`;
  await jwtHttp.delete(URL);
};
