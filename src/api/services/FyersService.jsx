import axios from "axios";
import { toast } from "react-toastify";
import { apiPosttoGet, apiGetByParams } from "../BaseAPICaller";
import {
  FYERS_FUNDS_GET,
  FYERS_HOLDINGS_GET,
  FYERS_LOGIN,
  FYERS_PLACE_MLUTIPLE_ORDERED,
  FYERS_POSITION_GET,
  FYERS_PROFILE_GET,
  FYERS_QUOTES,
} from "../Endpoints";

export const FyersLogin = async (setLoading, auth_code, refresh_token) => {
  return await apiPosttoGet(setLoading, FYERS_LOGIN, {
    auth_code: auth_code,
    refresh_token: refresh_token,
  });
};

export const FyersProfile = async (setLoading, access_token) => {
  return await apiGetByParams(setLoading, FYERS_PROFILE_GET, {
    access_token: access_token,
  });
};

export const FyersHoldings = async (setLoading, access_token) => {
  return await apiGetByParams(setLoading, FYERS_HOLDINGS_GET, {
    access_token: access_token,
  });
};

export const FyersPosition = async (setLoading, access_token) => {
  return await apiGetByParams(setLoading, FYERS_POSITION_GET, {
    access_token: access_token,
  });
};

export const fyersPlaceMultiOrder = async (
  setLoading,
  stocks,
  access_token,
  userId,
  totalPrice
) => {
  return await apiPosttoGet(setLoading, FYERS_PLACE_MLUTIPLE_ORDERED, {
    stocks: stocks,
    access_token: access_token,
    userId: userId,
    totalPrice: totalPrice,
  });
};

export const fyersFunds = async (setLoading, access_token) => {
  return await apiGetByParams(setLoading, FYERS_FUNDS_GET, {
    access_token: access_token,
  });
};

export const fyersQuotes = async (params, headers) => {
  return await axios.get(FYERS_QUOTES, {
    headers: {
      ...headers,
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
    },
    params,
  });
};
