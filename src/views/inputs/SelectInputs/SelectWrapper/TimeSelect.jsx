import React from "react";
import BaseSelect from "../BaseSelect";

function TimeSelect({ value, setValue, slots }) {
  var convertedSlots =
    slots !== "Slots Not Available"
      ? slots.map(function (slot) {
          return { label: slot, value: slot };
        })
      : [];

  return (
    <>
      {slots !== "Slots Not Available" && slots.length > 0 ? (
        <BaseSelect
          label="Choose time slot"
          placeholder="Select the service you want to avail"
          options={convertedSlots}
          value={value}
          setValue={setValue}
          name="time"
        />
      ) : (
        <div>No slots available!</div>
      )}
    </>
  );
}

export default TimeSelect;
