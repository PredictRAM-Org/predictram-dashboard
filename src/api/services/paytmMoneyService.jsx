import axios from "axios";
import { toast } from "react-toastify";
import { apiPosttoGet, apiGetByParams } from "../BaseAPICaller";
import {
  PAYTM_MONEY_HOLDINGS_GET,
  PAYTM_MONEY_LIVE_PRICE,
  PAYTM_MONEY_LOGIN,
  PAYTM_MONEY_PROFILE_GET,
} from "../Endpoints";

export const PaytmMoneyLogin = async (setLoading, requestToken) => {
  return await apiPosttoGet(setLoading, PAYTM_MONEY_LOGIN, {
    requestToken,
  });
};

export const PaytmMoneyProfile = async (setLoading, access_token) => {
  return await apiGetByParams(setLoading, PAYTM_MONEY_PROFILE_GET, {
    access_token: access_token,
  });
};

export const PaytmMoneyHoldings = async (setLoading, access_token) => {
  return await apiGetByParams(setLoading, PAYTM_MONEY_HOLDINGS_GET, {
    access_token: access_token,
  });
};

export const PaytmMoneyLivePrice = async (
  setLoading,
  access_token,
  symbols
) => {
  return await apiGetByParams(setLoading, PAYTM_MONEY_LIVE_PRICE, {
    access_token: access_token,
    symbols: symbols,
  });
};
