import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { CLoadingButton } from "@coreui/react-pro";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  confirmPaymentUsingToken,
  giveFreePremiumMembership,
} from "../../api/services/PaymentService";
import { getFutureDate } from "../../utils/DateTimeService";
import displayRazorpay from "../../utils/PaymentGateway";
import PaymentAmountSelect from "./PaymentAmountSelect";

export default function PaymentOption({ resetState, confirmState }) {
  const userId = useSelector((state) => state.user.id);
  const isTriedPremium = useSelector((state) => state.user.triedFreePremium);
  const secretToken = localStorage.getItem("secretToken");
  const [visible, setVisible] = useState(true);
  const [visiblePaymentAmount, setVisiblePaymentAmount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const {
    _id: investorId,
    mobileNumber,
    triedFreePremium: isInvestorTriedPremium,
  } = useSelector((state) => state.investor);

  const handleClose = () => {
    resetState(false);
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("Token is required");
    await confirmPaymentUsingToken(
      setLoading,
      investorId
        ? {
            investorId,
            token,
          }
        : { userId, token },
      { secretToken, mobileNumber },
      investorId ? "investor" : "advisor"
    );
  };

  const confirmFreeMembership = async (e) => {
    e.preventDefault();
    const expiryDate = getFutureDate(60);
    try {
      await giveFreePremiumMembership(
        setLoading,
        investorId ? { investorId, expiryDate } : { userId, expiryDate },
        { secretToken, mobileNumber },
        investorId ? "investor" : "advisor"
      );
    } catch (err) {
      console.log(err);
    } finally {
      handleClose();
      confirmState(true);
    }
  };

  const showPaymentAmountOptions = () => {
    setVisiblePaymentAmount(true);
  };

  return (
    <>
      <CModal alignment="center" visible={visible} onClose={handleClose}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Payment Options</CModalTitle>
        </CModalHeader>
        {visiblePaymentAmount && (
          <PaymentAmountSelect confirmState={confirmState} />
        )}
        {!visiblePaymentAmount && (
          <CModalBody>
            <CForm onSubmit={(e) => handleSubmit(e)} className="row g-3">
              <CRow className="my-4 mx-auto">
                <CButton
                  className="w-100"
                  onClick={() => {
                    // create a separate modal for the user to choose between two plans 650 and 950
                    showPaymentAmountOptions();
                    // displayRazorpay(userId, setLoading, false);
                  }}
                >
                  Pay using Razorpay
                </CButton>
              </CRow>

              {!(investorId ? isInvestorTriedPremium : isTriedPremium) && (
                <>
                  <CRow className="align-items-center text-center mx-auto">
                    <CCol
                      md={5}
                      style={{ height: "2px", background: "#D3D3D3" }}
                    ></CCol>
                    <CCol md={2} style={{ color: "#D3D3D3" }}>
                      OR
                    </CCol>
                    <CCol
                      md={5}
                      style={{ height: "2px", background: "#D3D3D3" }}
                    ></CCol>
                  </CRow>

                  {/* {!investorId && (
                    <div>
                      <CRow className="my-4 mx-auto">
                        <CButton
                          color="success"
                          className="w-100 text-white"
                          onClick={confirmFreeMembership}
                        >
                          Try Premium Features for 2 months
                        </CButton>
                      </CRow>
                      <CRow className="align-items-center text-center mx-auto">
                        <CCol
                          md={5}
                          style={{ height: "2px", background: "#D3D3D3" }}
                        ></CCol>
                        <CCol md={2} style={{ color: "#D3D3D3" }}>
                          OR
                        </CCol>
                        <CCol
                          md={5}
                          style={{ height: "2px", background: "#D3D3D3" }}
                        ></CCol>
                      </CRow>
                    </div>
                  )} */}
                  <CRow className="mt-4">
                    <CCol md={8}>
                      <CFormInput
                        type="text"
                        placeholder="Enter token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        maxLength={26}
                      />
                    </CCol>
                    <CCol md={4}>
                      <CLoadingButton
                        type="submit"
                        className="mb-3"
                        loading={loading}
                      >
                        Apply
                      </CLoadingButton>
                    </CCol>
                  </CRow>
                </>
              )}
            </CForm>
          </CModalBody>
        )}
        <CModalFooter>
          <a
            href="https://predictram.com/pricing.html"
            target="_blank"
            rel="noreferrer noopener"
          >
            Why pay for premium?
          </a>
        </CModalFooter>
      </CModal>
    </>
  );
}
