import { apiPost } from "../BaseAPICaller";
import { PORTFOLIO_SCORE_CREATE } from "../Endpoints";

export const publishPortfolioScore = async (setLoading, body) => {
  await apiPost(setLoading, PORTFOLIO_SCORE_CREATE, body);
};
