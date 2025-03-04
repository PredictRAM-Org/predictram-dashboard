import React, { useState } from "react";
import { useEffect } from "react";
import BaseSelect from "../BaseSelect";
import { getUserList } from "../../../../api/services/InvestorService";

function AdvisorSelect({ value, setValue, isMultiSelect }) {
  const [options, setOptions] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAdvisors();
  }, []);

  const getAdvisors = async () => {
    const { data } = await getUserList(setLoading, { isPublic: true });

    const _options = data.map((el) => {
      return { value: el.email, label: el.name };
    });
    setOptions(_options);
  };

  return (
    <BaseSelect
      isMultiSelect
      label="Choose Advisor"
      placeholder="Select advisor"
      options={options}
      value={value}
      setValue={setValue}
      name="advisor"
    />
  );
}

export default AdvisorSelect;
