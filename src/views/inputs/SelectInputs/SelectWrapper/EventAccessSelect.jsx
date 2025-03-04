import React from "react";
import BaseSelect from "../BaseSelect";

function EventAccessSelect({
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
    { label: "USER", value: true },
    { label: "Pre User", value: false },
  ];

  return (
    <BaseSelect
      label={label ?? "Event Published For"}
      placeholder={placeholder ?? "Select event access from here..."}
      options={options}
      value={value}
      setValue={setValue}
      isMultiSelect={isMultiSelect}
      name={name ?? "eventAccessSelect"}
      disabled={disabled}
      noLabel={noLabel}
    />
  );
}

export default EventAccessSelect;
