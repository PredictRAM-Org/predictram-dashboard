import { apiGetByParams } from "../BaseAPICaller";
import { LEADERBOARD_CUSTOM_GET, LEADERBOARD_GET ,LEADERBOARD_BY_DATE_GET } from "../Endpoints";

export const getLeaderboard = async (setLoading, params) => {
  return apiGetByParams(setLoading, LEADERBOARD_GET, params);
};

export const getCustomLeaderboard = async (setLoading, params) => {
  return apiGetByParams(setLoading, LEADERBOARD_CUSTOM_GET, params);
};

export const getLeaderboardByDate = async (setLoading, params) => {
  return apiGetByParams(setLoading, LEADERBOARD_BY_DATE_GET, params);
}
