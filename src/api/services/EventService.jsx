import axios from "axios";
import { toast } from "react-toastify";
import { apiGet, apiGetByParams, apiPut } from "../BaseAPICaller";
import {
  ECONOMIC_EVENT_RATE_DATA_GET,
  ECONOMIC_EVENT_STOCK_DATA_GET,
  EVENTS_GET,
  EVENT_CHART_DATA_GET,
  EVENT_CURRENT_GET,
  EVENT_PRICE_GET,
  EVENT_TOTAL_PRICE_GET,
  EVENT_UPDATE,
  EVENT_USER_SUBMITTED_GET,
  USER_EVENTS_GET,
} from "../Endpoints";
import { INVESTOR_GET_STOCK_PRICE } from "../InvestorEndpoints";

export const getEvents = async (setLoading, params) => {
  return apiGetByParams(setLoading, EVENTS_GET, params);
};

export const getEconomicEventStockData = async (setLoading, params) => {
  return apiGetByParams(setLoading, ECONOMIC_EVENT_STOCK_DATA_GET, params);
};

export const getEconomicEventUpcomingRate = async (setLoading, params) => {
  return apiGetByParams(setLoading, ECONOMIC_EVENT_RATE_DATA_GET, params);
};

export const userGetEvents = async (setLoading, params) => {
  return apiGetByParams(setLoading, USER_EVENTS_GET, params);
};

export const updateEvent = async (setLoading, id, body) => {
  return apiPut(setLoading, `${EVENT_UPDATE}/${id}`, body);
};

export const getEventChartData = async (setLoading, params) => {
  return apiGetByParams(setLoading, EVENT_CHART_DATA_GET, params);
};

export const getCurrentEvents = async (setLoading, params) => {
  return apiGetByParams(setLoading, EVENT_CURRENT_GET, params);
};

export const getUserSubmittedEvents = async (setLoading, params) => {
  return apiGetByParams(setLoading, EVENT_USER_SUBMITTED_GET, params);
};

export const getStockPrice = async (setLoading, role, headers) => {
  const apiUrl =
    role === "investor" ? INVESTOR_GET_STOCK_PRICE : EVENT_TOTAL_PRICE_GET;
  return apiGet(setLoading, apiUrl, headers);
};

export const getTotalPrice = async () => {
  try {
    const { data } = await axios.get(EVENT_TOTAL_PRICE_GET);
    if (!!data.length) {
      return data;
    }
  } catch (error) {
    toast.error(error);
  }
};

export const getEventPrice = async (id) => {
  try {
    const params = { id };
    const { data } = await axios.get(EVENT_PRICE_GET, { params });
    if (!!data) {
      return data;
    }
  } catch (error) {
    toast.error(error);
  }
};
