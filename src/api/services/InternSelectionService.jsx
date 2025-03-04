import { apiPost } from "../BaseAPICaller";
import { INTERN_APPROVAL, INTERN_REJECTION } from "../Endpoints";

export const sendInternApproval = async (setLoading, body) => {
  return await apiPost(setLoading, INTERN_APPROVAL, body);
};

export const sendInternRejection = async (setLoading, body) => {
  return await apiPost(setLoading, INTERN_REJECTION, body);
};
