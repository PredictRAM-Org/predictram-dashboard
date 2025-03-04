import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  LinearProgress,
  Pagination,
  Slider,
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
import { CLoadingButton } from "@coreui/react-pro";
import { useSelector } from "react-redux";
import GenerateReportModal from "./GenerateReportModal";
import {
  filterJsonByRange,
  findJSON,
  findJSONByList,
} from "../../../../api/services/JsonService";
import { userGetEvents } from "../../../../api/services/EventService";
import { convertXlsxURLToJson } from "../../../../components/FileUploader/xlsxTOJson";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { stockAnalysisConfig } from "../../../../config/stockAnalysisConfig";

const filterParams = [
  { key: "Volatility", label: "Volatility" },
  { key: "Beta", label: "Beta" },
  // { key: "Return_on_Investment", label: "Return on Investment" },
  { key: "CAGR", label: "CAGR" },
  { key: "Debt_to_Equity_Ratio", label: "Debt to Equity Ratio" },
  { key: "Latest_Close_Price", label: "Latest Close Price" },
  { key: "P/E_Ratio", label: "P/E Ratio" },
  { key: "P/B_Ratio", label: "P/B Ratio" },
  { key: "Dividend_Yield", label: "Dividend Yield" },
  { key: "RSI", label: "RSI" },
  { key: "MACD", label: "MACD" },
  { key: "Correlation_with_event", label: "Correlation with event" },
  { key: "Correlation with ^NSEI", label: "Correlation with ^NSEI" },
];

