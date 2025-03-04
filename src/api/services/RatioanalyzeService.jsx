import { apiGetByParams } from "../BaseAPICaller";
import { RATIO_ANALYZER } from "../Endpoints";

export const getRatioanalyze = async (setLoading, params) => {
  return apiGetByParams(setLoading, RATIO_ANALYZER, params);
};
