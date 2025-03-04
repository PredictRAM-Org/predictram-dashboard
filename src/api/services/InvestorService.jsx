import { apiGetByParams, apiPost, apiPut } from "../BaseAPICaller";
import {
  INVESTOR_COMPLETE_PROFILE,
  INVESTOR_CREATE,
  INVESTOR_GET,
  INVESTOR_UPDATE,
  USER_LIST,
  INVESTOR_SLOT_AVAILABILITY,
  INVESTOR_BOOKING_SERVICES,
  INVESTOR_APPOINTMENT_BOOKING,
  INVESTOR_APPOINTMENT_FETCH_STAFF,
  INVESTOR_APPOINTMENT_FETCH,
  INVESTOR_APPOINTMENT_RESCHEDULE
} from "../InvestorEndpoints";

export const createInvestors = async (setLoading, body) => {
  return await apiPost(setLoading, INVESTOR_CREATE, body);
};

export const updateInvestors = async (setLoading, body) => {
  return await apiPut(setLoading, INVESTOR_UPDATE, body);
};

export const completeProfileSteps = async (setLoading, body) => {
  return await apiPut(setLoading, INVESTOR_COMPLETE_PROFILE, body);
};

export const getInvestors = async (setLoading, params, headers) => {
  return await apiGetByParams(setLoading, INVESTOR_GET, params, headers);
};

export const getUserList = async (setLoading, params) => {
  return await apiGetByParams(setLoading, USER_LIST, params);
};

export const getBookingsAvailability = async (setLoading, params) => {
  return await apiGetByParams(setLoading, INVESTOR_SLOT_AVAILABILITY, params);
};

export const getBookingsServices = async (setLoading, params) => {
  return await apiGetByParams(setLoading, INVESTOR_BOOKING_SERVICES, params);
};

export const bookAppointment = async (setLoading, params, headers) => {
  return await apiPost(setLoading, INVESTOR_APPOINTMENT_BOOKING, params, headers);
};

export const rescheduleAppointment = async (setLoading, params, headers) => {
  return await apiPost(setLoading, INVESTOR_APPOINTMENT_RESCHEDULE, params, headers);
};

export const fetchStaffs = async (setLoading, params) => {
  return await apiGetByParams(setLoading, INVESTOR_APPOINTMENT_FETCH_STAFF, params);
};

export const fetchAppointment = async (setLoading, params) => {
  return await apiGetByParams(setLoading, INVESTOR_APPOINTMENT_FETCH, params);
};
