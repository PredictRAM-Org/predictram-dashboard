import React, { Suspense, lazy } from "react";
import { CContainer, CSpinner } from "@coreui/react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminResearchPapers from "../views/pages/admin/AdminResearchPapers";
import AccessRoles from "../views/pages/users/auth/AccessRoles";
import InvestorRegister from "../views/pages/users/auth/InvestorRegister";
import InvestorVerifyOtp from "../views/pages/users/auth/InvestorVerifyOtp";
import InvestorRegisterDetails from "../views/pages/users/auth/InvestorRegisterDetails";
import InvestorLogin from "../views/pages/users/auth/InvestorLogin";
import InvestorDashboard from "../views/pages/investors/InvestorDashboard";
import {
  fyers_access_token_key,
  fyers_refresh_token_key,
} from "../utils/custom/fyersLogin";
import ConnectWithBroker from "../views/pages/users/portfolio/ConnectWithBroker";
import ViewPortfolioManagementEvents from "../views/pages/portfolioManagementEvent/ViewPortfolioManagementEvent";
import PortfolioManagementEventSubmit from "../views/pages/portfolioManagementEvent/PortfolioManagementEventSubmit";
import PostPortfolioReport from "../views/pages/portfolioManagementEvent/PostPortfolioReport";
import ViewPortfolioReport from "../views/pages/portfolioManagementEvent/ViewPortfolioReport";
import InvestorViewEvents from "../views/pages/investors/events/InvestorViewEvents";
import InvestorViewEventDetails from "../views/pages/investors/events/InvestorViewEventDetails";
import FundamentalData from "../views/pages/investors/technicalFundamental/FundamentalData";
import TechnicalData from "../views/pages/investors/technicalFundamental/TechnicalData";
import CreateIncomeStatementEvent from "../views/pages/users/incomeStatementEvent/CreateIncomeStatementEvent";
import IncomeStatement from "../views/pages/users/incomeStatementEvent/IncomeStatement";
import AdminIncomeStatement from "../views/pages/admin/AdminIncomeStatement";
import AdminIncomeStatementDetails from "../views/pages/admin/AdminIncomeStatementDetails";
import AdminEventSubscriberReport from "../views/pages/admin/AdminEventSubscriberReport";
import ViewAllStatements from "../views/pages/users/incomeStatementEvent/ViewAllStatement";
import InvestorProfile from "../views/pages/investors/profile/InvestorProfile";
import ViewAllInvestorStatements from "../views/pages/investors/incomeStatementEvent/ViewAllInvestorStatements";
import InvestorIncomeStatement from "../views/pages/investors/incomeStatementEvent/InvestorIncomeStatement";
import UserAccess from "./RoleAccessor/UserAccess";
import AdminAccess from "./RoleAccessor/AdminAccess";
import AdminInternSelection from "../views/pages/admin/AdminInternSelection";
import { paytmMoney_access_token_key } from "../utils/custom/paytmMoneyLogin";
import AdminReturns from "../views/pages/admin/AdminReturns";

const Dashboard = lazy(() => import("../views/pages/users/Dashboard"));
const Adhuniq = lazy(() => import("../views/pages/users/adhuniq/Chat"));
const EconomicEventStockAnalysisPage = lazy(() =>
  import(
    "../views/pages/users/economicEventStockAnalysis/EconomicEventStockAnalysisPage"
  )
);
const Profile = lazy(() => import("../views/pages/users/profile/Profile"));
const Otherprofile = lazy(() =>
  import("../views/pages/users/profile/Otherprofile")
);
const Register = lazy(() => import("../views/pages/users/auth/Register"));
const Loginform = lazy(() => import("../views/pages/users/auth/Loginform"));
const ForgetPassword = lazy(() =>
  import("../views/pages/users/auth/ForgetPassword")
);
const Completeprofile = lazy(() =>
  import("../views/pages/users/auth/Completeprofile")
);
const Page404 = lazy(() => import("../views/pages/Page404"));
const PostResearch = lazy(() =>
  import("../views/pages/users/research/PostResearch")
);
const ViewResearch = lazy(() =>
  import("../views/pages/users/research/ViewResearch")
);

