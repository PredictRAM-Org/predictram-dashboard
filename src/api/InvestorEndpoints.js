const INVESTOR_URL = "/api/investors";

//Riskscore
export const INVESTOR_RISKSCORE_CREATE = `${INVESTOR_URL}/riskscore/create`;
export const INVESTOR_RISKSCORE_GET = `${INVESTOR_URL}/riskscore/get`;
export const INVESTOR_RISKSCORE_QUESTIONS_GET = `${INVESTOR_URL}/riskscorequestions/get`;

// ETF
export const INVESTOR_ETF_GET = `${INVESTOR_URL}/getETF`;

//Users
export const USER_LIST = `${INVESTOR_URL}/getUsers`;

// investors
export const INVESTOR_CREATE = `${INVESTOR_URL}/create`;
export const INVESTOR_UPDATE = `${INVESTOR_URL}/update`;
export const INVESTOR_GET = `${INVESTOR_URL}/get`;
export const INVESTOR_COMPLETE_PROFILE = `${INVESTOR_URL}/complete-profile`;
export const INVESTOR_VERIFY_REFER_CODE = `${INVESTOR_URL}/check-refercode`;
export const INVESTOR_REFER_COUNT = `${INVESTOR_URL}/get-refer-count`;

//Sessions
export const ADVISORY_SESSIONS = `${INVESTOR_URL}/getAdvisorySessions`;

//Price
export const INVESTOR_GET_STOCK_PRICE = `${INVESTOR_URL}/getprice`;

// research papers
export const INVESTOR_RESEARCH_PAPER_GET = `${INVESTOR_URL}/getresearchpaper`;
export const INVESTOR_RESEARCH_PAPER_FEATURED_GET = `${INVESTOR_URL}/researchpaper/featured/get`;
export const INVESTOR_RESEARCH_PAPER_PERSONALIZE_GET = `${INVESTOR_URL}/researchpaper/personalize/get`;
export const INVESTOR_RESEARCH_PAPER_RECOMMENDED_GET = `${INVESTOR_URL}/researchpaper/recommended/get`;

// Reports
export const INVESTOR_EQUITY_DERIVATIVES = `${INVESTOR_URL}/equityderivatives`;
export const INVESTOR_EQUITY_BLOCK = `${INVESTOR_URL}/equityblock`;
export const INVESTOR_EQUITY_BULK = `${INVESTOR_URL}/equitybulk`;
export const INVESTOR_MUTUAL_FUND_REPORTS = `${INVESTOR_URL}/mutualfundreports`;

// Economic Activity
export const INVESTOR_GET_CPI = `${INVESTOR_URL}/getcpi`;
export const INVESTOR_GET_GVA = `${INVESTOR_URL}/getgva`;
export const INVESTOR_GET_IOIP1 = `${INVESTOR_URL}/getioip1`;
export const INVESTOR_GET_IOIP2 = `${INVESTOR_URL}/getioip2`;

//View Income Event
export const INVESTOR_INCOME_STATEMENT_EVENT_GET = `${INVESTOR_URL}/get/incomestatement/event`;

//fiidii
export const INVESTOR_GET_FIIDII = `${INVESTOR_URL}/fiidii`;

//optionanalyze
export const INVESTOR_GET_OPTIONANALYZE = `${INVESTOR_URL}/optionanalyze`;

//portfolio
export const INVESTOR_PORTFOLIO_STOCK_GET = `${INVESTOR_URL}/getportfoliostock`;
export const INVESTOR_PORTFOLIO_STOCK_SAVE = `${INVESTOR_URL}/saveportfoliostock`;
export const INVESTOR_BULK_PORTFOLIO_STOCK_SAVE = `${INVESTOR_URL}/saveBulkPortfolio`;
export const INVESTOR_PORTFOLIO_STOCK_UPDATE = `${INVESTOR_URL}/updateportfoliostock`;
export const INVESTOR_PORTFOLIO_STOCK_DELETE = `${INVESTOR_URL}/deleteportfoliostock`;

