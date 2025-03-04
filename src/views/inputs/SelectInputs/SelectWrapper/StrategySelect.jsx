import React from "react";
import BaseSelect from "../BaseSelect";
import { mapStringsToLabelValueArray } from "../../../../config/CreateOptions";

function StrategySelect({ value, setValue, isMultiSelect, noLabel, disabled }) {
  const options = [
    "Crisis Shield: War in the Middle East Intensifies",
    "Debt Crisis Defender: USA Debt Crisis",
    "Volatility Voyagers",
    "Beta Boosters",
    "CAGR Chasers",
    "Debt Ditchers",
    "Price Prospects",
    "Valuation Vultures",
    "EPS Enthusiasts",
    "Dividend Dynamos",
    "Market Cap Masters",
    "RSI Riders",
    "MACD Mavericks",
    "Correlation Calculators",
    "Total Score Titans",
    "Alpha Achievers",
    "Volatility Vanguards",
    "Sharpe Strategists",
    "Treynor Tacticians",
    "Sortino Savants",
    "Drawdown Defenders",
    "R-Squared Researchers",
    "Downside Deviators",
    "Error Eliminators",
    "VaR Visionaries",
    "Moving Average Masters",
    "Margin Managers",
    "Rating Radars",
    "Combined Score Champions",
    "Collateral Calculators",
    "NSEI Navigators",
    "Alpha Interpreters",
    "Alpha Analysis",
    "Volatility Value",
    "Sharpe Sailing",
    "Treynor Trends",
    "Sortino Selection",
    "Drawdown Defense",
    "R-Squared Recognition",
    "Downside Discipline",
    "Error Evaluation",
    "VaR Validation",
    "Moving Average Mastery",
  ];

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "400px",
    }),
    control: (provided) => ({
      ...provided,
      width: "400px",
    }),
    menu: (provided) => ({
      ...provided,
      width: "400px",
    }),
  };

  return (
    <BaseSelect
      label="Choose Strategy"
      placeholder="Select Strategy from here..."
      options={mapStringsToLabelValueArray(options)}
      value={value}
      setValue={setValue}
      isMultiSelect={isMultiSelect}
      name="strategy"
      disabled={disabled}
      noLabel={noLabel}
      customStyles={customStyles}
    />
  );
}

export default StrategySelect;
