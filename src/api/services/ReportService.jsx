import { apiGet } from "../BaseAPICaller";
import {
  EQUITY_BLOCK,
  EQUITY_BULK,
  EQUITY_DERIVATIVES,
  MUTUAL_FUND_REPORTS,
} from "../Endpoints";
import {
  INVESTOR_EQUITY_BLOCK,
  INVESTOR_EQUITY_BULK,
  INVESTOR_EQUITY_DERIVATIVES,
  INVESTOR_MUTUAL_FUND_REPORTS,
} from "../InvestorEndpoints";

export const getEquityderivatives = async (setLoading, headers, role) => {
  const apiUrl =
    role === "investor" ? INVESTOR_EQUITY_DERIVATIVES : EQUITY_DERIVATIVES;
  return apiGet(setLoading, apiUrl, headers);
};
export const getEquityblock = async (setLoading, headers, role) => {
  const apiUrl = role === "investor" ? INVESTOR_EQUITY_BLOCK : EQUITY_BLOCK;
  return apiGet(setLoading, apiUrl, headers);
};

export const getEquitybulk = async (setLoading, headers, role) => {
  const apiUrl = role === "investor" ? INVESTOR_EQUITY_BULK : EQUITY_BULK;
  return apiGet(setLoading, apiUrl, headers);
};

export const getMutualfund = async (setLoading, headers, role) => {
  const apiUrl =
    role === "investor" ? INVESTOR_MUTUAL_FUND_REPORTS : MUTUAL_FUND_REPORTS;
  return apiGet(setLoading, apiUrl, headers);
};
