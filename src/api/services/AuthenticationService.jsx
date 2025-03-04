import { apiPost } from "../BaseAPICaller";
import { EMAIL_VERIFICATION, REGISTER_USER } from "../Endpoints";

export const registerUser = async (setLoading, body) => {
  return await apiPost(setLoading, REGISTER_USER, body);
};

export const sendEmailOTP = async (setLoading, body) => {
  await apiPost(setLoading, EMAIL_VERIFICATION, body);
};
