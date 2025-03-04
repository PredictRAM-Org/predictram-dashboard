import { apiGet } from "../BaseAPICaller";
import { GET_FIIDII } from "../Endpoints";
import { INVESTOR_GET_FIIDII } from "../InvestorEndpoints";

export const getFIIDII = async (setLoading, headers, role) => {
  const apiUrl = role === "investor" ? INVESTOR_GET_FIIDII : GET_FIIDII;
  return apiGet(setLoading, apiUrl, headers);
};