const ResearchFeedback = lazy(() =>
  import("../views/pages/users/research/ResearchFeedback")
);
const YourResearch = lazy(() =>
  import("../views/pages/users/research/YourResearch")
);
const CreateEvent = lazy(() =>
  import("../views/pages/users/events/CreateEvent")
);
const ViewEvents = lazy(() => import("../views/pages/users/events/ViewEvents"));

const EventStockAnalysis = lazy(() =>
  import("../views/pages/users/events/EventStockAnalysis")
);

const EventSectorAnalysis = lazy(() =>
  import("../views/pages/users/events/EventSectorAnalysis")
);

const CreatePortfolioEvent = lazy(() =>
  import(
    "../views/pages/portfolioManagementEvent/CreatePortfolioManagementEvent"
  )
);
const ViewPortfolioEvents = lazy(() =>
  import("../views/pages/users/events/ViewEvents")
);

const ViewTokensPages = lazy(() =>
  import("../views/pages/users/events/ViewTokensPages")
);
const ViewETF = lazy(() => import("../views/pages/users/events/ViewETF"));

const ResearchPage = lazy(() =>
  import("../views/pages/users/research/ResearchPage")
);
const BondQnA = lazy(() => import("../views/pages/admin/BondQnA"));
const PaymentDetails = lazy(() =>
  import("../views/pages/admin/PaymentDetails")
);
const AdminEvents = lazy(() => import("../views/pages/admin/AdminEvents"));
const AdminEventPage = lazy(() =>
  import("../views/pages/admin/AdminEventPage")
);
const AdminUsersData = lazy(() =>
  import("../views/pages/admin/AdminUsersData")
);
const NewUsersData = lazy(() => import("../views/pages/admin/NewUsersData"));
const Event = lazy(() => import("../views/pages/users/events/Event"));
const TokenPurchase = lazy(() =>
  import("../views/pages/users/events/TokenPurchase")
);
const EtfPurchase = lazy(() =>
  import("../views/pages/users/events/EtfPurchase")
);
const Reports = lazy(() => import("../views/pages/users/Reports"));
const Optionsanalyzer = lazy(() =>
  import("../views/pages/users/optionsanalyzer/Optionsanalyzer")
);
const Ratioanalyzer = lazy(() =>
  import("../views/pages/users/ratioanalyzer/Ratioanalyzer")
);
const Hedgeos = lazy(() => import("../views/pages/users/hedgeos/HedgeOs"));
const MlCodes = lazy(() => import("../views/pages/investors/MLCodes/ml-codes"));
const Models = lazy(() =>
  import("../views/pages/investors/Models/InvestorModelDashboard")
);
const PredictGpt = lazy(() =>
  import("../views/pages/users/predictgpt/PredictGpt")
);
const InvestorAdvisorySessions = lazy(() =>
  import("../views/pages/investors/sessions/AdvisorySessions")
);
const NismCourse = lazy(() =>
  import("../views/pages/users/courses/NismCourse")
);
const AdvisorySessions = lazy(() =>
  import("../views/pages/users/sessions/AdvisorySessions")
);
const EquityDerivatives = lazy(() =>
  import("../views/pages/users/EquityDerivatives")
);
const Fiidii = lazy(() => import("../views/pages/users/Fiidii"));
const LeaderBoard = lazy(() => import("../views/pages/users/LeaderBoard"));
const PortfolioManagementLeaderBoard = lazy(() =>
  import("../views/pages/users/PortfolioManagementLeaderBoard")
);
const Recomendation = lazy(() => import("../views/pages/users/Recomendation"));
const EconomicActivity = lazy(() =>
  import("../views/pages/users/EconomicActivity")
);
const Tag = lazy(() => import("../views/pages/users/Tag"));
const KnowYourRisk = lazy(() =>
  import("../views/pages/users/portfolio/KnowYourRisk")
);
const CreatePortfolio = lazy(() =>
  import("../views/pages/users/portfolio/CreatePortfolio")
);
const FyersPortfolioOverview = lazy(() =>
  import("../views/pages/users/portfolio/fyers/PortfolioOverview")
);

const FyersPortfolioHoldings = lazy(() =>
  import("../views/pages/users/portfolio/fyers/PortfolioHoldings")
);

const FyersPortfolioPositions = lazy(() =>
  import("../views/pages/users/portfolio/paytmMoney/PortfolioPosition")
);

