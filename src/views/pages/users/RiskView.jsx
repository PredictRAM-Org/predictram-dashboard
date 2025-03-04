import { cilArrowBottom, cilArrowRight } from "@coreui/icons";
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
import knowYourRiskImg from "../../../assets/images/risk_background.svg";

function RiskView() {
  const { id: userId, admin } = useSelector((state) => state.user);
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [userRiskScores, setUserRiskScores] = useState({});
  const [result, setResult] = useState([]);

  const getResult = (score) => {
    const totalScore = score.riskProfile;
    const algoTotalScore = totalScore / 2;
    if (algoTotalScore < 15) {
      setResult(portfolioResults[0]);
    } else if (totalScore >= 15 && totalScore < 20) {
      setResult(portfolioResults[1]);
    } else if (totalScore >= 20 && totalScore < 25) {
      setResult(portfolioResults[2]);
    } else if (totalScore >= 25 && totalScore < 30) {
      setResult(portfolioResults[3]);
    } else {
      setResult(portfolioResults[4]);
    }
  };

  useEffect(() => {
    (async () => {
      const {
        data: [{ riskScores }],
      } = await getRiskScore(setLoading, { id: userId });
      console.log(riskScores, "rohit");
      setUserRiskScores(riskScores);
      getResult(riskScores);
    })();
  }, [userId]);

  return (
    <CCard
      className={"pb-0 shadow-none border border-light"}
      style={{ borderRadius: "0.625rem", padding: "1.25rem" }}
    >
      <CCardTitle>
        <div>Your Risks</div>
      </CCardTitle>
      <CCardBody className="p-0">
        {!Object.keys(userRiskScores).length && (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div>
              <img className="card-img" src={knowYourRiskImg} alt="..." />
            </div>
            <div>
              <CButton
                className="my-4 card-button"
                onClick={() => history.push("/portfolio/your-risk")}
              >
                Know Your Risk Appetite
              </CButton>
            </div>
          </div>
        )}
        {!!Object.keys(userRiskScores).length && (
          <CRow className="justify-content-md-evenly align-items-center">
            <CCol xs={12} md={4}>
              <CChart
                className="p-3"
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
                  labels: ["Risk Tolerancw", "Risk Capacity", "Risk Profile"],
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

            <CCol xs={12} md={4}>
              <h1 className="fw-bold">{result?.status}</h1>
              <p className="fw-semibold text-muted">Your Risk Profile</p>
              <div
                className="d-flex align-items-center gap-3"
                style={{ cursor: "pointer" }}
              >
                <Link
                  to="/portfolio/your-risk"
                  style={{ textDecoration: "none" }}
                >
                  Take the questionnaire again
                </Link>
                <CIcon size="xl" icon={cilArrowRight}></CIcon>
              </div>
            </CCol>
          </CRow>
        )}
      </CCardBody>
    </CCard>
  );
}

export default RiskView;
