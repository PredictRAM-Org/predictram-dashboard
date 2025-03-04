import React from "react";
import BaseSelect from "../BaseSelect";

function StaffSelect({ selectedStaff, setSelectedStaff, staffs }) {
  return (
    <BaseSelect
      label="Choose Advisor"
      placeholder="Select the advisor"
      options={staffs}
      value={selectedStaff}
      setValue={setSelectedStaff}
      name="staff"
    />
  );
}

export default StaffSelect;
