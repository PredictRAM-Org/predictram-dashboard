import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  CSidebar,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CNavGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilNewspaper,
  cilSpeedometer,
  cilChartPie,
  cilChartLine,
  cilDescription,
  cilMoney,
  cilChart,
  cilSpreadsheet,
  cilMagnifyingGlass,
  cilCalendar,
  cilBrowser,
  cilGraph,
  cilLockLocked,
} from "@coreui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  fyers_access_token_key,
  fyers_refresh_token_key,
} from "../utils/custom/fyersLogin";
import { paytmMoney_access_token_key } from "../utils/custom/paytmMoneyLogin";
import { cilMobileLock } from "@coreui/icons-pro";

export default function InvestorAppSidebar() {
  const dispatch = useDispatch();
  const sidebarShow = useSelector(
    (state) => state.investorSidebarShow.investorSidebarShow
  );
  const premiumUser = useSelector((state) => state.investor.premiumUser);
  const kycCompleted = useSelector((state) => state.investor.kycCompleted);
  const fyers_access_token = localStorage.getItem(fyers_access_token_key);
  const fyers_refresh_token = localStorage.getItem(fyers_refresh_token_key);
  const paytmMoney_access_token = localStorage.getItem(
    paytmMoney_access_token_key
  );
  return (
    <CSidebar
      position="fixed"
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "investorSidebar", investorSidebarShow: visible });
      }}
    >
      <CSidebarNav>
        <CNavItem to="/investor/dashboard" component={NavLink}>
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
        </CNavItem>

        <CNavGroup
          toggler={
            <>
              <CIcon
                customClassName="nav-icon"
                icon={
                  !premiumUser && !kycCompleted ? cilLockLocked : cilChartPie
                }
              />
              Portfolio
            </>
          }
        >
          {/* {!fyers_access_token &&
            !fyers_refresh_token &&
            !paytmMoney_access_token && (
              <CNavItem to="/investor/broker/connect" component={NavLink}>
                Connect with Broker
              </CNavItem>
            )} */}
          <CNavItem
            disabled={!premiumUser && !kycCompleted}
            to="/investor/portfolio/create-portfolio"
            component={NavLink}
          >
            Create Portfolio
          </CNavItem>
          <CNavItem
            disabled={!premiumUser && !kycCompleted}
            to="/investor/portfolio/your-risk"
            component={NavLink}
          >
            Know Your Risk
          </CNavItem>
          {fyers_access_token && fyers_refresh_token && (
            <CNavItem
              disabled={!premiumUser && !kycCompleted}
              to="/investor/fyers/portfolio/holdings"
              component={NavLink}
            >
              Portfolio Holdings
            </CNavItem>
          )}
          {fyers_access_token && fyers_refresh_token && (
            <CNavItem
              disabled={!premiumUser && !kycCompleted}
              to="/investor/fyers/portfolio/positions"
              component={NavLink}
            >
              Portfolio Positions
            </CNavItem>
          )}
          {paytmMoney_access_token && (
            <CNavItem
              disabled={!premiumUser && !kycCompleted}
              to="/investor/paytmMoney/portfolio/overview"
              component={NavLink}
            >
              Portfolio Overview
            </CNavItem>
          )}
          {/* {paytmMoney_access_token && (
            <CNavItem
              to="/investor/paytmMoney/portfolio/holdings"
              component={NavLink}
            >
              Portfolio Holdings
            </CNavItem>
          )}
          {paytmMoney_access_token && (
            <CNavItem
              to="/investor/paytmMoney/portfolio/positions"
              component={NavLink}
            >
              Portfolio Positions
            </CNavItem>
          )} */}
        </CNavGroup>
        <CNavGroup
          toggler={
            <>
              <CIcon
                customClassName="nav-icon"
                icon={
                  !premiumUser && !kycCompleted ? cilLockLocked : cilNewspaper
                }
              />
              Analysis Tools
            </>
          }
        >
          {/* <CNavItem to="/investor/hedgeos" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cilBrowser} />
            Hedge OS
          </CNavItem>
          <CNavItem to="/investor/ml-codes" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cilGraph} />
            Ml Codes
          </CNavItem> */}
          <CNavItem
            disabled={!premiumUser && !kycCompleted}
            to="/investor/models"
            component={NavLink}
          >
            <CIcon customClassName="nav-icon" icon={cilChart} />
            Ml Model
          </CNavItem>
        </CNavGroup>
        <CNavGroup
          toggler={
            <>
              <CIcon
                customClassName="nav-icon"
                icon={
                  !premiumUser && !kycCompleted ? cilLockLocked : cilNewspaper
                }
              />
              {/* Portfolio Management */}
              Ask Advisors
            </>
          }
        >
          <CNavItem
            disabled={!premiumUser && !kycCompleted}
            to="/investor/portfolio/management/create"
            component={NavLink}
          >
            Create Portfolio Event
          </CNavItem>

          <CNavItem
            disabled={!premiumUser && !kycCompleted}
            to="/investor/portfolio/management"
            component={NavLink}
          >
            View Portfolio Events
          </CNavItem>
        </CNavGroup>
        <CNavItem
          disabled={!premiumUser && !kycCompleted}
          to="/investor/events"
          component={NavLink}
        >
          <CIcon
            customClassName="nav-icon"
            icon={
              !premiumUser && !kycCompleted ? cilLockLocked : cilSpreadsheet
            }
          />
          Event Analysis
        </CNavItem>
        {/* <CNavItem to="/investor/view/incomestatement/event" component={NavLink}>
          <CIcon customClassName="nav-icon" icon={cilSpreadsheet} />
          View Income Event
        </CNavItem> */}
        <CNavItem
          disabled={!premiumUser && !kycCompleted}
          to="/investor/papers"
          component={NavLink}
        >
          <CIcon
            customClassName="nav-icon"
            icon={!premiumUser && !kycCompleted ? cilLockLocked : cilNewspaper}
          />
          View Papers
        </CNavItem>
        <CNavItem
          disabled={!premiumUser && !kycCompleted}
          to="/investor/reports"
          component={NavLink}
        >
          <CIcon
            customClassName="nav-icon"
            icon={
              !premiumUser && !kycCompleted ? cilLockLocked : cilDescription
            }
          />{" "}
          MF activity
        </CNavItem>
        <CNavItem
          disabled={!premiumUser && !kycCompleted}
          to="/investor/economicactivity"
          component={NavLink}
        >
          <CIcon
            customClassName="nav-icon"
            icon={!premiumUser && !kycCompleted ? cilLockLocked : cilChartLine}
          />{" "}
          Economic Activity
        </CNavItem>
        {/* <CNavItem to="/investor/equityderivatives" component={NavLink}>
          <CIcon customClassName="nav-icon" icon={cilMoney} /> Equity
          Derivatives
        </CNavItem>
        <CNavItem to="/investor/fiidii" component={NavLink}>
          <CIcon customClassName="nav-icon" icon={cilMagnifyingGlass} /> FII/FPI
          & DII trading
        </CNavItem>
        <CNavItem to="/investor/optionsanalyzer" component={NavLink}>
          <CIcon customClassName="nav-icon" icon={cilChart} /> Options analyzer
        </CNavItem> */}
        <CNavItem
          disabled={!premiumUser && !kycCompleted}
          to="/investor/advisorysessions"
          component={NavLink}
        >
          <CIcon
            customClassName="nav-icon"
            icon={!premiumUser && !kycCompleted ? cilLockLocked : cilCalendar}
          />{" "}
          Booked Advisory Sessions
        </CNavItem>
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" />
    </CSidebar>
  );
}
