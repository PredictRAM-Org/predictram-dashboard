const LOCAL_URL = "http://localhost:5000/api/users";
const BASE_URL = "/api/users";
const ADMIN_URL = "/api/admin";

// authentication
export const REGISTER_USER = `${BASE_URL}/register`;
export const EMAIL_VERIFICATION = `${BASE_URL}/sendEmailOtp`;

// users
export const PROFESSIONAL_USER = `${BASE_URL}/professionalUser`;
export const USER_GET_BY_MOBILE = `${BASE_URL}/getuserByPhone`;
export const USER_STOCKS = `${BASE_URL}/getportfoliostock`;
export const USER_PROFILE = `${BASE_URL}/getprofile`;
export const USER_LIST = `${ADMIN_URL}/getusers`;
export const USER_PROFILE_SAVE = `${BASE_URL}/saveprofile`;
export const USER_EXPERIENCE_SAVE = `${BASE_URL}/saveexperiance`;
export const USER_EXPERIENCE_DELETE = `${BASE_URL}/deleteexperiance`;
export const USER_EXPERIENCE_UPDATE = `${BASE_URL}/updateexperiance`;
export const USER_UPDATE = `${BASE_URL}/updateuser`;

// payments
export const PAYMENT_CONFIRM = `${BASE_URL}/paymentConfirm`;
export const PAYMENT_GATEWAY = `${BASE_URL}/paymentGateway`;
export const PAYMENT_GATEWAY_WITH_TOKEN = `${BASE_URL}/paymentConfirmByToken`;
export const GIVE_FREE_MEMBERSHIP = `${BASE_URL}/freeMembership/give`;
export const CANCEL_FREE_MEMBERSHIP = `${BASE_URL}/freeMembership/cancel`;
export const CREATE_PAYMENT_ORDER = `${BASE_URL}/create-payment-order`;
export const MODEL_CREDIT_PAYMENT_CONFIRMATION = `${BASE_URL}/model-payment-confirm`;

// tags
export const TAG_FOLLOW = `${BASE_URL}/followtag`;
export const TAG_UNFOLLOW = `${BASE_URL}/unfollowtag`;

// etfs
export const ETF_CREATE = `${BASE_URL}/createETF`;
export const ETF_GET = `${BASE_URL}/getETF`;

// research paper
export const RESEARCH_PAPER_GET = `${BASE_URL}/getresearchpaper`;
export const RESEARCH_PAPER_GET_ID = `${BASE_URL}/getresearchpaperid`;
export const PERSONAL_RESEARCH_PAPER_GET = `${BASE_URL}/yourresearchpaper`;
export const RESEARCH_PAPER_ADMIN_PUBLISH = `${ADMIN_URL}/publishpaper`;
export const RESEARCH_PAPER_ADMIN_FEATURE = `${ADMIN_URL}/researchpaper/featured/create`;
export const RESEARCH_PAPER_FEATURED_GET = `${BASE_URL}/researchpaper/featured/get`;
export const RESEARCH_PAPER_PERSONALIZE_GET = `${BASE_URL}/researchpaper/personalize/get`;
export const RESEARCH_PAPER_RECOMMENDED_GET = `${BASE_URL}/researchpaper/recommended/get`;
export const RESEARCH_PAPER_POINT_BY_LINKEDIN_SHARE_LINK = `${BASE_URL}/getpointbylinkedinsharelink`;

// intern selection
export const INTERN_APPROVAL = `${ADMIN_URL}/intern/approval`;
export const INTERN_REJECTION = `${ADMIN_URL}/intern/rejection`;

// events
export const EVENT_PRICE_GET = `${BASE_URL}/geteventprice`;
export const EVENT_TOTAL_PRICE_GET = `${BASE_URL}/getprice`;
export const EVENT_CURRENT_GET = `${BASE_URL}/getcurrentevents`;
export const EVENTS_GET = `${ADMIN_URL}/getevents`;
export const USER_EVENTS_GET = `${BASE_URL}/getevents`;
export const EVENT_UPDATE = `${ADMIN_URL}/updateevent`;
export const EVENT_USER_SUBMITTED_GET = `${BASE_URL}/viewsubmittedevents`;
export const EVENT_CHART_DATA_GET = `${BASE_URL}/getevent/chartdata`;

