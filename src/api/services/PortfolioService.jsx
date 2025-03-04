// router.get("/getportfoliostock", usermiddleware, getPortfoliostock);
// router.post("/saveportfoliostock", usermiddleware, savePortfoliostock);
// router.put("/updatePortfolio", usermiddleware, updatePortfolio);
// router.put("/deletePortfoliostock", usermiddleware, deletePortfoliostock);

import { apiGetByParams, apiPost, apiPut } from "../BaseAPICaller";
import {
  PORTFOLIO_STOCK_GET,
  PORTFOLIO_STOCK_UPDATE,
  PORTFOLIO_STOCK_SAVE,
  PORTFOLIO_STOCK_DELETE,
} from "../Endpoints";
import {
  INVESTOR_PORTFOLIO_STOCK_GET,
  INVESTOR_PORTFOLIO_STOCK_UPDATE,
  INVESTOR_PORTFOLIO_STOCK_DELETE,
  INVESTOR_PORTFOLIO_STOCK_SAVE,
  INVESTOR_BULK_PORTFOLIO_STOCK_SAVE,
} from "../InvestorEndpoints";

export const getPortfoliostock = async (setLoading, params, headers, role) => {
  const apiUrl =
    role === "investor" ? INVESTOR_PORTFOLIO_STOCK_GET : PORTFOLIO_STOCK_GET;
  return apiGetByParams(setLoading, apiUrl, params, headers);
};

export const savePortfoliostock = async (setLoading, params, headers, role) => {
  const apiUrl =
    role === "investor" ? INVESTOR_PORTFOLIO_STOCK_SAVE : PORTFOLIO_STOCK_SAVE;
  return apiPost(setLoading, apiUrl, params, headers);
};

export const saveBulkPortfolioStock = async (
  setLoading,
  body,
  headers,
  role
) => {
  const apiUrl = INVESTOR_BULK_PORTFOLIO_STOCK_SAVE;
  return apiPost(setLoading, apiUrl, body, headers);
};

export const updatePortfoliostock = async (
  setLoading,
  params,
  headers,
  role
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_PORTFOLIO_STOCK_UPDATE
      : PORTFOLIO_STOCK_UPDATE;
  return apiPut(setLoading, apiUrl, params, headers);
};

export const deletePortfoliostock = async (
  setLoading,
  params,
  headers,
  role
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_PORTFOLIO_STOCK_DELETE
      : PORTFOLIO_STOCK_DELETE;
  return apiPut(setLoading, apiUrl, params, headers);
};