// payments
export const INVESTOR_PAYMENT_CONFIRM = `${INVESTOR_URL}/paymentConfirm`;
export const INVESTOR_PAYMENT_GATEWAY = `${INVESTOR_URL}/paymentGateway`;
export const INVESTOR_PAYMENT_GATEWAY_WITH_TOKEN = `${INVESTOR_URL}/paymentConfirmByToken`;
export const INVESTOR_GIVE_FREE_MEMBERSHIP = `${INVESTOR_URL}/freeMembership/give`;
export const INVESTOR_CANCEL_FREE_MEMBERSHIP = `${INVESTOR_URL}/freeMembership/cancel`;

// Recommendation
export const INVESTOR_RECOMMENDATION_STOCK = `${INVESTOR_URL}/recommendation/stock`;
export const INVESTOR_RECOMMENDATION_SECTOR = `${INVESTOR_URL}/recommendation/sector`;

// event
export const INVESTOR_EVENT_CREATE = `${INVESTOR_URL}/events/create`;
export const INVESTOR_EVENT_GET = `${INVESTOR_URL}/events/get`;
export const INVESTOR_EVENT_ANALYSIS_GET = `${INVESTOR_URL}/events/analysis`;
export const INVESTOR_EVENT_SUMMARY_GET = `${INVESTOR_URL}/events/analysis/summary`;
export const INVESTOR_CONNECT_ADVISOR = `${INVESTOR_URL}/events/connect`;
export const INVESTOR_STOCK_IMPACT = `${INVESTOR_URL}/events/stock-impact`;

//Investor Stocks
export const INVESTOR_STOCK_BY_CATEGORY_GET = `${INVESTOR_URL}/events/getstockbycategory`;

// scrapper
export const INVESTOR_LIVE_PRICE_GET = `${INVESTOR_URL}/live/price`;
export const INVESTOR_FUNDAMENTAL_DATA_GET = `${INVESTOR_URL}/fundamentaldata`;
export const INVESTOR_TECHNICAL_HOURLY_DATA_GET = `${INVESTOR_URL}/technicaldata/horly`;

//income statement summary
export const INVESTOR_INCOME_STATEMENT_SUMMARY_GET = `${INVESTOR_URL}/get/incomestatement/summary`;

//portfolio event
export const INVESTOR_PORTFOLIO_EVENT_CREATE = `${INVESTOR_URL}/portfolio/management/create`;
export const INVESTOR_PORTFOLIO_EVENT_GET = `${INVESTOR_URL}/portfolio/management`;

// event portfolio
export const INVESTOR_EVENT_PORTFOLIO = `${INVESTOR_URL}/event/portfolio`;

// mutualfund
export const INVESTOR_MUTUAL_FUND = `${INVESTOR_URL}/mutualfund`;

//Zoho Bookings
export const INVESTOR_SLOT_AVAILABILITY = `${INVESTOR_URL}/zoho/availableslots`;
export const INVESTOR_BOOKING_SERVICES = `${INVESTOR_URL}/zoho/services`;
export const INVESTOR_APPOINTMENT_BOOKING = `${INVESTOR_URL}/zoho/appointment/book`;
export const INVESTOR_APPOINTMENT_FETCH_STAFF = `${INVESTOR_URL}/zoho/staffs`;
export const INVESTOR_APPOINTMENT_FETCH = `${INVESTOR_URL}/zoho/appointment/get`;
export const INVESTOR_APPOINTMENT_RESCHEDULE = `${INVESTOR_URL}/zoho/appointment/reschedule`;
export const ZOHO_ADVISORY_SESSIONS = `${INVESTOR_URL}/getzohoAdvisorySessions`;

// portfolio management leaderboard
export const INVESTOR_PORTFOLIO_MANAGEMENT_LEADERBOARD = `${INVESTOR_URL}/portfolio-management/leaderboard`;

// Data
export const ETF_DATA = `${INVESTOR_URL}/data/etf`;
export const BOND_DATA = `${INVESTOR_URL}/data/bonds`;
export const CAREGORIZED_STOCKS_DATA = `${INVESTOR_URL}/data/categorized-stocks`;

// event stocks
export const INVESTOR_EVENT_STOCKS = `${INVESTOR_URL}/event-stocks`;
