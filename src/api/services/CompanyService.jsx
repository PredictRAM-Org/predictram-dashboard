import { apiGetByParams,apiPost,apiDelete,apiPut} from "../BaseAPICaller";
import { COMPANY_BY_EVENT,GET_COMPANY_DATA,COMPANYADD_BY_EVENT,COMPANYDELETE_BY_EVENT,COMPANYEDIT_BY_EVENT} from "../Endpoints";

export const compByeventGet = async (setLoading, event) => {
  const params = { event };
  return await apiGetByParams(setLoading, COMPANY_BY_EVENT, params);
};

export const compByeventAdd = async (setLoading, data) => {
  return await apiPost(setLoading,COMPANYADD_BY_EVENT,data);
}

export const compByeventEdit = async (setLoading,id,data) => {
  return await apiPut(setLoading,`${COMPANYEDIT_BY_EVENT}/${id}`,data);
}

export const compByeventDelete = async (setLoading,id) =>{
  return await apiDelete(setLoading,`${COMPANYDELETE_BY_EVENT}/${id}`);
}

export const getCompanydata = async (setLoading, key) => {
  const params = { key };
  return await apiGetByParams(setLoading, GET_COMPANY_DATA, params);
};

