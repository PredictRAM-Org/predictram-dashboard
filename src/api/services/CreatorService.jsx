import { apiPost } from "../BaseAPICaller";
import { CREATOR_ACCESS } from "../Endpoints";

export const giveUserCreatorAccess = async (setLoading, body) => {
  await apiPost(setLoading, CREATOR_ACCESS, body);
};
