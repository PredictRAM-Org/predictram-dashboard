import { apiPost } from "../BaseAPICaller";
import { TAG_FOLLOW, TAG_UNFOLLOW } from "../Endpoints";

export const followTags = async (setLoading, body) => {
  await apiPost(setLoading, TAG_FOLLOW, body);
};

export const unfollowTags = async (setLoading, body) => {
  await apiPost(setLoading, TAG_UNFOLLOW, body);
};
