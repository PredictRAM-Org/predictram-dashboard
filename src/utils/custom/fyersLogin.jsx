import { FyersLogin, FyersProfile } from "../../api/services/FyersService";
import { completeProfileSteps } from "../../api/services/InvestorService";
import isDev from "../env";

const client_id = isDev ? "OU4MHNZV2Z-100" : "1S0LX7XTKP-100";
const FYERS_URL = "https://api.fyers.in/api/v2/generate-authcode";

export const fyers_refresh_token_key = "fyers_refresh_token";
export const fyers_access_token_key = "fyers_access_token";

export const handelFyersLogin = (redirect_uri) => {
  window.open(
    `${FYERS_URL}?client_id=${client_id}&redirect_uri=${redirect_uri}/investor/dashboard&response_type=code&state=sample_state&scope=openid&nonce=sample_nonce`,
    "_self"
  );
};
export const loginwithFyersAuthCode = async (code, setLoading, investorId) => {
  const { token } = await FyersLogin(setLoading, code);
  if (token?.refresh_token && token?.access_token) {
    localStorage.setItem(fyers_refresh_token_key, token?.refresh_token);
    localStorage.setItem(fyers_access_token_key, token?.access_token);
    await completeProfileSteps(setLoading, { id: investorId, step: 2 });
    window.location.replace("/investor/dashboard");
  }
};

export const loginwithFyersRefreshToken = async (code, setLoading) => {
  const { token } = await FyersLogin(setLoading, null, code);
  console.log(token);
  if (token?.access_token) {
    localStorage.setItem(fyers_access_token_key, token?.access_token);
    window.location.replace("/investor/dashboard");
  } else {
    localStorage.removeItem(fyers_refresh_token_key);
    localStorage.removeItem(fyers_access_token_key);
    window.location.replace("/investor/dashboard");
  }
};

export const checkAccessToken = async (
  accessToken,
  refreshToken,
  setLoading
) => {
  const { expired } = await FyersProfile(setLoading, accessToken);
  console.log(expired);
  if (expired) {
    loginwithFyersRefreshToken(refreshToken, setLoading);
  } else {
    return;
  }
};
