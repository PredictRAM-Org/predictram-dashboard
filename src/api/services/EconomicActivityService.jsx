import { apiGet } from "../BaseAPICaller";
import { GET_CPI, GET_GVA, GET_IOIP1, GET_IOIP2 } from "../Endpoints";
import {
  INVESTOR_GET_CPI,
  INVESTOR_GET_GVA,
  INVESTOR_GET_IOIP1,
  INVESTOR_GET_IOIP2,
} from "../InvestorEndpoints";

export const getCpi = async (setLoading, headers, role) => {
  const apiUrl = role === "investor" ? INVESTOR_GET_CPI : GET_CPI;
  return apiGet(setLoading, apiUrl, headers);
};

export const getGva = async (setLoading, headers, role) => {
  const apiUrl = role === "investor" ? INVESTOR_GET_GVA : GET_GVA;
  return apiGet(setLoading, apiUrl, headers);
};

export const getIOIP1 = async (setLoading, headers, role) => {
  const apiUrl = role === "investor" ? INVESTOR_GET_IOIP1 : GET_IOIP1;
  return apiGet(setLoading, apiUrl, headers);
};

export const getIOIP2 = async (setLoading, headers, role) => {
  const apiUrl = role === "investor" ? INVESTOR_GET_IOIP2 : GET_IOIP2;
  return apiGet(setLoading, apiUrl, headers);
};
