import React from "react";
import SESSION_TAGS from "../../../../data/SessionTags";
import BaseSelect from "../BaseSelect";

function SessionTagSelect({ label, value, setValue }) {
  return (
    <BaseSelect
      label={label ? label : ""}
      placeholder="Select Session Tags from here..."
      options={SESSION_TAGS}
      value={value}
      setValue={setValue}
      name="sectors"
    />
  );
}

export default SessionTagSelect;
