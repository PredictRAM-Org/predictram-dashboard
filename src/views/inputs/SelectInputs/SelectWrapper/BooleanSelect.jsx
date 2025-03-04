import React from "react";
import BaseSelect from "../BaseSelect";

function BooleanSelect({
  label,
  placeholder,
  value,
  setValue,
  isMultiSelect,
  noLabel,
  disabled,
  name,
}) {
  const options = [
    { label: "YES", value: true },
    { label: "NO", value: false },
  ];

  return (
    <BaseSelect
      label={label ?? "Select Boolean"}
      placeholder={placeholder ?? "Select Boolean from here..."}
      options={options}
      value={value}
      setValue={setValue}
      isMultiSelect={isMultiSelect}
      name={name ?? "booleanSelect"}
      disabled={disabled}
      noLabel={noLabel}
    />
  );
}

export default BooleanSelect;
