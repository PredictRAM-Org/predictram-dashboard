import React from "react";
import BaseSelect from "../BaseSelect";
import { mapStringsToLabelValueArray } from "../../../../config/CreateOptions";

function CategorySelect({ value, setValue, isMultiSelect, noLabel, disabled }) {
  const options = ["Very Conservative", "Conservative", "Moderate", "Aggressive", "Very Aggressive"];

  return (
    <BaseSelect
      label="Choose Category"
      placeholder="Select Category from here..."
      options={mapStringsToLabelValueArray(options)}
      value={value}
      setValue={setValue}
      isMultiSelect={isMultiSelect}
      name="category"
      disabled={disabled}
      noLabel={noLabel}
    />
  );
}

export default CategorySelect;
