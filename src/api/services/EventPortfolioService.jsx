import { apiGetByParams, apiPost } from "../BaseAPICaller";
import { INVESTOR_EVENT_PORTFOLIO } from "../InvestorEndpoints";

export const eventPortfolioGet = async (setLoading, params, headers, role) => {
  const apiUrl = INVESTOR_EVENT_PORTFOLIO;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};

export const eventPortfolioCreate = async (setLoading, body, headers, role) => {
  const apiUrl = INVESTOR_EVENT_PORTFOLIO;
  await apiPost(setLoading, apiUrl, body, headers);
};
