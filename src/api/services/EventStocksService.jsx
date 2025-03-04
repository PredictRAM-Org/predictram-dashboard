import { apiDelete, apiGetByParams, apiPost, apiPut } from "../BaseAPICaller";
import { ADMIN_EVENT_STOCKS, EVENT_STOCKS } from "../Endpoints";
import { INVESTOR_EVENT_STOCKS } from "../InvestorEndpoints";

export const createEventStock = async (setLoading, body) => {
  return apiPost(setLoading, ADMIN_EVENT_STOCKS, body);
};

export const updateEventStock = async (setLoading, id, body) => {
  return apiPut(setLoading, `${ADMIN_EVENT_STOCKS}/${id}`, body);
};

export const getEventStock = async (setLoading, params, role, headers) => {
  let url;
  if (!role) url = ADMIN_EVENT_STOCKS;
  else url = role === "investor" ? INVESTOR_EVENT_STOCKS : EVENT_STOCKS;
  return apiGetByParams(setLoading, url, params, headers);
};

export const deleteEventStock = async (setLoading, ids) => {
  return apiDelete(setLoading, `${ADMIN_EVENT_STOCKS}?ids=${ids}`);
};