function EventStockAnalysis() {
  const user = useSelector((state) => state.user);
  const [event, setEvent] = useState("");
  const [params, setParams] = useState({});
  const [stockInfo, setStockInfo] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allStockLoad, setAllStocksLoad] = useState(false);
  const [pdfLoad, setPDFLoad] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [reportData, setReportData] = useState({});
  const [reportModal, setReportModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rangeFilter, setRangeFilter] = useState([]);
  const [choosenStocks, setChoosenStocks] = useState([]);

  const eventStocks = async () => {
    try {
      setLoading(true);
      setStockInfo([]);
      setAllStocks([]);
      const { events } = await userGetEvents(setAllStocksLoad, {
        isPublic: user?.role === "USER",
        _id: params?.event,
      });
      if (!events?.[0]?.stockFile)
        throw new Error("No stocks found for this event");
      const json = await convertXlsxURLToJson(events?.[0]?.stockFile);

      const minMaxFilter = filterParams.map((f) => {
        let values = json.map((d) => d?.[f?.key] || 0);
        return {
          ...f,
          min: Math.min(...values),
          max: Math.max(...values),
          lower: Math.min(...values),
          upper: Math.max(...values),
        };
      });

      setRangeFilter(minMaxFilter);

      setAllStocks(json);
      setStockInfo(json);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handelSubmit = async () => {
    try {
      const data = filterJsonByRange(allStocks, rangeFilter);
      setStockInfo(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const generateReport = () => {
    const mainTopic = event?.label;
    setReportData({
      stockDetails: choosenStocks,
      mainTopic,
      advisor: user?.name,
    });
    setReportModal(true);
  };

  useEffect(() => {
    if (params?.event) eventStocks();
    else setStockInfo([]);
  }, [params?.event]);

  return (
    <Grid container gap={1}>
      <GenerateReportModal
        reportModal={reportModal}
        setReportModal={setReportModal}
        data={reportData}
        setData={setReportData}
      />
      <Grid item xs={12} md={3}>
        <CCard style={{ padding: 15 }}>
          <form>
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
              {
                allStocks?.length > 0 &&
                  rangeFilter.length > 0 &&
                  rangeFilter?.map((filter, index) => (
                    <>
                      <Typography mt={1} fontWeight="bold">
                        {filter?.label}
                      </Typography>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>{filter?.lower?.toFixed(2)}</Typography>

                        <Typography>{filter?.upper?.toFixed(2)}</Typography>
                      </Stack>
                      <Slider
                        size="small"
                        key={index}
                        min={filter?.min}
                        max={filter?.max}
                        step={0.01}
                        value={[filter?.lower, filter?.upper]}
                        onChange={(_, v) => {
                          rangeFilter[index] = {
                            ...filter,
                            lower: v[0],
                            upper: v[1],
                          };
                          setRangeFilter([...rangeFilter]);
                          handelSubmit();
                        }}
                        valueLabelDisplay="auto"
                        // getAriaValueText={valuetext}
                      />
                    </>
                  ))

                // <></>
              }
            </Stack>
          </form>
        </CCard>
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        {stockInfo?.length === 0 && !loading && (
          <VisualNoData
            imageHight={200}
            imageWidth={200}
            message="Sorry No Matching Stock Event Analysis"
          />
        )}
        {loading && (
          <Stack alignItems="center">
            <Loader />
            <Typography fontWeight="bold" fontSize={20}>
              Please wait we are finding stock event analysis
            </Typography>
          </Stack>
        )}
        {/* {pdfLoad && (
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{ mb: 3 }}
          />
        )} */}

        {!loading && stockInfo?.length > 0 && (
          <>
            {choosenStocks?.length > 0 && (
              <Stack gap={2} alignItems="flex-end" mb={2}>
                <CLoadingButton
                  color="primary"
                  loading={pdfLoad}
                  disabled={pdfLoad}
                  onClick={generateReport}
                >
                  Generate Report on {choosenStocks.length} stocks
                </CLoadingButton>
              </Stack>
            )}
            <Card>
              <DataGrid
                rows={stockInfo}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    printOptions: { disableToolbarButton: true },
                    csvOptions: { disableToolbarButton: true },
                  },
                }}
                columns={stockAnalysisConfig?.map((t) => ({
                  field: t?.key,
                  headerName: t?.label,
                  valueGetter: (value, row) => row?.[t?.key] || "Not Available",
                }))}
                getRowId={(row) => row?.["Stock Symbol"]}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 50, 100]}
                checkboxSelection
                onRowSelectionModelChange={(s) => {
                  const stockDetails = findJSONByList(
                    stockInfo,
                    "Stock Symbol",
                    s
                  );
                  setChoosenStocks(stockDetails);
                }}
              />
            </Card>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default EventStockAnalysis;

// const generateText = async (prompt) => {
//   const response = await axios.post(
//     "https://api.openai.com/v1/chat/completions",
//     {
//       model: "gpt-4",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 300,
//       n: 1,
//       stop: null,
//       temperature: 0.7,
//     },
//     {
//       headers: {
//         Authorization: `Bearer sk-proj-xBmzSlkzY2HMgC5gJXfgT3BlbkFJ886dWtuZQED80c5nJKrY`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data.choices[0].message.content.trim();
// };

// const generateReport = async () => {
//   if (stockInfo.length > 50)
//     return toast.error("Maximum 50 stocks you can choose");

//   try {
//     setPDFLoad(true);
//     const mainTopic = event?.label;
//     const execSummaryPrompt = `Generate an executive summary for a report on ${mainTopic} maximum 200 words, dont let the response tell others that we are using gpt model.`;
//     const execSummary = await generateText(execSummaryPrompt);
//     setPercentage(20);

//     const keyFindingsPrompt = `Generate key findings for a report on ${mainTopic} maximum 200 words, dont let the response tell others that we are using gpt model`;
//     const keyFindings = await generateText(keyFindingsPrompt);
//     setPercentage(40);

//     const risksPrompt = `Generate risks and uncertainties for a report on ${mainTopic} maximum 200 words, dont let the response tell others that we are using gpt model`;
//     const risks = await generateText(risksPrompt);
//     setPercentage(60);

//     const relatedIndustriesPrompt = `Generate related industries for a report on ${mainTopic} maximum 200 words, dont let the response tell others that we are using gpt model`;
//     const relatedIndustries = await generateText(relatedIndustriesPrompt);
//     setPercentage(80);

//     const globalScenariosPrompt = `Generate global scenarios for a report on ${mainTopic} maximum 200 words, dont let the response tell others that we are using gpt model`;
//     const globalScenarios = await generateText(globalScenariosPrompt);
//     setPercentage(100);

//     setReportData({
//       stockDetails: stockInfo,
//       mainTopic,
//       advisor: user?.name,
//       execSummary,
//       keyFindings,
//       risks,
//       relatedIndustries,
//       globalScenarios,
//     });
//     setReportModal(true);
//   } catch (err) {
//     toast.error(err.message);
//   } finally {
//     setPDFLoad(false);
//   }
// };
