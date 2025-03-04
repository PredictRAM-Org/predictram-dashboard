import { apiDelete, apiGetByParams, apiPost } from "../BaseAPICaller";
import { ETF_CREATE, ETF_GET } from "../Endpoints";
import { INVESTOR_ETF_GET } from "../InvestorEndpoints";

export const etfGet = async (setLoading, id, headers, role) => {
  const params = { id };
  const apiUrl = role === "investor" ? INVESTOR_ETF_GET : ETF_GET;
  return await apiGetByParams(setLoading, apiUrl, params, headers);
};

export const etfCreate = async (setLoading, body) => {
  await apiPost(setLoading, ETF_CREATE, body);
};

export const etfDelete = async (setLoading, id) => {
  await apiDelete(setLoading, `/api/users/deleteETF/${id}`);
};
