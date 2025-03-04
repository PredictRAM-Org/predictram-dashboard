import React, { useState } from "react";
import { useEffect } from "react";
import BaseSelect from "../BaseSelect";
import { getEventStock } from "../../../../api/services/EventStocksService";
import { convertXlsxURLToJson } from "../../../../components/FileUploader/xlsxTOJson";
import { useSelector } from "react-redux";
import { getEvents } from "../../../../api/services/EventService";

function EventStockSelect({ data = [], value, setValue, disable, multiple }) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions(
      data?.map((el) => {
        return { value: el["Stock Symbol"], label: el["Stock Symbol"] };
      })
    );
  }, [data?.length]);
  return (
    <BaseSelect
      label="Choose Event Stocks"
      placeholder="Select Event Stocks from here..."
      options={options}
      isMultiSelect={multiple}
      disabled={disable}
      value={value}
      setValue={setValue}
      name="event-stocks"
    />
  );
}

export default EventStockSelect;
