import { apiGet, apiGetByParams, apiPost, apiPut } from "../BaseAPICaller";
import {
  USER_PROFILE,
  USER_PROFILE_SAVE,
  USER_EXPERIENCE_SAVE,
  USER_EXPERIENCE_DELETE,
  USER_EXPERIENCE_UPDATE,
} from "../Endpoints";

export const getProfile = async (setLoading, params) => {
  return await apiGetByParams(setLoading, USER_PROFILE, params);
};

export const saveProfile = async (setLoading, body) => {
  return await apiPost(setLoading, USER_PROFILE_SAVE, body);
};

export const saveExperience = async (setLoading, body) => {
  return await apiPost(setLoading, USER_EXPERIENCE_SAVE, body);
};

export const deleteExperience = async (setLoading, body) => {
  return await apiPost(setLoading, USER_EXPERIENCE_DELETE, body);
};

export const updateExperience = async (setLoading, body) => {
  return await apiPut(setLoading, USER_EXPERIENCE_UPDATE, body);
};