//report data
export const GET_REPORT_EVENT = `${ADMIN_URL}/report/event/subscribers`;
export const GET_REPORT_PORTFOLIO = `${ADMIN_URL}/report/event/portfolio`;

//company data
export const COMPANY_BY_EVENT = `${BASE_URL}/getcomapnybyevent`;
export const COMPANYADD_BY_EVENT = `${ADMIN_URL}/addcomapnybyevent`;
export const COMPANYEDIT_BY_EVENT = `${ADMIN_URL}/editcomapnybyevent`;
export const COMPANYDELETE_BY_EVENT = `${ADMIN_URL}/deletecomapnybyevent`;
export const GET_COMPANY_DATA = `${BASE_URL}/getcompanydata`;

// portfolio score
export const PORTFOLIO_SCORE_CREATE = `${BASE_URL}/portfolioScore/create`;

// leaderboard
export const LEADERBOARD_GET = `${BASE_URL}/leaderboard`;
export const LEADERBOARD_CUSTOM_GET = `${BASE_URL}/leaderboard/castom`;
export const LEADERBOARD_BY_DATE_GET = `${BASE_URL}/leaderboard/bydate`;

//Riskscore
export const RISKSCORE_CREATE = `${BASE_URL}/riskscore/create`;
export const RISKSCORE_GET = `${BASE_URL}/riskscore/get`;
export const RISKSCORE_QUESTIONS_GET = `${BASE_URL}/riskscorequestions/get`;

//Referral
export const REFERRALS_COUNT_GET = `${BASE_URL}/referrals/count/get`;

// Score assigning
export const ASSIGN_SESSION = `${ADMIN_URL}/sessions/assign`;

//Fyers
export const FYERS_LOGIN = `${BASE_URL}/fyers/login`;
export const FYERS_PROFILE_GET = `${BASE_URL}/fyers/getProfile`;
export const FYERS_HOLDINGS_GET = `${BASE_URL}/fyers/getHoldings`;
export const FYERS_POSITION_GET = `${BASE_URL}/fyers/getPosition`;
export const FYERS_PLACE_MLUTIPLE_ORDERED = `${BASE_URL}/fyers/placeMultiOrder`;
export const FYERS_FUNDS_GET = `${BASE_URL}/fyers/getFunds`;
export const FYERS_QUOTES = `${BASE_URL}/fyers/quotes`;

//paytmMoney
export const PAYTM_MONEY_LOGIN = `${BASE_URL}/paytmMoney/login`;
export const PAYTM_MONEY_PROFILE_GET = `${BASE_URL}/paytmMoney/getProfile`;
export const PAYTM_MONEY_HOLDINGS_GET = `${BASE_URL}/paytmMoney/getHoldings`;
export const PAYTM_MONEY_LIVE_PRICE = `${BASE_URL}/paytmMoney/livePrice`;

//email group
export const EMAIL_GROUP_CREATE = `${ADMIN_URL}/email-group/create`;
export const EMAIL_GROUP_GET = `${ADMIN_URL}/email-group/get`;
export const EMAIL_GROUP_DELETE = `${ADMIN_URL}/email-group/delete`;
export const EMAIL_GROUP_SEND_INDIVIDUAL_EMAIL = `${ADMIN_URL}/email-group/sendIndividualEmail`;
export const EMAIL_GROUP_SEND_GROUP_EMAIL = `${ADMIN_URL}/email-group/sendGroupEmail`;

// Reports
export const EQUITY_DERIVATIVES = `${BASE_URL}/equityderivatives`;
export const EQUITY_BLOCK = `${BASE_URL}/equityblock`;
export const EQUITY_BULK = `${BASE_URL}/equitybulk`;
export const MUTUAL_FUND_REPORTS = `${BASE_URL}/mutualfundreports`;

//Economic Activity
export const GET_CPI = `${BASE_URL}/getcpi`;
export const GET_GVA = `${BASE_URL}/getgva`;
export const GET_IOIP1 = `${BASE_URL}/getioip1`;
export const GET_IOIP2 = `${BASE_URL}/getioip2`;

//fiidii
export const GET_FIIDII = `${BASE_URL}/fiidii`;

//optionanalyze
export const GET_OPTIONANALYZE = `${BASE_URL}/optionanalyze`;

