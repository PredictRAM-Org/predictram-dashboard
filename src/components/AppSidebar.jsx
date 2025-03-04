import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  CSidebar,
  CSidebarNav,
  CSidebarToggler,
  CNavTitle,
  CNavItem,
  CNavGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilGroup,
  cilHome,
  cilNewspaper,
  cibSuperuser,
  cilSpeedometer,
  cilBook,
  cilChartLine,
  cilDescription,
  cilMoney,
  cilChart,
  cilSpreadsheet,
  cilMagnifyingGlass,
  cilVideo,
  cilLaptop,
  cibHipchat,
  cilCalendar,
  cilBrowser,
  cilEducation,
} from "@coreui/icons";
import { useSelector, useDispatch } from "react-redux";
import SidebarUserAccess from "./RoleAccessor/SideBarUserAccess";

export default function AppSidebar() {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow.sidebarShow);
  const admin = useSelector((state) => state.user.admin);
  const premiumUser = useSelector((state) => state.user.premiumUser);
  const investorAuth = useSelector((state) => state.investor.authenticated);
  const creator = useSelector((state) => state.user.creator);
  const accessToUser = useSelector((state) => state.user.accessToUser);

  return (
    <CSidebar
      position="fixed"
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "sidebar", sidebarShow: visible });
      }}
    >
      <CSidebarNav>
        <CNavItem to="/" component={Link}>
          <CIcon customClassName="nav-icon" icon={cilHome} /> Home
        </CNavItem>
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilSpreadsheet} />
              Events
            </>
          }
        >
          {admin && (
            <CNavItem to="/createevent" component={NavLink}>
              Create Events
            </CNavItem>
          )}
          <CNavItem to="/viewevents" component={NavLink}>
            View Events
          </CNavItem>
          <CNavItem to="/leaderboard" component={NavLink}>
            Leader Board
          </CNavItem>
          <CNavItem to="/event/stock-analysis" component={NavLink}>
            Stock Analysis
          </CNavItem>
          <CNavItem to="/event/sector-analysis" component={NavLink}>
            Sector Analysis
          </CNavItem>
          {/* <CNavItem to="/viewetokens" component={NavLink}>
            View Tokens
          </CNavItem>
          <CNavItem to="/etf/view" component={NavLink}>
            View ETF
          </CNavItem> */}
        </CNavGroup>
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilNewspaper} />
              Research Reports
            </>
          }
        >
          <CNavItem to="/postresearch" component={NavLink}>
            Post Research Paper
          </CNavItem>
          <SidebarUserAccess>
            <CNavItem to="/papers" component={NavLink}>
              View Research Paper
            </CNavItem>
          </SidebarUserAccess>
          <CNavItem to="/recomendation" component={NavLink}>
            {/* <CIcon customClassName="nav-icon" icon={cilBook} />  */}
            Topic Recomendation
          </CNavItem>
          {/* <CNavItem to="/papers-earnpoint" component={NavLink}>
            Share And Earn Point
          </CNavItem> */}
        </CNavGroup>

        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilNewspaper} />
              Analysis Tools
            </>
          }
        >
          <CNavItem to="/hedgeos" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cilBrowser} />
            Hedge OS
          </CNavItem>
          {premiumUser && (
            <CNavItem to="/predictgpt" component={NavLink}>
              <CIcon customClassName="nav-icon" icon={cilEducation} />{" "}
              PredictRAM-cGPU
            </CNavItem>
          )}
          {premiumUser && (
            <CNavItem to="/ratioanalyzer" component={NavLink}>
              <CIcon customClassName="nav-icon" icon={cilChart} />
              Ratio analyzer
            </CNavItem>
          )}
          {/* <CNavItem to="/papers-earnpoint" component={NavLink}>
            Share And Earn Point
          </CNavItem> */}
        </CNavGroup>

        {/* user access */}
        <SidebarUserAccess>
          <CNavItem to="/dashboard" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
          </CNavItem>

          {/* <CNavItem to="/leaderboard" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cilGroup} /> Leader Board
          </CNavItem> */}
          <CNavItem to="/portfolio-management/leaderboard" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cilGroup} /> Performance
            Analysis
          </CNavItem>
          {premiumUser && (
            <CNavItem to="/courses/nismcourse" component={NavLink}>
              <CIcon customClassName="nav-icon" icon={cilBook} /> NISM Course
            </CNavItem>
          )}
          {/* {premiumUser && (
            <CNavItem to="/reports" component={NavLink}>
              <CIcon customClassName="nav-icon" icon={cilDescription} /> MF
              activity
            </CNavItem>
          )} */}
          {premiumUser && (
            <CNavItem to="/economicactivity" component={NavLink}>
              <CIcon customClassName="nav-icon" icon={cilChartLine} /> Economic
              Activity
            </CNavItem>
          )}
          {premiumUser && (
            <CNavItem to="/equityderivatives" component={NavLink}>
              <CIcon customClassName="nav-icon" icon={cilMoney} /> Equity
              Derivatives
            </CNavItem>
          )}
          {/* <CNavItem to="/fiidii" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cilMagnifyingGlass} />{" "}
            FII/FPI & DII trading
          </CNavItem> */}
          {/* {premiumUser && (
            <CNavItem to="/optionsanalyzer" component={NavLink}>
              <CIcon customClassName="nav-icon" icon={cilChart} /> Options
              analyzer
            </CNavItem>
          )} */}
          <CNavItem to="/sessions/register" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cilLaptop} /> Available
            Sessions
          </CNavItem>
          {/* <CNavItem to="/advisorysessions" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cilCalendar} />
            Advisory sessions
          </CNavItem> */}
          {/* {premiumUser && (
            <CNavItem to="/ratioanalyzer" component={NavLink}>
              <CIcon customClassName="nav-icon" icon={cilChart} /> Ratio
              analyzer
            </CNavItem>
          )} */}
          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilNewspaper} />
                Portfolio Management
              </>
            }
          >
            {admin && (
              <CNavItem to="/portfolio/management/create" component={NavLink}>
                Create Portfolio Event
              </CNavItem>
            )}
            <CNavItem to="/portfolio/management" component={NavLink}>
              View Portfolio Events
            </CNavItem>
          </CNavGroup>
          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilSpreadsheet} />
                Income Event
              </>
            }
          >
            {admin && (
              <CNavItem to="/create/incomestatement/event" component={NavLink}>
                Create Income Event
              </CNavItem>
            )}
            <CNavItem to="/view/incomestatement/event" component={NavLink}>
              View Income Event
            </CNavItem>
          </CNavGroup>
          <CNavItem to="/adhuniq" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cibHipchat} /> ADHUNIQ
          </CNavItem>
          <CNavItem to="/economicEventStockAnalysis" component={NavLink}>
            <CIcon customClassName="nav-icon" icon={cibHipchat} /> Event Stock Analysis
          </CNavItem>
          {creator && (
            <CNavGroup
              toggler={
                <>
                  <CIcon customClassName="nav-icon" icon={cilVideo} />
                  Creator
                </>
              }
            >
              <CNavItem to="/creator/create-session" component={NavLink}>
                Create Session
              </CNavItem>
              <CNavItem to="/creator/view-session" component={NavLink}>
                View Session
              </CNavItem>
            </CNavGroup>
          )}
        </SidebarUserAccess>
        {/* Admin controls */}
        {admin && <CNavTitle>Admin</CNavTitle>}
        {admin && (
          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cibSuperuser} />
                Admin
              </>
            }
          >
            <CNavItem to="/admin/events" component={NavLink}>
              Events Data
            </CNavItem>
            {accessToUser && (
              <CNavItem to="/admin/users" component={NavLink}>
                Give Access
              </CNavItem>
            )}

            <CNavGroup toggler={<>Reports</>}>
              <CNavItem
                to="/admin/reports/event-subscriber"
                component={NavLink}
              >
                Event Subscriber Report
              </CNavItem>
              <CNavItem to="/admin/returns" component={NavLink}>
                Subscriber Portfolio
              </CNavItem>
              {accessToUser && (
                <CNavItem to="/admin/reports/users" component={NavLink}>
                  New Users
                </CNavItem>
              )}
            </CNavGroup>

            <CNavItem to="/admin/researchpapers" component={NavLink}>
              Research Papers
            </CNavItem>
            <CNavItem to="/admin/manage-email" component={NavLink}>
              Manage Email
            </CNavItem>
            <CNavItem to="/admin/assign-sessions" component={NavLink}>
              Assign Session
            </CNavItem>
            <CNavItem to="/admin/portfolio/management/" component={NavLink}>
              Portfolio Management Data
            </CNavItem>

            <CNavItem to="/admin/incomestatement" component={NavLink}>
              Income Event
            </CNavItem>
            <CNavItem to="/admin/bond-qna" component={NavLink}>
              Bond QnA
            </CNavItem>
            <CNavItem to="/admin/payment-details" component={NavLink}>
              Payment Details
            </CNavItem>
          </CNavGroup>
        )}
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" />
    </CSidebar>
  );
}
