import { CFormLabel } from "@coreui/react";
import React from "react";
import Select from "react-select";

function BaseSelect({
  noLabel = false,
  label,
  value,
  disabled = false,
  options = [],
  setValue,
  name,
  placeholder,
  isMultiSelect = false,
  customStyles
}) {
  const handleChange = (e) => {
    setValue(e);
  };

  return (
    <>
      {!noLabel && <CFormLabel className="mt-2">{label}</CFormLabel>}
      <Select
        isMulti={isMultiSelect}
        placeholder={placeholder}
        name={name}
        value={value}
        isDisabled={disabled}
        options={options}
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
        styles={customStyles} // Apply custom styles
      />
    </>
  );
}

export default BaseSelect;
