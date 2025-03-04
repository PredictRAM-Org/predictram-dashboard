import { apiGetByParams } from "../BaseAPICaller";
import {
  ETF_DATA_GET,
  FUNDAMENTAL_DATA_GET,
  LIVE_PRICE_GET,
  TECHNICAL_HOURLY_DATA_GET,
} from "../Endpoints";
import {
  INVESTOR_FUNDAMENTAL_DATA_GET,
  INVESTOR_LIVE_PRICE_GET,
  INVESTOR_TECHNICAL_HOURLY_DATA_GET,
} from "../InvestorEndpoints";

export const getLivePricefromTopStock = async (
  setLoading,
  params,
  headers,
  role
) => {
  const apiUrl = role === "investor" ? INVESTOR_LIVE_PRICE_GET : LIVE_PRICE_GET;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};

export const getFundamentalData = async (setLoading, params, headers, role) => {
  const apiUrl =
    role === "investor" ? INVESTOR_FUNDAMENTAL_DATA_GET : FUNDAMENTAL_DATA_GET;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};

export const getetfData = async (setLoading, params, headers, role) => {
  const apiUrl = ETF_DATA_GET;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};

export const getTechnicalHourlyData = async (
  setLoading,
  params,
  headers,
  role
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_TECHNICAL_HOURLY_DATA_GET
      : TECHNICAL_HOURLY_DATA_GET;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};
