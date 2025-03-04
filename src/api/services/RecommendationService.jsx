import { apiGet } from "../BaseAPICaller";
import {
  INVESTOR_RECOMMENDATION_SECTOR,
  INVESTOR_RECOMMENDATION_STOCK,
} from "../InvestorEndpoints";

export const getStockRecommendation = async (setLoading, headers) => {
  return await apiGet(setLoading, INVESTOR_RECOMMENDATION_STOCK, headers);
};

export const getSectorRecommendation = async (setLoading, headers) => {
  return await apiGet(setLoading, INVESTOR_RECOMMENDATION_SECTOR, headers);
};
