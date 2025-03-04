import { apiGet, apiGetByParams, apiPost, apiPut } from "../BaseAPICaller";
import {
  PERSONAL_RESEARCH_PAPER_GET,
  RESEARCH_PAPER_ADMIN_FEATURE,
  RESEARCH_PAPER_ADMIN_PUBLISH,
  RESEARCH_PAPER_FEATURED_GET,
  RESEARCH_PAPER_GET,
  RESEARCH_PAPER_PERSONALIZE_GET,
  RESEARCH_PAPER_RECOMMENDED_GET,
  RESEARCH_PAPER_POINT_BY_LINKEDIN_SHARE_LINK,
  RESEARCH_PAPER_GET_ID,
} from "../Endpoints";
import {
  INVESTOR_RESEARCH_PAPER_FEATURED_GET,
  INVESTOR_RESEARCH_PAPER_GET,
  INVESTOR_RESEARCH_PAPER_PERSONALIZE_GET,
  INVESTOR_RESEARCH_PAPER_RECOMMENDED_GET,
} from "../InvestorEndpoints";

export const getResearchPapers = async (
  setLoading,
  params,
  headers,
  role = "USER"
) => {
  const apiUrl =
    role === "investor" ? INVESTOR_RESEARCH_PAPER_GET : RESEARCH_PAPER_GET;
  return apiGetByParams(setLoading, apiUrl, params, headers);
};

export const getResearchPaperId = async (setLoading, params) => {
  return apiGetByParams(setLoading, RESEARCH_PAPER_GET_ID, params);
};

export const getResearchPaperById = async (setLoading, params) => {
  return apiGetByParams(setLoading, RESEARCH_PAPER_GET, params);
};

export const getUserResearchPaper = async (setLoading, params) => {
  return apiGetByParams(setLoading, PERSONAL_RESEARCH_PAPER_GET, params);
};

export const publishResearchPaperAdmin = async (setLoading, body) => {
  await apiPut(setLoading, RESEARCH_PAPER_ADMIN_PUBLISH, body);
};

export const featureResearchPaperAdmin = async (setLoading, body) => {
  await apiPut(setLoading, RESEARCH_PAPER_ADMIN_FEATURE, body);
};

export const getPointByLinkedinShareLink = async (setLoading, body) => {
  return await apiPost(
    setLoading,
    RESEARCH_PAPER_POINT_BY_LINKEDIN_SHARE_LINK,
    body
  );
};

export const getFeaturedResearchPaper = async (
  setLoading,
  params,
  headers,
  role
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_RESEARCH_PAPER_FEATURED_GET
      : RESEARCH_PAPER_FEATURED_GET;
  return apiGetByParams(setLoading, apiUrl, params, headers);
};

export const getPersonalizeResearchPaper = async (
  setLoading,
  params,
  headers,
  role
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_RESEARCH_PAPER_PERSONALIZE_GET
      : RESEARCH_PAPER_PERSONALIZE_GET;
  return apiGetByParams(setLoading, apiUrl, params, headers);
};

export const getRecommendedResearchPaper = async (
  setLoading,
  params,
  headers,
  role
) => {
  const apiUrl =
    role === "investor"
      ? INVESTOR_RESEARCH_PAPER_RECOMMENDED_GET
      : RESEARCH_PAPER_RECOMMENDED_GET;
  return apiGetByParams(setLoading, apiUrl, params, headers);
};