const PaytmMoneyPortfolioOverview = lazy(() =>
  import("../views/pages/users/portfolio/paytmMoney/PortfolioOverview")
);

const PaytmMoneyPortfolioHoldings = lazy(() =>
  import("../views/pages/users/portfolio/paytmMoney/PortfolioHoldings")
);

const PaytmMoneyPortfolioPositions = lazy(() =>
  import("../views/pages/users/portfolio/fyers/PortfolioPosition")
);

const AdminEmail = lazy(() => import("../views/pages/admin/AdminEmail"));

const CreateSession = lazy(() =>
  import("../views/pages/users/session/CreateSession")
);

const SessionRegister = lazy(() =>
  import("../views/pages/users/SessionRegister")
);
const ViewSession = lazy(() =>
  import("../views/pages/users/session/ViewSession")
);
const AssignSessions = lazy(() =>
  import("../views/pages/admin/AssignSessions")
);

const PaperSharePoint = lazy(() =>
  import("../views/pages/users/research/PaperSharePoint")
);

const SessionDetails = lazy(() =>
  import("../views/pages/users/session/SessionDetails")
);

const AdminPortfolioMangement = lazy(() =>
  import("../views/pages/admin/AdminPortfolioMangement")
);

const AdminPortfolioManagementDetails = lazy(() =>
  import("../views/pages/admin/AdminPortfolioManagementDetails")
);

//const InvestorViewETF = lazy(()=>import('../views/pages/investors/InvestorViewETF'));

