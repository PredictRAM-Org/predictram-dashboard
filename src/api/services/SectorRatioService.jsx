import { apiGet, apiGetByParams } from "../BaseAPICaller";
import { SECTOR_ALL, SECTOR_RATIO } from "../Endpoints";

export const getAllSectors = async (setLoading) => {
  return await apiGet(setLoading, SECTOR_ALL);
};

export const getSectorRatio = async (setLoading, params) => {
  return await apiGetByParams(setLoading, SECTOR_RATIO, params);
};
