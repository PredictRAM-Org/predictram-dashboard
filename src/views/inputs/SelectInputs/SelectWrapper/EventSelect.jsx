import React, { useState } from "react";
import { useEffect } from "react";
import {
  userGetEvents,
} from "../../../../api/services/EventService";
import BaseSelect from "../BaseSelect";
import { useSelector } from "react-redux";

function EventSelect({ value, setValue }) {
  const role = useSelector((state) => state.user.role);
  const [options, setOptions] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    events();
  }, []);

  const events = async () => {
    const { events } = await userGetEvents(setLoading, {
      isPublic: role === "USER",
    });
    const _options = events?.map((el) => {
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

export default EventSelect;
