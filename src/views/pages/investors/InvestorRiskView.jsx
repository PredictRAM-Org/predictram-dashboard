import { cilArrowRight } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getRiskScore } from "../../../api/services/RiskScoreService";
import { portfolioResults } from "../../../data";
import "../../../assets/css/Fontsize.css";
import knowYourRiskImg from "../../../assets/images/risk_background.svg";
import { useQuery } from "@tanstack/react-query";
import Loader from "../users/Loader";

function InvestorRiskView() {
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: investorId } = useSelector((state) => state.investor);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const getResult = (score) => {
    const totalScore = score.riskProfile;
    const algoTotalScore = totalScore / 2;
    if (algoTotalScore < 15) {
      return portfolioResults[0];
    } else if (totalScore >= 15 && totalScore < 20) {
      return portfolioResults[1];
    } else if (totalScore >= 20 && totalScore < 25) {
      return portfolioResults[2];
    } else if (totalScore >= 25 && totalScore < 30) {
      return portfolioResults[3];
    } else {
      return portfolioResults[4];
    }
  };

  const { data: { userRiskScores, result } = {}, isLoading } = useQuery({
    queryKey: "investorRisk",
    queryFn: async () => {
      const response = await getRiskScore(
        setLoading,
        { id: investorId },
        { secretToken, mobileNumber },
        investorId ? "investor" : "advisor"
      );

      if (response?.data?.length) {
        const {
          data: [{ riskScores = {} }],
        } = response;

        if (riskScores?.riskProfile) {
          const result = getResult(riskScores);
          return {
            result: result,
            userRiskScores: riskScores,
          };
        }
      }
    },
    staleTime: 60000 * 2,
  });

  return (
    <CCard
      className={"pb-0 shadow-none border border-light card-dashboard mt-3"}
    >
      <CCardTitle className="text-2">Your Risks</CCardTitle>
      <CCardBody className="p-4" style={{ minHeight: "285px" }}>
        {result ? (
          <>
            {isLoading && <Loader />}
            {!isLoading && (
              <>
                <CRow className="justify-content-md-evenly align-items-center">
                  <CCol xs={12} md={6}>
                    <CChart
                      type="polarArea"
                      options={{
                        plugins: {
                          legend: {
                            fullSize: true,
                            position: "bottom",
                            align: "start",
                          },
                        },
                      }}
                      data={{
                        labels: [
                          "Risk Tolerance",
                          "Risk Capacity",
                          "Risk Profile",
                        ],
                        datasets: [
                          {
                            backgroundColor: ["#321FDB", "#3399FF", "#F9B115"],
                            data: [
                              userRiskScores?.riskTolerance,
                              userRiskScores?.riskCapacity,
                              userRiskScores?.riskProfile,
                            ],
                          },
                        ],
                      }}
                    />
                  </CCol>
                  <CCol xs={12} md={6}>
                    <h1 className="fw-bold ">{result?.status}</h1>
                    <p className="fw-semibold text-muted">Your Risk Profile</p>
                    <div
                      className="d-flex align-items-center gap-3"
                      style={{ cursor: "pointer" }}
                    >
                      <Link
                        className="link-3"
                        to="/investor/portfolio/your-risk"
                        style={{ textDecoration: "none" }}
                      >
                        Take the questionnaire again
                      </Link>
                      <CIcon size="xl" icon={cilArrowRight}></CIcon>
                    </div>
                  </CCol>
                </CRow>
              </>
            )}
          </>
        ) : (
          <CRow className="justify-content-md-evenly align-items-center flex-wrap">
            <img className="card-img" src={knowYourRiskImg} alt="..." />
            <CButton
              className="mt-4 card-button"
              onClick={() => history.push("/investor/portfolio/your-risk")}
            >
              Know Your Risk Appetite
            </CButton>
          </CRow>
        )}
      </CCardBody>
    </CCard>
  );
}

export default InvestorRiskView;
