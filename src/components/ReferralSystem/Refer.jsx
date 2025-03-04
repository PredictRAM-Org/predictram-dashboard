import {
  CButton,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCard,
  CCardBody,
  CFormLabel,
  CInputGroup,
  CListGroup,
  CListGroupItem,
  CCardHeader,
} from "@coreui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../redux/action/useraction";
import { toast } from "react-toastify";
import { getReferralCount } from "../../api/services/ReferralService";
import { useState } from "react";
import Loader from "../../views/pages/users/Loader";

export default function Addcompanyevent({ refer, setRefer }) {
  const { name, email } = useSelector((state) => state.user);
  const secretToken = localStorage.getItem("secretToken");
  const [refercount, setRefercount] = useState(50);
  const [loading, setLoading] = useState(false);
  const {
    _id: investorId,
    mobileNumber,
    firstName,
  } = useSelector((state) => state.investor);
  const dispatch = useDispatch();

  const fetchReferralCount = async () => {
    const data = await getReferralCount(
      setLoading,
      { id: investorId },
      { mobileNumber, secretToken },
      investorId ? "investor" : "advisor"
    );
    console.log(data);
    setRefercount(50 - data?.totalrefers);
  };

  useEffect(() => {
    dispatch(getuser());
    fetchReferralCount();
  }, []);

  return (
    <CModal alignment="center" visible={refer} onClose={() => setRefer(false)}>
      <CModalHeader onClose={() => setRefer(false)}>
        <CModalTitle>Refer and Earn</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard flush>
          {!loading && (
            <CCardBody>
              {refercount != 0 ? (
                <p className="text-primary fs-5">
                  {refercount} People left in order to win exciting prizes
                </p>
              ) : (
                <p>You referred 50 people</p>
              )}
              <CFormLabel htmlFor="inputEmail">Referral link</CFormLabel>
              <CInputGroup className="mb-3 d-flex">
                <CFormInput
                  disabled
                  id="inputEmail"
                  value={
                    investorId
                      ? `${
                          window.location.origin
                        }/register/investor?refercode=${firstName}-${mobileNumber.replace(
                          "+",
                          ""
                        )}`
                      : `${window.location.origin}/register/advisor?refercode=${name}-${email}`
                  }
                  placeholder="Enter Email Address"
                />
                <CButton
                  type="button"
                  color="success"
                  variant="outline"
                  id="button-addon1"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      investorId
                        ? `${
                            window.location.origin
                          }/register/investor?refercode=${firstName}-${mobileNumber.replace(
                            "+",
                            ""
                          )}`
                        : `${window.location.origin}/register/advisor?refercode=${name}-${email}`
                    );
                    toast.success("Referal link coppied");
                  }}
                >
                  Copy
                </CButton>
              </CInputGroup>
            </CCardBody>
          )}
          {loading && <Loader />}
        </CCard>
        <CCardHeader className="mt-2">Prizes</CCardHeader>
        <CListGroup flush>
          <CListGroupItem>
            Refer 50 of your closest friends and get a whopping Rs.500 for
            successful signup!
          </CListGroupItem>
          <CListGroupItem>
            Get additional 15% if your refers get paid subscription
          </CListGroupItem>
        </CListGroup>
      </CModalBody>
    </CModal>
  );
}
