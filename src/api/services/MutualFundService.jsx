import { apiGetByParams, apiPost } from "../BaseAPICaller";
import { INVESTOR_MUTUAL_FUND } from "../InvestorEndpoints";

export const mutualFundGet = async (setLoading, params, headers, role) => {
  const apiUrl = INVESTOR_MUTUAL_FUND;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};
