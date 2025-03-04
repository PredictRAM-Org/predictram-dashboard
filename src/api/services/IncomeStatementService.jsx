import { apiGetByParams, apiGet, apiPost, apiPut } from "../BaseAPICaller";
import {
  CREATE_INCOME_STATEMENT_EVENT,
  INCOME_STATEMENT_EVENT_GET,
  INCOME_STATEMENT_HISTORY_GET,
  INCOME_STATEMENT_SUMMARY_GET,
  SUBSCRIBE_INCOME_STATEMENT,
} from "../Endpoints";
import {
  INVESTOR_INCOME_STATEMENT_EVENT_GET,
  INVESTOR_INCOME_STATEMENT_SUMMARY_GET,
} from "../InvestorEndpoints";

export const createIncomeStatementEvent = async (
  setLoading,
  body,
  headers,
  role
) => {
  const apiUrl = CREATE_INCOME_STATEMENT_EVENT;
  await apiPost(setLoading, apiUrl, body, headers);
};

export const subscribeToIncomeStatement = async (
  setLoading,
  id,
  body,
  headers,
  role
) => {
  const apiUrl = `${SUBSCRIBE_INCOME_STATEMENT}/${id}`;
  await apiPut(setLoading, apiUrl, body, headers);
};

export const getIncomeStatementEvent = async (
  setLoading,
  params,
  headers,
  role
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_INCOME_STATEMENT_EVENT_GET
      : INCOME_STATEMENT_EVENT_GET;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};

export const getIncomeStatementSummary = async (
  setLoading,
  params,
  headers,
  role
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_INCOME_STATEMENT_SUMMARY_GET
      : INCOME_STATEMENT_SUMMARY_GET;
  const data = await apiGetByParams(setLoading, apiUrl, params, headers);
  return data;
};

export const getIncomeStatementHistory = async (
  setLoading,
  symbol,
  headers,
  role
) => {
  const data = await apiGetByParams(
    setLoading,
    INCOME_STATEMENT_HISTORY_GET,
    { symbol: symbol },
    headers
  );
  return data;
};
