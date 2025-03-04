import React from "react";
import BaseSelect from "../BaseSelect";
import { mapStringsToLabelValueArray } from "../../../../config/CreateOptions";

function ImpactSelect({ value, setValue, isMultiSelect, noLabel, disabled }) {
  const options = ["LOW", "MEDIUM", "HIGH"];

  return (
    <BaseSelect
      label="Choose Impact"
      placeholder="Select Impact from here..."
      options={mapStringsToLabelValueArray(options)}
      value={value}
      setValue={setValue}
      isMultiSelect={isMultiSelect}
      name="impact"
      disabled={disabled}
      noLabel={noLabel}
    />
  );
}

export default ImpactSelect;
