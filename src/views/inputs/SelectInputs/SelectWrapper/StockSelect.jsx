import React from "react";
import BaseSelect from "../BaseSelect";
import { company } from "../../../../data/company";
import { mapStringsToLabelValueArray } from "../../../../config/CreateOptions";

function StockSelect({
  value,
  setValue,
  isMultiSelect,
  disabled,
  noLabel,
  options,
}) {
  return (
    <BaseSelect
      label="Choose Stock"
      placeholder="Select Stocks from here..."
      options={mapStringsToLabelValueArray(options || company)}
      value={value}
      setValue={setValue}
      isMultiSelect={isMultiSelect}
      name="category"
      disabled={disabled}
      noLabel={noLabel}
    />
  );
}

export default StockSelect;
