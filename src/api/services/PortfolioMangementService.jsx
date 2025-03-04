import {
  apiDelete,
  apiGet,
  apiGetByParams,
  apiPost,
  apiPut,
} from "../BaseAPICaller";
import {
  PORTFOLIO_EVENT_CREATE,
  PORTFOLIO_EVENT_GET,
  PORTFOLIO_EVENT_REPORT_CREATE,
  PORTFOLIO_EVENT_REPORT_DELETE,
  PORTFOLIO_EVENT_REPORT_GET,
  PORTFOLIO_EVENT_SUBMIT,
  PORTFOLIO_EVENT_USER_PORTFOLIO_GET,
} from "../Endpoints";
import {
  INVESTOR_PORTFOLIO_EVENT_CREATE,
  INVESTOR_PORTFOLIO_EVENT_GET,
} from "../InvestorEndpoints";

export const createPortfolioManagementEvent = async (
  setLoading,
  body,
  role,
  headers
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_PORTFOLIO_EVENT_CREATE
      : PORTFOLIO_EVENT_CREATE;
  return await apiPost(setLoading, apiUrl, body, headers);
};

export const submitPortfolioManagementEvent = async (setLoading, body) => {
  return await apiPut(setLoading, PORTFOLIO_EVENT_SUBMIT, body);
};

export const getPortfolioManagementEvent = async (
  setLoading,
  params,
  role,
  headers
) => {
  const apiUrl =
    role === "investor" ? INVESTOR_PORTFOLIO_EVENT_GET : PORTFOLIO_EVENT_GET;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};

export const getSpecificPortfolioManagementEvent = async (
  setLoading,
  id,
  role,
  headers
) => {
  const apiUrl =
    role === "investor" ? INVESTOR_PORTFOLIO_EVENT_GET : PORTFOLIO_EVENT_GET;
  return await apiGet(setLoading, `${apiUrl}/${id}`, headers);
};

export const getUserPortfolioManagement = async (setLoading, params) => {
  return await apiGetByParams(
    setLoading,
    PORTFOLIO_EVENT_USER_PORTFOLIO_GET,
    params
  );
};

export const submitPortfolioManagementReport = async (setLoading, body) => {
  return await apiPost(setLoading, PORTFOLIO_EVENT_REPORT_CREATE, body);
};

export const getPortfolioManagementReport = async (setLoading, params) => {
  return await apiGetByParams(setLoading, PORTFOLIO_EVENT_REPORT_GET, params);
};

export const deltePortfolioManagementReport = async (setLoading, params) => {
  return await apiDelete(setLoading, PORTFOLIO_EVENT_REPORT_DELETE, params);
};