//portfolio
export const PORTFOLIO_STOCK_GET = `${BASE_URL}/getportfoliostock`;
export const PORTFOLIO_STOCK_SAVE = `${BASE_URL}/saveportfoliostock`;
export const PORTFOLIO_STOCK_UPDATE = `${BASE_URL}/updateportfoliostock`;
export const PORTFOLIO_STOCK_DELETE = `${BASE_URL}/deleteportfoliostock`;

// creator access
export const CREATOR_ACCESS = `${ADMIN_URL}/access/creator`;

//sessions
export const SESSION_NOTIFY = `${BASE_URL}/sessions/notify-users`;
export const SESSION_CREATE = `${BASE_URL}/sessions/create`;
export const SESSION_GET = `${BASE_URL}/sessions/get`;
export const SESSION_GET_UNASSIGNED = `${BASE_URL}/sessions/get/unassigned`;
export const SESSION_UPDATE = `${BASE_URL}/sessions/update`;
export const SESSION_DELETE = `${BASE_URL}/sessions/delete`;
export const SESSION_REGISTER = `${BASE_URL}/sessions/create/register`;
export const SESSION_AVAILABLE = `${BASE_URL}/sessions/get/available`;
export const SESSION_GET_USER_REGISTERED = `${BASE_URL}/sessions/registered`;

export const PORTFOLIO_EVENT_CREATE = `${ADMIN_URL}/portfolio/management/create`;
export const PORTFOLIO_EVENT_SUBMIT = `${BASE_URL}/portfolio/management/submit`;
export const PORTFOLIO_EVENT_GET = `${BASE_URL}/portfolio/management`;
export const PORTFOLIO_EVENT_USER_PORTFOLIO_GET = `${BASE_URL}/portfolio/management/user-portfolio`;
export const PORTFOLIO_EVENT_REPORT_CREATE = `${BASE_URL}/portfolio/management/report/create`;
export const PORTFOLIO_EVENT_REPORT_GET = `${BASE_URL}/portfolio/management/report/get`;
export const PORTFOLIO_EVENT_REPORT_DELETE = `${BASE_URL}/portfolio/management/report/delete`;

//sector ratio
export const SECTOR_ALL = `${BASE_URL}/sector/all`;
export const SECTOR_RATIO = `${BASE_URL}/sector/ratio/get`;

//income statement event
export const CREATE_INCOME_STATEMENT_EVENT = `${ADMIN_URL}/create/incomestatement/event`;
export const SUBSCRIBE_INCOME_STATEMENT = `${BASE_URL}/subscribe/incomestatement/event`;
export const INCOME_STATEMENT_EVENT_GET = `${BASE_URL}/get/incomestatement/event`;
export const INCOME_STATEMENT_SUMMARY_GET = `${BASE_URL}/get/incomestatement/summary`;
export const INCOME_STATEMENT_HISTORY_GET = `${BASE_URL}/get/incomestatementhistory`;

// scrapper
export const LIVE_PRICE_GET = `${BASE_URL}/live/price`;
export const FUNDAMENTAL_DATA_GET = `${BASE_URL}/fundamentaldata`;
export const TECHNICAL_HOURLY_DATA_GET = `${BASE_URL}/technicaldata/horly`;
export const ETF_DATA_GET = `${BASE_URL}/etfdata`;

// Economic event
export const ECONOMIC_EVENT_STOCK_DATA_GET = `${BASE_URL}/economic-event-stock`;
export const ECONOMIC_EVENT_RATE_DATA_GET = `${BASE_URL}/economic-event-upcoming-rate`;

//Ratioanalyze
export const RATIO_ANALYZER = `${BASE_URL}/ratio-analyser`;

// portfolio management leaderboard
export const PORTFOLIO_MANAGEMENT_LEADERBOARD = `${BASE_URL}/portfolio-management/leaderboard`;

// event stocks
export const ADMIN_EVENT_STOCKS = `${ADMIN_URL}/event-stocks`;
export const EVENT_STOCKS = `${BASE_URL}/event-stocks`;

// bond qna
export const BOND_QNA_URL = `${ADMIN_URL}/bond-qna`;

// investor payment details
export const PAYMENT_DETAILS = `${ADMIN_URL}/payment-details`;
