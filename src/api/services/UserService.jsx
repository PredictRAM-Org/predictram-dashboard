import { apiGet, apiGetByParams, apiPost, apiPut } from "../BaseAPICaller";
import {
  PROFESSIONAL_USER,
  USER_GET_BY_MOBILE,
  USER_LIST,
  USER_STOCKS,
  USER_UPDATE,
} from "../Endpoints";

export const getUserStocks = async (setLoading) => {
  return await apiGet(setLoading, USER_STOCKS);
};

export const getUserByMobile = async (setLoading, params) => {
  return await apiGetByParams(setLoading, USER_GET_BY_MOBILE, params);
};

export const makeUserProfessional = async (setLoading, body) => {
  await apiPost(setLoading, PROFESSIONAL_USER, body);
};

export const getUserList = async (setLoading) => {
  return await apiGet(setLoading, USER_LIST);
};

export const updateUser = async (setLoading, body) => {
  await apiPut(setLoading, USER_UPDATE, body);
};
