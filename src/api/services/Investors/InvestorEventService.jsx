import { apiGet, apiGetByParams, apiPost } from "../../BaseAPICaller";
import {
  INVESTOR_EVENT_ANALYSIS_GET,
  INVESTOR_EVENT_CREATE,
  INVESTOR_EVENT_GET,
  INVESTOR_CONNECT_ADVISOR,
  INVESTOR_EVENT_SUMMARY_GET,
  INVESTOR_STOCK_BY_CATEGORY_GET,
  ADVISORY_SESSIONS,
  ZOHO_ADVISORY_SESSIONS,
  ETF_DATA,
  BOND_DATA,
  CAREGORIZED_STOCKS_DATA,
  INVESTOR_STOCK_IMPACT,
} from "../../InvestorEndpoints";

export const createInvestorEvent = async (setLoading, body) => {
  await apiPost(setLoading, INVESTOR_EVENT_CREATE, body);
};

export const getInvestorEvents = async (setLoading, params, headers) => {
  return await apiGetByParams(setLoading, INVESTOR_EVENT_GET, params, headers);
};

export const gerAdvisorySessions = async (setLoading, params, headers) => {
  return await apiGetByParams(setLoading, ADVISORY_SESSIONS, params, headers);
};

export const gerZohoAdvisorySessions = async (setLoading, params, headers) => {
  return await apiGetByParams(
    setLoading,
    ZOHO_ADVISORY_SESSIONS,
    params,
    headers
  );
};

export const getSpecificInvestorEvents = async (setLoading, id, headers) => {
  return await apiGet(setLoading, `${INVESTOR_EVENT_GET}/${id}`, headers);
};

export const connectWithAdvisors = async (setLoading, params, headers) => {
  return await apiGetByParams(
    setLoading,
    INVESTOR_CONNECT_ADVISOR,
    params,
    headers
  );
};

export const getInvestorEventAnalysis = async (setLoading, id) => {
  return await apiGet(setLoading, `${INVESTOR_EVENT_ANALYSIS_GET}/${id}`);
};
export const getInvestorStockImpact = async (setLoading, params) => {
  return await apiGetByParams(setLoading, INVESTOR_STOCK_IMPACT, params);
};
export const getInvestorEventSummary = async (setLoading, id) => {
  return await apiGet(setLoading, `${INVESTOR_EVENT_SUMMARY_GET}/${id}`);
};
export const getStocksByCategory = async (setLoading, id, headers) => {
  return await apiGet(
    setLoading,
    `${INVESTOR_STOCK_BY_CATEGORY_GET}/${id}`,
    headers
  );
};

export const getEtfData = async (setLoading, params) => {
  return await apiGetByParams(setLoading, ETF_DATA, params);
};
export const getBondsData = async (setLoading, params) => {
  return await apiGetByParams(setLoading, BOND_DATA, params);
};
export const getCategorizedStocksData = async (setLoading, params) => {
  return await apiGetByParams(setLoading, CAREGORIZED_STOCKS_DATA, params);
};
