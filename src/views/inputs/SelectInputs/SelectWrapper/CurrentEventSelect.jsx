import React, { useState } from "react";
import { useEffect } from "react";
import { getCurrentEvents } from "../../../../api/services/EventService";
import BaseSelect from "../BaseSelect";
import { useSelector } from "react-redux";

function CurrentEventSelect({ value, setValue }) {
  const role = useSelector((state) => state.user.role);
  const [options, setOptions] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    currentEvents();
  }, []);

  const currentEvents = async () => {
    const data = await getCurrentEvents(setLoading, {
      isPublic: role === "USER",
    });
    const _options = data.map((el) => {
      return { value: el._id, label: el.name };
    });
    setOptions(_options);
  };

  return (
    <BaseSelect
      label="Choose Event"
      placeholder="Select Events from here..."
      options={options}
      value={value}
      setValue={setValue}
      name="events"
    />
  );
}

export default CurrentEventSelect;
