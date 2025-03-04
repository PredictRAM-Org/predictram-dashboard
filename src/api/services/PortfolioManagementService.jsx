import { apiGetByParams, apiPost } from "../BaseAPICaller";
import { PORTFOLIO_MANAGEMENT_LEADERBOARD } from "../Endpoints";
import { INVESTOR_PORTFOLIO_MANAGEMENT_LEADERBOARD } from "../InvestorEndpoints";

export const getPortfolioManagementLeaderboard = async (
  setLoading,
  params,
  role,
  headers
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_PORTFOLIO_MANAGEMENT_LEADERBOARD
      : PORTFOLIO_MANAGEMENT_LEADERBOARD;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};

export const acceptPortfolio = async (setLoading, body, headers) => {
  return await apiPost(
    setLoading,
    INVESTOR_PORTFOLIO_MANAGEMENT_LEADERBOARD,
    body,
    headers
  );
};
