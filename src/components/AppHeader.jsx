import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CButton,
  CNavItem,
  CImage,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Refer from "../components/ReferralSystem/Refer";
import { cilMenu } from "@coreui/icons";
import { AppHeaderDropdown } from "./index";
import { logo } from "../assets/images/logo";
import { useMetaMask } from "metamask-react";
import PaymentOption from "./Payments/PaymentOption";
import PaymentConfirmation from "./Payments/PaymentConfirmation";
import SidebarUserAccess from "./RoleAccessor/SideBarUserAccess";
import LeaveBetaCard from "./BetaSystem/LeaveBetaCard";

const AppHeader = () => {
  const { status, chainId } = useMetaMask();
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow.sidebarShow);
  const investorSidebarShow = useSelector(
    (state) => state.investorSidebarShow.investorSidebarShow
  );
  const auth = useSelector((state) => state.user.authenticated);
  const profilecomplete = useSelector((state) => state.user.profilecomplete);
  const premiumUser = useSelector((state) => state.user.premiumUser);
  const investorPremiumUser = useSelector(
    (state) => state.investor.premiumUser
  );
  const kycCompleted = useSelector((state) => state.investor.kycCompleted);
  const [payment, setPayment] = useState(false);
  const [refer, setRefer] = useState(false);
  const [beta, setBeta] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const investorAuth = useSelector((state) => state.investor.authenticated);
  const isBetaUser = useSelector((state) => state.user.isBetaUser);

  return (
    <CHeader position="sticky" className="mb-4 shadow-none p-3">
      <CContainer fluid>
        {(auth && profilecomplete) || investorAuth ? (
          <CHeaderToggler
            className="ps-1"
            onClick={() => {
              if (investorAuth) {
                dispatch({
                  type: "investorSidebar",
                  investorSidebarShow: !investorSidebarShow,
                });
              }
              dispatch({ type: "sidebar", sidebarShow: !sidebarShow });
            }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
        ) : (
          <CHeaderToggler className="ps-1" />
        )}

        {auth || investorAuth ? (
          <>
            <CHeaderBrand className="p-0" to="/">
              <CIcon className="sidebar-brand-full" icon={logo} height={44} />
            </CHeaderBrand>
            <CHeaderNav
              className="d-flex align-items-center justify-content-center ms-auto p-0"
              style={{ marginLeft: "0.9375rem" }}
            ></CHeaderNav>

            <SidebarUserAccess>
              <CHeaderNav style={{ marginLeft: "0.2375rem" }}>
                <CButton
                  component="a"
                  color="primary"
                  variant="ghost"
                  onClick={() => setRefer(true)}
                  role="button"
                >
                  Refer and Earn
                </CButton>
                {isBetaUser && (
                  <CButton
                    component="a"
                    color="primary"
                    variant="ghost"
                    onClick={() => setBeta(true)}
                    role="button"
                  >
                    Beta
                  </CButton>
                )}
              </CHeaderNav>
              {/* payment gateway */}

              {refer && <Refer refer={refer} setRefer={setRefer} />}
              {beta && <LeaveBetaCard beta={beta} setBeta={setBeta} />}
            </SidebarUserAccess>
            {(investorAuth
              ? !investorPremiumUser && kycCompleted
              : !premiumUser) && (
              <CHeaderNav style={{ marginLeft: "0.2375rem" }}>
                <CButton
                  component="a"
                  color="primary"
                  variant="ghost"
                  onClick={() => setPayment(true)}
                  role="button"
                >
                  Try Premium
                </CButton>
              </CHeaderNav>
            )}
            {payment && (
              <PaymentOption
                resetState={setPayment}
                confirmState={setConfirmPayment}
              />
            )}
            {confirmPayment && <PaymentConfirmation />}

            <CHeaderNav style={{ marginLeft: "0.9375rem" }}>
              <AppHeaderDropdown />
            </CHeaderNav>
          </>
        ) : (
          <>
            <CHeaderBrand className="me-auto" to="/">
              <CIcon className="sidebar-brand-full" icon={logo} height={40} />
            </CHeaderBrand>
            <CHeaderNav>
              <CNavItem>
                <CNavLink to="/register" component={NavLink}>
                  {" "}
                  Register
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/login" component={NavLink}>
                  {" "}
                  Login
                </CNavLink>
              </CNavItem>
            </CHeaderNav>
          </>
        )}
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
