import { apiGetByParams } from "../BaseAPICaller";
import { GET_OPTIONANALYZE } from "../Endpoints";
import { INVESTOR_GET_OPTIONANALYZE } from "../InvestorEndpoints";

export const getOptionanalyze = async (setLoading, params, headers, role) => {
  const apiUrl =
    role === "investor" ? INVESTOR_GET_OPTIONANALYZE : GET_OPTIONANALYZE;
  return apiGetByParams(setLoading, apiUrl, params, headers);
};
