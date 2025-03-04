import { apiDelete, apiGetByParams, apiPost } from "../BaseAPICaller";
import {
  EMAIL_GROUP_CREATE,
  EMAIL_GROUP_DELETE,
  EMAIL_GROUP_GET,
  EMAIL_GROUP_SEND_INDIVIDUAL_EMAIL,
  EMAIL_GROUP_SEND_GROUP_EMAIL,
} from "../Endpoints";

export const createEmailGroup = async (setLoading, body) => {
  await apiPost(setLoading, EMAIL_GROUP_CREATE, body);
};

export const getEmailGroup = async (setLoading, params) => {
  return await apiGetByParams(setLoading, EMAIL_GROUP_GET, params);
};

export const deleteEmailGroup = async (setLoading, id) => {
  await apiDelete(setLoading, `${EMAIL_GROUP_DELETE}/${id}`);
};

export const sendIndividualEmail = async (setLoading, body) => {
  await apiPost(setLoading, EMAIL_GROUP_SEND_INDIVIDUAL_EMAIL, body);
};

export const sendGroupEmail = async (setLoading, body) => {
  await apiPost(setLoading, EMAIL_GROUP_SEND_GROUP_EMAIL, body);
};
