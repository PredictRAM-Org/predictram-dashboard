import { cilChartPie, cilUser } from "@coreui/icons";
import { cidMoney } from "@coreui/icons-pro";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCardBody,
  CCardSubtitle,
  CCardText,
  CCol,
  CProgress,
  CProgressBar,
  CRow,
} from "@coreui/react";
import { CCard, CCardTitle } from "@coreui/react-pro";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getInvestors } from "../../../api/services/InvestorService";

const profileProgressDetails = [
  {
    title: "Calculate your risk",
    subTitle: "See how much risk you can take",
    icon: cilUser,
    value: 0,
    actionURL: "/investor/portfolio/your-risk",
  },
  {
    title: "Calculate your portfolio risk",
    subTitle: "See how much risk your portfolio has",
    icon: cilChartPie,
    value: 33.33,
    actionURL: "/investor/broker/connect",
  },
  {
    title: "View Event Analysis",
    subTitle:
      "View the Event Analysis to get the insights about the event and stocks",
    icon: cidMoney,
    value: 66.66,
    actionURL: "/investor/events",
  },
];

function InvestorProfileProgress() {
  const history = useHistory();
  const mobileNumber = useSelector((state) => state.investor.mobileNumber);

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const findCurrentProfileStep = (userDetails) => {
    const { profileCompletionSteps } = userDetails;
    const currentProfileStep = profileCompletionSteps?.yourRisk
      ? profileCompletionSteps.portfolioRisk
        ? 2
        : 1
      : 0;
    setCurrentStep(currentProfileStep);
  };

  const currentUserDetails = async () => {
    const {
      data: [userDetails],
    } = await getInvestors(setLoading, { mobileNumber });
    findCurrentProfileStep(userDetails);
  };

  useEffect(() => {
    if (mobileNumber) {
      currentUserDetails();
    }
  }, [mobileNumber]);

  return (
    <CCard className="card-dashboard">
      <CCardBody>
        <CCardTitle>
          <CProgress className="mb-3">
            <CProgressBar
              animated
              color="success"
              variant="striped"
              value={profileProgressDetails[currentStep].value}
            />
          </CProgress>
        </CCardTitle>
        <CCardSubtitle>
          Complete 3 steps to start investing fearlessly
        </CCardSubtitle>

        <CRow className="mt-4 card-footer-custom align-items-center">
          <CCol xs={1} md={1}>
            <CIcon size="xxl" icon={profileProgressDetails[currentStep].icon} />
          </CCol>
          <CCol xs={9} md={9}>
            <CCardText className="text-2 bold">
              {profileProgressDetails[currentStep].title}
            </CCardText>
            <CCardText className="4">
              {profileProgressDetails[currentStep].subTitle}
            </CCardText>
          </CCol>
          <CCol xs={2} md={2}>
            <CButton
              onClick={() =>
                history.push(profileProgressDetails[currentStep].actionURL)
              }
            >
              Calculate
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
}

export default InvestorProfileProgress;
