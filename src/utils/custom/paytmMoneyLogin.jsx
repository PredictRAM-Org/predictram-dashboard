import axios from "axios";
import { toast } from "react-toastify";
import {
  PaytmMoneyLogin,
  PaytmMoneyProfile,
} from "../../api/services/paytmMoneyService";

const api_key = "47acc8e3474244309bf87f5a661d1aa2";
const api_secret_key = "a97d18ca431b431990db63466352ab7b";

export const paytmMoney_access_token_key = "paytmMoney_access_token";

export const handelPaytmMoneyLogin = () => {
  window.open(
    `https://login.paytmmoney.com/merchant-login?apiKey=${api_key}`,
    "_self"
  );
};

export const generateAccessToken = async (requestToken, setLoading) => {
  const data = await PaytmMoneyLogin(setLoading, requestToken);
  console.log(data);
  if (data?.access_token) {
    localStorage.setItem(paytmMoney_access_token_key, data?.access_token);
    window.location.replace("/investor/dashboard");
  } else {
    localStorage.removeItem(paytmMoney_access_token_key);
  }
};

export const checkPaytmAccessToken = async (access_token, setLoading) => {
  const data = await PaytmMoneyProfile(setLoading, access_token);
  console.log(data);
  if (!data?.profile) {
    localStorage.removeItem(paytmMoney_access_token_key);
  }
};

export const handelPaytmMoneyTokenExpire = () => {
  localStorage.removeItem(paytmMoney_access_token_key);
  window.location.replace("/investor/dashboard");
};
