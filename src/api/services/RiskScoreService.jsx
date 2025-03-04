import {
  apiGetByParams,
  apiPost,
  apiGet,
  apiPosttoGet,
} from "../BaseAPICaller";
import {
  RISKSCORE_CREATE,
  RISKSCORE_GET,
  RISKSCORE_QUESTIONS_GET,
} from "../Endpoints";
import {
  INVESTOR_RISKSCORE_CREATE,
  INVESTOR_RISKSCORE_GET,
  INVESTOR_RISKSCORE_QUESTIONS_GET,
} from "../InvestorEndpoints";

export const createRiskScore = async (setLoading, body, headers, role) => {
  const apiUrl =
    role === "investor" ? INVESTOR_RISKSCORE_CREATE : RISKSCORE_CREATE;
  return await apiPosttoGet(setLoading, apiUrl, body, headers);
};

export const getRiskScore = async (setLoading, params, headers, role) => {
  const apiUrl = role === "investor" ? INVESTOR_RISKSCORE_GET : RISKSCORE_GET;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};

export const getRiskScoreQuestions = async (setLoading, headers, role) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_RISKSCORE_QUESTIONS_GET
      : RISKSCORE_QUESTIONS_GET;
  return await apiGet(setLoading, apiUrl, headers);
};
