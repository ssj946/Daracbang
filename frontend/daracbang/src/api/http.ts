import axios, { AxiosInstance, Axios } from "axios";
import * as tokenUtil from "../utils/tokenUtil";
// const apiURL = process.env.REACT_APP_APPLICATION_SERVER_URL;

export const backApiInstance = () => {
  const instance: Axios = axios.create({
    // baseURL: apiURL,      // setUpProxy 이용으롷 인해 baseURL을 주석처리함
  });
  return instance;
};

export const jwtApiInstance = () => {
  const instance: AxiosInstance = axios.create({
    // baseURL: apiURL,
  });

  instance.interceptors.request.use(
    (request) => {
      const accessToken = tokenUtil.getToken();
      request.headers["Authorization"] = `Bearer ${accessToken}`;
      return request;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
  return instance;
};
