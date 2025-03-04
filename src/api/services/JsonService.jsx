export const findJSONByList = (json = [], searchKey = "", queryList = []) => {
  console.log(queryList);
  const filterJson = json?.filter((d) => queryList.includes(d[searchKey]));
  return filterJson;
};

export const findJSON = (json = [], searchKey = "", query = "") => {
  const filterJson = json?.filter((d) =>
    d[searchKey].toLowerCase().includes(query.toLowerCase())
  );
  return filterJson;
};

export const filterJsonByStrategy = (json = [], strategy = "") => {
  const strategies = {
    "Crisis Shield: War in the Middle East Intensifies": {
      filter: (stocks) =>
        stocks.filter(
          (row) =>
            [
              "Household & Personal Products",
              "Packaged Foods",
              "Aerospace & Defense",
              "Utilities - Regulated Electric",
              "Luxury Goods",
              "Utilities - Independent Power Producers",
              "Drug Manufacturers - General",
              "Medical Care Facilities",
            ].includes(row["Stock Industry"]) &&
            (row["Debt_to_Equity_Ratio"] < 1 ||
              row["Return_on_Investment"] > 10 ||
              row["Profit_Margins"] > 10)
        ),
      description:
        "Invest in sectors like defense, energy, and FMCG that benefit from geopolitical instability.",
      benefit:
        "Resilient Performance: Likely to perform well during geopolitical instability",
      disadvantage:
        "Sector Concentration Risk: Overexposure to specific industries.",
    },
    "Debt Crisis Defender: USA Debt Crisis": {
      filter: (stocks) =>
        stocks.filter(
          (row) =>
            [
              "Consumer Electronics",
              "Building Products & Equipment",
              "Drug Manufacturers - Specialty & Generic",
              "Medical Care Facilities",
            ].includes(row["Stock Industry"]) &&
            (row["Debt_to_Equity_Ratio"] < 0.5 ||
              row["Dividend_Yield"] > 3 ||
              row["Free_Cash_Flow"] > 0)
        ),
      description:
        "Focus on stable sectors like consumer staples, healthcare, and utilities during economic downturns.",
      benefit:
        "Stable Returns: Provides steady income and stability during financial crises.",
      disadvantage:
        "Limited Growth Potential: May result in lower growth compared to more aggressive strategies.",
    },
    // 1. Volatility Voyagers
    "Volatility Voyagers": {
      filter: (stocks) =>
        stocks.filter((row) => row["Annualized Volatility (%)"] < 20),
      description: "Focus on stocks with low volatility to minimize risk.",
      benefit: "Reduced risk and smoother investment journey.",
      disadvantage: "May miss out on high-reward opportunities.",
    },
    // 2. Beta Boosters
    "Beta Boosters": {
      filter: (stocks) => stocks.filter((row) => row["Beta"] > 1),
      description:
        "Invest in stocks with high beta for higher potential returns.",
      benefit: "Potential for high returns in a bullish market.",
      disadvantage: "Increased risk during market downturns.",
    },
    // 3. CAGR Chasers
    "CAGR Chasers": {
      filter: (stocks) => stocks.filter((row) => row["CAGR"] * 100 > 15),
      description:
        "Target stocks with a high Compound Annual Growth Rate (CAGR).",
      benefit: "Strong historical growth performance.",
      disadvantage: "Past performance does not guarantee future results.",
    },
    // 4. Debt Ditchers
    "Debt Ditchers": {
      filter: (stocks) =>
        stocks.filter((row) => row["Debt_to_Equity_Ratio"] < 0.5),
      description: "Invest in companies with a low debt-to-equity ratio.",
      benefit: "Financial stability and lower bankruptcy risk.",
      disadvantage: "May overlook companies with strategic debt use.",
    },
    // 5. Price Prospects
    "Price Prospects": {
      filter: (stocks) =>
        stocks.filter(
          (row) => row["Percentage_Difference"] > 10
        ),
      description:
        "Focus on stocks with a significant percentage difference from their recent price.",
      benefit: "Potential for quick gains if price corrects.",
      disadvantage: "High volatility and risk of loss.",
    },
    // 6. Valuation Vultures
    "Valuation Vultures": {
      filter: (stocks) =>
        stocks.filter((row) => row["P/E_Ratio"] < 15 && row["P/B_Ratio"] < 1.5),
      description: "Seek out stocks with low P/E and P/B ratios.",
      benefit: "Potential to find undervalued stocks.",
      disadvantage: "Low ratios might indicate underlying problems.",
    },
    // 7. EPS Enthusiasts
    "EPS Enthusiasts": {
      filter: (stocks) => stocks.filter((row) => row["EPS"] > 2),
      description: "Invest in stocks with high Earnings Per Share (EPS).",
      benefit: "Indicator of profitability.",
      disadvantage: "EPS can be manipulated through accounting practices.",
    },
    // 8. Dividend Dynamos
    "Dividend Dynamos": {
      filter: (stocks) => stocks.filter((row) => row["Dividend_Yield"] > 0.03),
      description: "Target stocks with high dividend yield.",
      benefit: "Regular income through dividends.",
      disadvantage: "High yield can sometimes indicate financial trouble.",
    },
    // 9. Market Cap Masters
    "Market Cap Masters": {
      filter: (stocks) => stocks.filter((row) => row["Market_Cap"] > 10e9),
      description: "Focus on large-cap stocks for stability.",
      benefit: "Typically more stable and established companies.",
      disadvantage: "Limited growth potential compared to small caps.",
    },
    // 10. RSI Riders
    "RSI Riders": {
      filter: (stocks) =>
        stocks.filter((row) => row["RSI"] < 30 || row["RSI"] > 70),
      description:
        "Utilize the Relative Strength Index (RSI) to time market entries and exits.",
      benefit: "Helps in identifying overbought or oversold conditions.",
      disadvantage: "RSI can give false signals during strong trends.",
    },
    // 11. MACD Mavericks
    "MACD Mavericks": {
      filter: (stocks) => stocks.filter((row) => row["MACD"] > 0),
      description:
        "Use the Moving Average Convergence Divergence (MACD) for trend following.",
      benefit: "Effective in identifying trend changes.",
      disadvantage: "Can lag behind the actual price movement.",
    },
    // 12. Bollinger Band Boundaries
    "Bollinger Band Boundaries": {
      filter: (stocks) =>
        stocks.filter(
          (row) =>
            row["Price"] > row["Upper Bollinger Band"] ||
            row["Price"] < row["Lower Bollinger Band"]
        ),
      description:
        "Use Bollinger Bands to gauge volatility and potential price reversals.",
      benefit: "Identifies overbought and oversold conditions.",
      disadvantage: "Not always accurate in strong trends.",
    },
    // 13. Correlation Calculators
    "Correlation Calculators": {
      filter: (stocks) =>
        stocks.filter((row) => row["Correlation_with_event"] > 0.7),
      description: "Invest based on stock correlation with specific events.",
      benefit: "Can predict stock movement based on historical events.",
      disadvantage: "Correlation does not imply causation.",
    },
    // 14. Category Kings
    "Category Kings": {
      filter: (stocks) => stocks.filter((row) => row["Category"] === 1),
      description: "Focus on top stocks within specific categories.",
      benefit: "Leverage sector-specific strengths.",
      disadvantage: "Lack of diversification across sectors.",
    },
    // 15. Total Score Titans
    "Total Score Titans": {
      filter: (stocks) => stocks.filter((row) => row["Total_Score"] > 80),
      description: "Invest in stocks with high total scores.",
      benefit: "Aggregated score simplifies decision-making.",
      disadvantage: "May overlook individual metric importance.",
    },
    // 16. Industry Insiders
    "Industry Insiders": {
      filter: (stocks) =>
        stocks.filter((row) => row["Industry Performance Rank"] <= 5),
      description: "Focus on top-performing industries.",
      benefit: "Capitalize on industry growth trends.",
      disadvantage: "Industry performance can be cyclical.",
    },
    // 17. Payout Pros
    "Payout Pros": {
      filter: (stocks) =>
        stocks.filter((row) => row["Dividend Payout Ratio"] < 50),
      description: "Look for companies with a low dividend payout ratio.",
      benefit: "Indicates potential for future dividend increases.",
      disadvantage: "Low payout might suggest reinvestment in risky ventures.",
    },
    // 18. Yield Yodas
    "Yield Yodas": {
      filter: (stocks) =>
        stocks.filter((row) => row["Five Year Avg Dividend Yield"] > 4),
      description:
        "Invest in stocks with a high five-year average dividend yield.",
      benefit: "Historical consistency in dividend payments.",
      disadvantage: "Past yields may not continue in the future.",
    },
    // 19. Sales Savvy
    "Sales Savvy": {
      filter: (stocks) =>
        stocks.filter((row) => row["Price to Sales Trailing 12 Months"] < 1.5),
      description: "Focus on stocks with low price-to-sales ratios.",
      benefit: "Potential undervaluation relative to revenue.",
      disadvantage: "Low ratio might indicate poor profitability.",
    },
    // 20. Dividend Darlings
    "Dividend Darlings": {
      filter: (stocks) =>
        stocks.filter((row) => row["Trailing Annual Dividend Rate"] > 4),
      description: "Target high trailing annual dividend rates.",
      benefit: "Reliable source of income.",
      disadvantage: "High dividends can limit company growth potential.",
    },
    // 21. Profit Pioneers
    "Profit Pioneers": {
      filter: (stocks) => stocks.filter((row) => row["Profit Margins"] > 15),
      description: "Invest in companies with high profit margins.",
      benefit: "Indicates efficient operations and profitability.",
      disadvantage: "High margins can attract competition.",
    },
    // 22. Insider Interests
    "Insider Interests": {
      filter: (stocks) =>
        stocks.filter((row) => row["% Held by Insiders"] > 10),
      description: "Focus on stocks with high insider holdings.",
      benefit: "Insiders' confidence in their own company.",
      disadvantage: "High insider holdings can limit stock liquidity.",
    },
    // 23. Institutional Investors
    "Institutional Investors": {
      filter: (stocks) =>
        stocks.filter((row) => row["% Held by Institutions"] > 50),
      description: "Invest in stocks with high institutional ownership.",
      benefit: "Professional investors' confidence.",
      disadvantage: "Can lead to large stock movements if institutions sell.",
    },
    // 24. Volume Victors
    "Volume Victors": {
      filter: (stocks) => stocks.filter((row) => row["Volume"] > 1e6),
      description: "Focus on stocks with high trading volume.",
      benefit: "High liquidity and easier to enter/exit positions.",
      disadvantage: "High volume can indicate volatility.",
    },
    // 25. Value Validators
    "Value Validators": {
      filter: (stocks) => stocks.filter((row) => row["Total Value"] > 5e9),
      description: "Look at stocks with high total value.",
      benefit: "Large value can indicate stability and market trust.",
      disadvantage: "May miss high-growth small-cap opportunities.",
    },
    // 26. Alpha Achievers
    "Alpha Achievers": {
      filter: (stocks) =>
        stocks.filter((row) => row["Annualized Alpha (%)"] > 5),
      description: "Target stocks with high annualized alpha.",
      benefit: "Outperformance relative to market benchmarks.",
      disadvantage: "High alpha can come with higher risk.",
    },
    // 27. Volatility Vanguards
    "Volatility Vanguards": {
      filter: (stocks) =>
        stocks.filter((row) => row["Annualized Volatility (%)"] < 15),
      description: "Invest in stocks with low annualized volatility.",
      benefit: "More predictable returns.",
      disadvantage: "May miss out on higher returns from more volatile stocks.",
    },
    // 28. Sharpe Strategists
    "Sharpe Strategists": {
      filter: (stocks) =>
        stocks.filter((row) => row["Sharpe Ratio"] > 2),
      description: "Focus on stocks with a high Sharpe ratio.",
      benefit: "Better risk-adjusted returns.",
      disadvantage: "Can be affected by changes in risk-free rate.",
    },
    // 29. Treynor Tacticians
    "Treynor Tacticians": {
      filter: (stocks) => stocks.filter((row) => row["Treynor Ratio"] > 0.5),
      description: "Invest in stocks with a high Treynor ratio.",
      benefit: "Indicates returns per unit of systematic risk.",
      disadvantage: "Only considers market risk, not total risk.",
    },
    // 30. Sortino Savants
    "Sortino Savants": {
      filter: (stocks) => stocks.filter((row) => row["Sortino Ratio"] > 1),
      description: "Focus on stocks with a high Sortino ratio.",
      benefit: "Better measures downside risk.",
      disadvantage: "May overlook upside volatility.",
    },
    // 31. Drawdown Defenders
    "Drawdown Defenders": {
      filter: (stocks) => stocks.filter((row) => row["Maximum Drawdown"] < 0.2),
      description: "Invest in stocks with low maximum drawdown.",
      benefit: "Limits potential losses.",
      disadvantage: "May indicate overly conservative investments.",
    },
    // 32. R-Squared Researchers
    "R-Squared Researchers": {
      filter: (stocks) => stocks.filter((row) => row["R-Squared"] > 0.8),
      description: "Target stocks with high R-squared values.",
      benefit: "Strong correlation with benchmark index.",
      disadvantage: "High correlation means less diversification.",
    },
    // 33. Downside Deviators
    "Downside Deviators": {
      filter: (stocks) =>
        stocks.filter((row) => row["Downside Deviation"] < 0.15),
      description: "Invest in stocks with low downside deviation.",
      benefit: "Lower risk of significant losses.",
      disadvantage: "May miss out on high-return opportunities.",
    },
    // 34. Error Eliminators
    "Error Eliminators": {
      filter: (stocks) =>
        stocks.filter((row) => row["Annualized Tracking Error (%)"] < 50),
      description: "Focus on stocks with low annualized tracking error.",
      benefit: "Better tracking of benchmark index.",
      disadvantage: "Limited potential for outperformance.",
    },
    // 35. VaR Visionaries
    "VaR Visionaries": {
      filter: (stocks) => stocks.filter((row) => row["VaR (95%)"] < 5),
      description: "Target stocks with low Value at Risk (VaR).",
      benefit: "Quantifies potential maximum loss.",
      disadvantage: "Based on historical data, may not predict future risk.",
    },
    // 36. Moving Average Masters
    "Moving Average Masters": {
      filter: (stocks) =>
        stocks.filter(
          (row) => row["50-Day Moving Average"] > row["200-Day Moving Average"]
        ),
      description: "Use 50-day and 200-day moving averages for trend analysis.",
      benefit: "Helps identify long-term trends.",
      disadvantage: "Lagging indicator, can miss early trend changes.",
    },
    // 37. Margin Managers
    "Margin Managers": {
      filter: (stocks) =>
        stocks.filter((row) => row["New Haircut Margin"] < 10),
      description: "Focus on stocks with favorable haircut margins.",
      benefit: "Better leverage opportunities.",
      disadvantage: "Higher risk if the stock value drops.",
    },
    // 38. Rating Radars
    "Rating Radars": {
      filter: (stocks) => stocks.filter((row) => row["Rating"] > 4),
      description: "Invest in stocks with high ratings.",
      benefit: "Aggregated expert opinions.",
      disadvantage: "Ratings can be subjective and vary.",
    },
    // 39. Combined Score Champions
    "Combined Score Champions": {
      filter: (stocks) => stocks.filter((row) => row["Combined Score"] > 80),
      description: "Target stocks with high combined scores.",
      benefit: "Simplifies decision-making with aggregated scores.",
      disadvantage: "May not capture all individual metric nuances.",
    },
    // 40. Collateral Calculators
    "Collateral Calculators": {
      filter: (stocks) =>
        stocks.filter((row) => row["New Collateral Value Percentage"] > 70),
      description: "Focus on stocks with high collateral value percentages.",
      benefit: "Higher loan-to-value ratios.",
      disadvantage: "Can be risky if the stock's value declines.",
    },
    // 41. NSEI Navigators
    "NSEI Navigators": {
      filter: (stocks) =>
        stocks.filter(
          (row) => row["Correlation with ^NSEI"] > 0.70
        ),
      description: "Invest based on high correlation with NSEI index.",
      benefit: "Tracks overall market movements.",
      disadvantage: "High correlation limits diversification benefits.",
    },
    // 42. Alpha Interpreters
    "Alpha Interpreters": {
      filter: (stocks) =>
        stocks.filter((row) => row["Annualized Alpha (%)"] > 5),
      description:
        "Focus on stocks with strong annualized alpha interpretations.",
      benefit: "Provides insights into risk-adjusted performance.",
      disadvantage: "High alpha can come with higher risk.",
    },
    // 58. Alpha Analysis
    "Alpha Analysis": {
      filter: (stocks) =>
        stocks.filter((row) => row["Annualized Volatility (%)"] > 5),
      description: "Evaluate stocks based on their alpha against the market.",
      benefit: "Indicates excess return relative to market risk.",
      disadvantage: "High alpha stocks can be volatile.",
    },
    // 59. Volatility Value
    "Volatility Value": {
      filter: (stocks) =>
        stocks.filter((row) => row["Annualized Volatility (%)"] < 15),
      description:
        "Seek stocks with low volatility to minimize portfolio risk.",
      benefit: "Smoother investment journey with fewer fluctuations.",
      disadvantage: "Low volatility can limit potential returns.",
    },
    // 60. Sharpe Sailing
    "Sharpe Sailing": {
      filter: (stocks) => stocks.filter((row) => row["Sharpe Ratio"] > 1),
      description:
        "Target stocks with a high Sharpe ratio for better risk-adjusted returns.",
      benefit: "Improved return per unit of risk taken.",
      disadvantage: "Relies heavily on historical volatility and returns.",
    },
    // 61. Treynor Trends
    "Treynor Trends": {
      filter: (stocks) => stocks.filter((row) => row["Treynor Ratio"] > 0.5),
      description:
        "Focus on stocks with a high Treynor ratio to gauge market risk.",
      benefit: "Measures market risk-adjusted returns.",
      disadvantage: "Ignores non-market related risks.",
    },
    // 62. Sortino Selection
    "Sortino Selection": {
      filter: (stocks) => stocks.filter((row) => row["Sortino Ratio"] > 1),
      description:
        "Select stocks with a high Sortino ratio to manage downside risk.",
      benefit: "Focuses on reducing downside volatility.",
      disadvantage: "May overlook overall volatility.",
    },
    // 63. Drawdown Defense
    "Drawdown Defense": {
      filter: (stocks) =>
        stocks.filter((row) => row["Maximum Drawdown"] < 0.20),
      description:
        "Invest in stocks with low maximum drawdown to limit potential losses.",
      benefit: "Protects capital during market downturns.",
      disadvantage: "May miss out on high-growth opportunities.",
    },
    // 64. R-Squared Recognition
    "R-Squared Recognition": {
      filter: (stocks) => stocks.filter((row) => row["R-Squared"] > 0.8),
      description:
        "Identify stocks with high R-squared values for strong market correlation.",
      benefit: "Indicates how closely the stock tracks its benchmark.",
      disadvantage: "High correlation can limit diversification benefits.",
    },
    // 65. Downside Discipline
    "Downside Discipline": {
      filter: (stocks) =>
        stocks.filter((row) => row["Downside Deviation"] < 0.15),
      description: "Target stocks with low downside deviation to manage risk.",
      benefit: "Minimizes the impact of negative volatility.",
      disadvantage: "Can lead to missed opportunities during market upswings.",
    },
    // 66. Error Evaluation
    "Error Evaluation": {
      filter: (stocks) => stocks.filter((row) => row["Annualized Tracking Error (%)"] < 50),
      description:
        "Focus on stocks with low annualized tracking error for accurate benchmark tracking.",
      benefit: "Reduces tracking error against the index.",
      disadvantage: "Limits potential for outperformance.",
    },
    // 67. VaR Validation
    "VaR Validation": {
      filter: (stocks) =>
        stocks.filter((row) => row["VaR (95%)"] < -0.20),
      description:
        "Target stocks with low Value at Risk (VaR) to manage risk exposure.",
      benefit:
        "Quantifies potential maximum loss at a specified confidence level.",
      disadvantage: "Historical VaR may not predict future risk accurately.",
    },
    // 68. Moving Average Mastery
    "Moving Average Mastery": {
      filter: (stocks) =>
        stocks.filter((row) => row["Fifty_MA"] > row["Two_Hundred_MA"]),
      description:
        "Utilize 50-day and 200-day moving averages to identify trends.",
      benefit: "Helps in identifying trend reversals and market momentum.",
      disadvantage: "Lagging indicator that may miss rapid price changes.",
    },
  };

  if (strategies[strategy]) {
    const filteredStocks = strategies[strategy].filter(json).slice(0, 5);
    const description = strategies[strategy].description;
    const benefit = strategies[strategy].benefit;
    const disadvantage = strategies[strategy].disadvantage;
    return { filteredStocks, description, benefit, disadvantage };
  } else {
    return {
      filteredStocks: [],
      description: "Strategy not found",
      benefit: "",
      disadvantage: "",
    };
  }
};

export const filterJsonByRange = (json = [], filter = []) => {
  filter?.forEach((f) => {
    json = json?.filter((j) => {
      if (!j[f?.key]) return true;
      else return j[f?.key] >= f?.lower && j[f?.key] <= f?.upper;
    });
  });

  return json;
};
