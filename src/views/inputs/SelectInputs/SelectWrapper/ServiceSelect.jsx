import React from "react";
import BaseSelect from "../BaseSelect";

function ServiceSelect({ value, setValue, services }) {
  services.forEach(function(service) {
    service.value = service.id;
    service.label = service.name; 
  });

  return (
    <BaseSelect
      label="Choose Service"
      placeholder="Select the service you want to avail"
      options={services}
      value={value}
      setValue={setValue}
      name="service"
    />
  );
}

export default ServiceSelect;
