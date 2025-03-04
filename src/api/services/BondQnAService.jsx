import { apiGetByParams } from "../BaseAPICaller";
import { BOND_QNA_URL } from "../Endpoints";

export const getBondQnA = async (setLoading, params) => {
  return await apiGetByParams(setLoading, BOND_QNA_URL, params);
};