export default function AppContent() {
  const auth = useSelector((state) => state.user.authenticated);
  const investorAuth = useSelector((state) => state.investor.authenticated);
  const admin = useSelector((state) => state.user.admin);
  const creator = useSelector((state) => state.user.creator);
  const profilecomplete = useSelector((state) => state.user.profilecomplete);
  const fyers_access_token = localStorage.getItem(fyers_access_token_key);
  const fyers_refresh_token = localStorage.getItem(fyers_refresh_token_key);
  const paytmMoney_access_token = localStorage.getItem(
    paytmMoney_access_token_key
  );
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              if (auth && profilecomplete) {
                return <ViewEvents {...props} />;
              } else if (investorAuth) {
                return <Redirect to="/investor" />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <Dashboard {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/adhuniq"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <Adhuniq {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/economicEventStockAnalysis"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <EconomicEventStockAnalysisPage {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/profile"
            render={(props) =>
              auth && profilecomplete ? (
                <Profile {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/profile"
            render={(props) =>
              investorAuth ? (
                <InvestorProfile {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/profile/:id"
            render={(props) =>
              investorAuth ? (
                <InvestorProfile {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/profile/:id"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <Otherprofile {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/leaderboard"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <LeaderBoard {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/portfolio-management/leaderboard"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <PortfolioManagementLeaderBoard {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/recomendation"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <Recomendation {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/tag/:id"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <Tag {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              auth ? (
                <Redirect to="/completeprofile" />
              ) : (
                <AccessRoles {...props} />
              )
            }
          />
          <Route
            exact
            path="/register/investor"
            render={(props) => <InvestorRegister {...props} />}
          />
          <Route
            path="/register/advisor/:role"
            render={(props) => <Register {...props} />}
          />
          <Route
            path="/register/investor/verify-otp"
            render={(props) => <InvestorVerifyOtp {...props} />}
          />
          <Route
            path="/register/investor/info"
            render={(props) => <InvestorRegisterDetails {...props} />}
          />
          <Route
            exact
            path="/investor/dashboard"
            render={(props) =>
              investorAuth ? (
                <InvestorDashboard {...props} />
              ) : (
                <Redirect to="/register/investor" />
              )
            }
          />
          <Route
            exact
            path="/investor"
            render={(props) =>
              investorAuth ? (
                <InvestorDashboard {...props} />
              ) : (
                <Redirect to="/register/investor" />
              )
            }
          />
          <Route
            exact
            path="/investor/portfolio/your-risk"
            render={(props) =>
              investorAuth ? (
                <KnowYourRisk {...props} />
              ) : (
                <Redirect to="/register/investor" />
              )
            }
          />
          <Route
            exact
            path="/investor/portfolio/create-portfolio"
            render={(props) =>
              investorAuth ? (
                <CreatePortfolio {...props} />
              ) : (
                <Redirect to="/register/investor" />
              )
            }
          />
          <Route
            exact
            path="/investor/viewevents"
            render={(props) =>
              investorAuth ? (
                <ViewEvents {...props} />
              ) : (
                <Redirect to="/register/investor" />
              )
            }
          />
          <Route
            exact
            path="/investor/etf"
            render={(props) =>
              investorAuth ? (
                <ViewETF {...props} />
              ) : (
                <Redirect to="/register/investor" />
              )
            }
          />
          <Route
            exact
            path="/investor/etf/buy"
            render={(props) =>
              investorAuth ? (
                <EtfPurchase {...props} />
              ) : (
                <Redirect to="/register/investor" />
              )
            }
          />
          <Route
            exact
            path="/investor/broker/connect"
            render={(props) =>
              investorAuth &&
              !fyers_access_token &&
              !fyers_refresh_token &&
              !paytmMoney_access_token ? (
                <ConnectWithBroker {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/fyers/portfolio/overview"
            render={(props) =>
              investorAuth && fyers_access_token && fyers_refresh_token ? (
                <FyersPortfolioOverview {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/fyers/portfolio/holdings"
            render={(props) =>
              investorAuth && fyers_access_token && fyers_refresh_token ? (
                <FyersPortfolioHoldings {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/fyers/portfolio/positions"
            render={(props) =>
              investorAuth && fyers_access_token && fyers_refresh_token ? (
                <FyersPortfolioPositions {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/paytmMoney/portfolio/overview"
            render={(props) =>
              investorAuth && paytmMoney_access_token ? (
                <PaytmMoneyPortfolioOverview {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/paytmMoney/portfolio/holdings"
            render={(props) =>
              investorAuth && paytmMoney_access_token ? (
                <PaytmMoneyPortfolioHoldings {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/paytmMoney/portfolio/positions"
            render={(props) =>
              investorAuth && paytmMoney_access_token ? (
                <PaytmMoneyPortfolioPositions {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              auth ? (
                <Redirect to="/completeprofile" />
              ) : (
                <AccessRoles {...props} />
              )
            }
          />
          <Route
            exact
            path="/login/advisor"
            render={(props) =>
              auth ? (
                <Redirect to="/completeprofile" />
              ) : (
                <Loginform {...props} />
              )
            }
          />
          <Route
            exact
            path="/login/investor"
            render={(props) => <InvestorLogin {...props} />}
          />
          <Route
            exact
            path="/completeprofile"
            render={(props) =>
              auth && profilecomplete ? (
                <Redirect to="/dashboard" />
              ) : auth ? (
                <Completeprofile {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/forgetpassword"
            render={(props) =>
              auth ? (
                <Redirect to="/completeprofile" />
              ) : (
                <ForgetPassword {...props} />
              )
            }
          />
          <Route
            exact
            path="/postresearch"
            render={(props) =>
              auth && profilecomplete ? (
                <PostResearch {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/papers"
            render={(props) => (
              <UserAccess>
                <ViewResearch {...props} />
              </UserAccess>
            )}
          />
          <Route
            exact
            path="/investor/papers"
            render={(props) => <ViewResearch {...props} />}
          />
          <Route
            exact
            path="/papers/:tab"
            render={(props) => (
              <UserAccess>
                <ViewResearch {...props} />
              </UserAccess>
            )}
          />
          <Route
            exact
            path="/yourresearch"
            render={(props) =>
              auth && profilecomplete ? (
                <YourResearch {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {/* <Route
            exact
            path="/papers-earnpoint"
            render={(props) =>
              auth && profilecomplete ? (
                <PaperSharePoint {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          /> */}
          <Route
            exact
            path="/optionsanalyzer"
            render={(props) => (
              <UserAccess>
                <Optionsanalyzer {...props} />
              </UserAccess>
            )}
          />
          {/* <Route
            exact
            path="/investor/optionsanalyzer"
            render={(props) => <Optionsanalyzer {...props} />}
          /> */}
          <Route
            exact
            path="/investor/advisorysessions"
            render={(props) => <InvestorAdvisorySessions {...props} />}
          />
          <Route
            exact
            path="/advisorysessions"
            render={(props) => <AdvisorySessions {...props} />}
          />
          <Route
            exact
            path="/predictgpt"
            render={(props) => <PredictGpt {...props} />}
          />
          <Route
            exact
            path="/ratioanalyzer"
            render={(props) => <Ratioanalyzer {...props} />}
          />
          <Route
            exact
            path="/hedgeos"
            render={(props) => <Hedgeos {...props} />}
          />
          <Route
            exact
            path="/investor/hedgeos"
            render={(props) => <Hedgeos {...props} />}
          />
          <Route
            exact
            path="/investor/ml-codes"
            render={(props) => <MlCodes {...props} />}
          />
          <Route
            exact
            path="/investor/models"
            render={(props) => <Models {...props} />}
          />
          <Route
            exact
            path="/createevent"
            render={(props) => (
              <AdminAccess>
                <CreateEvent {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/viewevents"
            render={(props) =>
              auth && profilecomplete ? (
                <ViewEvents {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/event/stock-analysis"
            render={(props) =>
              auth && profilecomplete ? (
                <EventStockAnalysis {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/event/sector-analysis"
            render={(props) =>
              auth && profilecomplete ? (
                <EventSectorAnalysis {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/portfolio/management/create"
            render={(props) => (
              <AdminAccess>
                <CreatePortfolioEvent {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/portfolio/management"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <ViewPortfolioManagementEvents {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/portfolio/management/:id"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <PortfolioManagementEventSubmit {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/admin/portfolio/management"
            render={(props) =>
              auth && profilecomplete ? (
                <AdminPortfolioMangement {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/admin/portfolio/management/:id"
            render={(props) =>
              auth && profilecomplete ? (
                <AdminPortfolioManagementDetails {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/portfolio/management/report/create/:eventId"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <PostPortfolioReport {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/portfolio/management/report/view/:eventId"
            render={(props) =>
              (auth && profilecomplete) || investorAuth ? (
                <UserAccess>
                  <ViewPortfolioReport {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/viewetokens"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <ViewTokensPages {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/etf/view"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <ViewETF {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/etf/buy"
            render={(props) =>
              auth && profilecomplete ? (
                <EtfPurchase {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/viewresearch/:id"
            render={(props) => <ResearchPage {...props} />}
          />
          <Route
            exact
            path="/viewresearch/:id/feedback"
            render={(props) => <ResearchFeedback {...props} />}
          />
          <Route
            exact
            path="/reports"
            render={(props) =>
              auth && profilecomplete ? (
                <Reports {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/portfolio/management/create"
            render={(props) =>
              investorAuth ? (
                <CreatePortfolioEvent {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/portfolio/management"
            render={(props) =>
              investorAuth ? (
                <ViewPortfolioManagementEvents {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/portfolio/management/:id"
            render={(props) =>
              investorAuth ? (
                <AdminPortfolioManagementDetails {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/investor/reports"
            render={(props) =>
              investorAuth ? <Reports {...props} /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/portfolio/your-risk"
            render={(props) =>
              auth && profilecomplete ? (
                <KnowYourRisk {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {/* <Route
            exact
            path="/portfolio/overview"
            render={(props) =>
              auth && profilecomplete ? (
                <PortfolioOverview {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/portfolio/holdings"
            render={(props) =>
              auth && profilecomplete ? (
                <PortfolioHoldings {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/portfolio/positions"
            render={(props) =>
              auth && profilecomplete ? (
                <PortfolioPositions {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          /> */}
          <Route
            exact
            path="/equityderivatives"
            render={(props) =>
              auth && profilecomplete ? (
                <EquityDerivatives {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {/* <Route
            exact
            path="/investor/equityderivatives"
            render={(props) =>
              investorAuth ? (
                <EquityDerivatives {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          /> */}
          <Route
            exact
            path="/fiidii"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <Fiidii {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/Fiidii" />
              )
            }
          />
          {/* <Route
            exact
            path="/investor/fiidii"
            render={(props) =>
              investorAuth ? <Fiidii {...props} /> : <Redirect to="/login" />
            }
          /> */}
          <Route
            exact
            path="/admin/events"
            render={(props) => (
              <AdminAccess>
                <AdminEvents {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/manage-email"
            render={(props) => (
              <AdminAccess>
                <AdminEmail {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/assign-sessions"
            render={(props) => (
              <AdminAccess>
                <AssignSessions {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/events/:id"
            render={(props) => (
              <AdminAccess>
                <AdminEventPage {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/users"
            render={(props) => (
              <AdminAccess>
                <AdminUsersData {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/interns/:eventId"
            render={(props) => (
              <AdminAccess>
                <AdminInternSelection {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/reports/users"
            render={(props) => (
              <AdminAccess>
                <NewUsersData {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/researchpapers"
            render={(props) => (
              <AdminAccess>
                <AdminResearchPapers {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/incomestatement"
            render={(props) => (
              <AdminAccess>
                <AdminIncomeStatement {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/incomestatement/:id"
            render={(props) => (
              <AdminAccess>
                <AdminIncomeStatementDetails {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/reports/event-subscriber"
            render={(props) => (
              <AdminAccess>
                <AdminEventSubscriberReport {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/admin/returns"
            render={(props) => (
              <AdminAccess>
                <AdminReturns {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/create/incomestatement/event"
            render={(props) => (
              <AdminAccess>
                <CreateIncomeStatementEvent {...props} />
              </AdminAccess>
            )}
          />
          <Route
            exact
            path="/view/incomestatement/event"
            render={(props) =>
              auth ? (
                <UserAccess>
                  <ViewAllStatements {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/view/incomestatement/event/:id/:stock"
            render={(props) =>
              auth ? (
                <UserAccess>
                  <IncomeStatement {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/fundamental/:stock"
            render={() =>
              auth ? <FundamentalData /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/technical/hourly/:stock"
            render={() => (auth ? <TechnicalData /> : <Redirect to="/login" />)}
          />
          <Route
            path="/admin/researchpapers/viewresearch/:id"
            render={(props) =>
              admin ? <ResearchPage {...props} /> : <Redirect to="/404" />
            }
          />
          <Route
            path="/admin/bond-qna"
            render={(props) =>
              admin ? <BondQnA {...props} /> : <Redirect to="/404" />
            }
          />
          <Route
            path="/admin/payment-details"
            render={(props) =>
              admin ? <PaymentDetails {...props} /> : <Redirect to="/404" />
            }
          />
          <Route
            exact
            path="/eventdetails/:id"
            render={(props) =>
              auth && profilecomplete ? (
                <Event {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/addEvent/:id"
            render={(props) =>
              auth && profilecomplete ? (
                <UserAccess>
                  <TokenPurchase {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/economicactivity"
            render={() =>
              auth && profilecomplete ? (
                <UserAccess>
                  <EconomicActivity />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/economicactivity"
            render={() =>
              investorAuth ? <EconomicActivity /> : <Redirect to="/login" />
            }
          />

          <Route
            exact
            path="/creator/create-session"
            render={(props) =>
              auth && creator ? (
                <UserAccess>
                  <CreateSession {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/creator/view-session"
            render={(props) =>
              auth && creator ? (
                <UserAccess>
                  <ViewSession {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/creator/edit-session/:id"
            render={(props) =>
              auth && creator ? (
                <UserAccess>
                  <CreateSession {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/sessions/register"
            render={(props) =>
              auth ? (
                <UserAccess>
                  <SessionRegister {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/sessions/:context/details/:id"
            render={(props) =>
              auth ? (
                <UserAccess>
                  <SessionDetails {...props} />
                </UserAccess>
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          {/* investor events */}
          <Route
            exact
            path="/investor/events"
            render={() =>
              investorAuth ? <InvestorViewEvents /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/investor/events/:id"
            render={() => <InvestorViewEventDetails />}
          />
          <Route
            exact
            path="/investor/events/:id/fundamental/:stock"
            render={() =>
              investorAuth ? <FundamentalData /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/investor/events/:id/technical/hourly/:stock"
            render={() =>
              investorAuth ? <TechnicalData /> : <Redirect to="/login" />
            }
          />

          {/* Investor Income Statement Events */}
          <Route
            exact
            path="/investor/view/incomestatement/event"
            render={() =>
              investorAuth ? (
                <ViewAllInvestorStatements />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/investor/view/incomestatement/event/:id/:stock"
            render={(props) =>
              investorAuth ? (
                <InvestorIncomeStatement {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/courses/nismcourse"
            render={(props) => <NismCourse {...props} />}
          />

          <Route path="*" render={(props) => <Redirect to="/404" />} />
        </Switch>
      </Suspense>
    </CContainer>
  );
}
