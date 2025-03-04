import { apiGetByParams } from "../BaseAPICaller";
import {
  GET_REPORT_EVENT,
  GET_REPORT_PORTFOLIO,
} from "../Endpoints";

export const getReports = async (setLoading, params) => {
  return apiGetByParams(setLoading, GET_REPORT_EVENT, params);
};
export const getPortfolioReports = async (setLoading, params) => {
  return apiGetByParams(setLoading, GET_REPORT_PORTFOLIO, params);
};

