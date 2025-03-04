import {
  apiDelete,
  apiGet,
  apiGetByParams,
  apiPost,
  apiPut,
} from "../BaseAPICaller";
import {
  ASSIGN_SESSION,
  SESSION_AVAILABLE,
  SESSION_CREATE,
  SESSION_DELETE,
  SESSION_GET,
  SESSION_GET_UNASSIGNED,
  SESSION_GET_USER_REGISTERED,
  SESSION_NOTIFY,
  SESSION_REGISTER,
  SESSION_UPDATE,
} from "../Endpoints";

export const sessionNotifyEveryone = async (setLoading, params) => {
  return await apiGetByParams(setLoading, SESSION_NOTIFY, params);
};

export const createSession = async (setLoading, body) => {
  await apiPost(setLoading, SESSION_CREATE, body);
};

export const getSessions = async (setLoading, params) => {
  return await apiGetByParams(setLoading, SESSION_GET, params);
};

export const getSessionsUnAssigned = async (setLoading, params) => {
  return await apiGetByParams(setLoading, SESSION_GET_UNASSIGNED, params);
};

export const updateSession = async (setLoading, id, body) => {
  await apiPut(setLoading, `${SESSION_UPDATE}/${id}`, body);
};

export const deleteSession = async (setLoading, id) => {
  await apiDelete(setLoading, `${SESSION_DELETE}/${id}`);
};

export const assignDatesToSession = async (setLoading, body) => {
  return await apiPut(setLoading, ASSIGN_SESSION, body);
};

export const sessionRegister = async (setLoading, body) => {
  await apiPost(setLoading, SESSION_REGISTER, body);
};

export const getSessionsAvailable = async (setLoading) => {
  return await apiGet(setLoading, SESSION_AVAILABLE);
};

export const getUserRegisteredSessions = async (setLoading, id, params) => {
  return await apiGetByParams(
    setLoading,
    `${SESSION_GET_USER_REGISTERED}/${id}`,
    params,
  );
};
