import { apiPost, apiPut, apiGetByParams } from "../BaseAPICaller";
import {
  CANCEL_FREE_MEMBERSHIP,
  GIVE_FREE_MEMBERSHIP,
  PAYMENT_CONFIRM,
  PAYMENT_GATEWAY,
  PAYMENT_GATEWAY_WITH_TOKEN,
  PAYMENT_DETAILS
} from "../Endpoints";
import {
  INVESTOR_CANCEL_FREE_MEMBERSHIP,
  INVESTOR_GIVE_FREE_MEMBERSHIP,
  INVESTOR_PAYMENT_CONFIRM,
  INVESTOR_PAYMENT_GATEWAY,
  INVESTOR_PAYMENT_GATEWAY_WITH_TOKEN,
} from "../InvestorEndpoints";

export const getPaymentDetails = async (setLoading, params) => {
  return await apiGetByParams(setLoading, PAYMENT_DETAILS, params);
};

export const paymentGateway = async (setLoading, body, headers, role) => {
  const apiUrl =
    role === "investor" ? INVESTOR_PAYMENT_GATEWAY : PAYMENT_GATEWAY;
  return await apiPost(setLoading, apiUrl, body, headers);
};

export const confirmPaymentUsingToken = async (
  setLoading,
  body,
  headers,
  role
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_PAYMENT_GATEWAY_WITH_TOKEN
      : PAYMENT_GATEWAY_WITH_TOKEN;
  return await apiPut(setLoading, apiUrl, body, headers);
};

export const confirmPayment = async (setLoading, body, headers, role) => {
  const apiUrl =
    role === "investor" ? INVESTOR_PAYMENT_CONFIRM : PAYMENT_CONFIRM;
  return await apiPut(setLoading, apiUrl, body, headers);
};

export const giveFreePremiumMembership = async (
  setLoading,
  body,
  headers,
  role
) => {
  const apiUrl =
    role === "investor" ? INVESTOR_GIVE_FREE_MEMBERSHIP : GIVE_FREE_MEMBERSHIP;
  return await apiPut(setLoading, apiUrl, body, headers);
};

export const cancelFreePremiumMembership = async (
  setLoading,
  body,
  headers,
  role
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_CANCEL_FREE_MEMBERSHIP
      : CANCEL_FREE_MEMBERSHIP;
  return await apiPut(setLoading, apiUrl, body, headers);
};
