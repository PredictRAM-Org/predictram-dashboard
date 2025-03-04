import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EventSelect from "../../../inputs/SelectInputs/SelectWrapper/EventSelect";
import EventStockSelect from "../../../inputs/SelectInputs/SelectWrapper/EventStockSelect";
import { CCard } from "@coreui/react";
import { toast } from "react-toastify";
import { getEventStock } from "../../../../api/services/EventStocksService";
import VisualNoData from "../../../../utils/VisualNoData";
import Loader from "../Loader";
import CustomCards from "../../../../utils/CustomCards";
import axios from "axios";
import { CLoadingButton, CSmartTable } from "@coreui/react-pro";
import { useSelector } from "react-redux";
import GenerateReportModal from "./GenerateReportModal";
import { findJSON, findJSONByList } from "../../../../api/services/JsonService";
import { userGetEvents } from "../../../../api/services/EventService";
import { convertXlsxURLToJson } from "../../../../components/FileUploader/xlsxTOJson";

const tableConfig = [
  { key: "Stock Symbol", label: "Stock Symbol" },
  { key: "Company Name", label: "Company Name" },
  { key: "Average 12-Month Change", label: "Average 12-Month Change" },
];
function EventSectorAnalysis() {
  const user = useSelector((state) => state.user);
  const [event, setEvent] = useState("");
  const [params, setParams] = useState({});
  const [allSectors, setAllSectors] = useState([]);
  const [loading, setLoading] = useState(false);

  const eventSectors = async () => {
    setAllSectors([]);
    const { events } = await userGetEvents(setLoading, {
      isPublic: user?.role === "USER",
      _id: params?.event,
    });
    if (!events?.[0]?.sectorAnalysisFile) return;
    setLoading(true);
    const json = await convertXlsxURLToJson(events?.[0]?.sectorAnalysisFile);
    setAllSectors(json);
    setLoading(false);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (params?.event) eventSectors();
    else setAllSectors([]);
  };

  return (
    <Grid container gap={1}>
      <Grid item xs={12} md={3}>
        <CCard style={{ padding: 15 }}>
          <form onSubmit={handelSubmit}>
            <Stack>
              <Typography variant="h5" fontWeight="bold">
                Filters
              </Typography>
              <EventSelect
                value={event}
                setValue={(e) => {
                  setEvent(e);
                  setParams({
                    ...params,
                    event: e.value,
                  });
                }}
              />

              <Button sx={{ mt: 2 }} variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </CCard>
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        {loading && <Loader />}
        {!loading && allSectors.length > 0 && (
          <div style={{ overflow: "auto" }}>
            <CSmartTable
              className="shadow-none border border-light flex-wrap"
              style={{ padding: "10px", backgroundColor: "white" }}
              activePage={3}
              cleaner
              clickableRows
              columnFilter
              columnSorter
              columns={tableConfig?.map((config) => ({
                ...config,
                sorter: true,
                filter: true,
                _props: {
                  color: "primary",
                  className: "fw-semibold",
                },
                _style: { width: "25%" },
              }))}
              items={allSectors}
              itemsPerPageSelect
              itemsPerPage={5}
              pagination={{ size: "sm" }}
              sorterValue={{ column: "name", state: "asc" }}
              tableFilter
            />
          </div>
        )}
        {!loading && !allSectors.length && (
          <VisualNoData
            imageHight={200}
            imageWidth={200}
            message="No Sector Analysis Found"
          />
        )}
      </Grid>
    </Grid>
  );
}

export default EventSectorAnalysis;
