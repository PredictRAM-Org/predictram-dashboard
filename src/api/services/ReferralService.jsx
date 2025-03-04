import { apiGetByParams } from "../BaseAPICaller";
import { REFERRALS_COUNT_GET } from "../Endpoints";
import {
  INVESTOR_REFER_COUNT,
  INVESTOR_VERIFY_REFER_CODE,
} from "../InvestorEndpoints";

export const verifyReferCode = async (setLoading, params) => {
  return await apiGetByParams(setLoading, INVESTOR_VERIFY_REFER_CODE, params);
};

export const getReferralCount = async (setLoading, params, headers, role) => {
  const apiUrl =
    role === "investor" ? INVESTOR_REFER_COUNT : REFERRALS_COUNT_GET;
  console.log(apiUrl);
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};
