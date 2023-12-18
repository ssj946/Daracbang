import { AxiosResponse } from "axios";
import { jwtApiInstance } from "./http";

const jwtHttp = jwtApiInstance();

export const uploadDiary = async (scope: string, content: string) => {
  const URL = "/api/diaries";
  await jwtHttp.post(URL, { scope, content });
};

export interface MoodTrackerItemType {
  diaryId: number;
  createdAt: string;
  sentiment: string;
}

export const getMoodTracker = async (
  id: number,
  year: number,
  month: number
): Promise<AxiosResponse<{ moodTracker: MoodTrackerItemType[] }>> => {
  const URL = `/api/diaries/mood-tracker/${id}?year=${year}&month=${month}`;
  return await jwtHttp.get(URL);
};

export interface DiaryDetail {
  id: number;
  scope: string;
  createdAt: string;
  content: string;
  sentimentResult: string;
  positiveProbability: string;
  neutralProbability: string;
  negativeProbability: string;
}

export const getDiaryDeatailApi = async (id: number): Promise<AxiosResponse<DiaryDetail>> => {
  const URL = `/api/diaries/${id}`;
  return await jwtHttp.get(URL);
};

export interface MoodeStatus {
  positiveRate: number;
  neutralRate: number;
  negativeRate: number; // 0~100 사이 정수
}
export const getMoodStatusApi = async (id: number): Promise<AxiosResponse<MoodeStatus>> => {
  const URL = `/api/diaries/mood-status/${id}`;
  return await jwtHttp.get(URL);
};
