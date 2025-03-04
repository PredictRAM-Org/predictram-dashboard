import { useParams } from "react-router-dom";
import {
  CSmartTable,
  CCollapse,
  CButton,
  CCardBody,
  CBadge,
  CAvatar,
  CLoadingButton,
} from "@coreui/react-pro";

import {
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModal,
  CModalFooter,
} from "@coreui/react";
import DeployedContracts from "./DeployedContracts";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { post } from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CSVLink } from "react-csv";
import { etfCreate } from "../../../api/services/EtfService";
import { publishPortfolioScore } from "../../../api/services/PortfolioScoreService";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Loader from "../users/Loader";
import { Stack } from "@mui/system";
import { createInvestorEvent } from "../../../api/services/Investors/InvestorEventService";
import EventFileUploader from "../../../components/Events/EventFileUploader";
import { fyersQuotes } from "../../../api/services/FyersService";
import EventStockUploader from "../../../components/Events/EventStockUploader";
import { convertXlsxURLToJson } from "../../../components/FileUploader/xlsxTOJson";
import EventSectorAnalysisUploader from "../../../components/Events/EventSectorAnalysisUploader";
import EventRiaFileUploader from "../../../components/Events/EventRiaFileUploader";
import EventScoreAndTrendUploader from "../../../components/Events/EventScoreAndTrendUploader";
import { stockAnalysisConfig } from "../../../config/stockAnalysisConfig";

const MODAL_STATES = {
  INVESTOR_EVENT: "INVESTOR_EVENT",
  EVENT_DETAILS: "EVENT_DETAILS",
  EVENT_STOCK: "EVENT_STOCK",
  EVENT_SECTOR: "EVENT_SECTOR",
  EVENT_RIA: "EVENT_RIA",
  EVENT_STOCK_SCORE: "EVENT_STOCK_SCORE",
  EVENT_STOCK_TREND: "EVENT_STOCK_TREND",
};
export default function AdminEventPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [listofgainers, setListofgainers] = useState([]);
  // const [price, setPrice] = useState(false);
  const [prices, setPrices] = useState([]);
  const [event, setEvent] = useState([]);
  const [details, setDetails] = useState([]);
  const [portfolioScoreDetails, setPortfolioScoreDetails] = useState([]);
  const [modalState, setModalState] = useState(null);
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [stocks, setStocks] = useState([]);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    getevent(id);
  }, []);

  async function create(name, eventsymbol) {
    try {
      toast?.loading("deploying");
      const { data } = await post(
        "/api/admin/deploycontract",
        { name, eventsymbol },
        {
          withCredentials: true,
        }
      );
      toast?.dismiss();
      toast?.success(data);
    } catch (e) {
      toast?.dismiss();
      if (e?.response && e?.response?.data) {
        toast?.error(e?.response?.data);
      }
    }
  }

  const getevent = async (id) => {
    try {
      const { data } = await post(
        "/api/admin/getevent",
        { id },
        {
          withCredentials: true,
        }
      );
      setEvent(data?.event);

      const _portfolioScoreDetails = data?.event[0]?.id?.map((el) => {
        return {
          userId: el?._id,
          eventId: id,
          portfolioScore: 0,
        };
      });
      setPortfolioScoreDetails(_portfolioScoreDetails);

      const stockFileUrl = data?.event[0]?.stockFile;
      const sectorFileUrl = data?.event[0]?.sectorAnalysisFile;

      if (stockFileUrl) {
        const json = await convertXlsxURLToJson(stockFileUrl);
        setStocks(json);
      }

      if (sectorFileUrl) {
        const json = await convertXlsxURLToJson(sectorFileUrl);
        setSectors(json);
      }

      setListofgainers(data?.listofgainers);
      setLoading(false);
    } catch (error) {
      toast?.error(error?.response && error?.response?.data);
    }
  };

  const createEtf = async (id) => {
    const payload = {
      eventId: id,
      title: event[0]?.name,
    };
    await etfCreate(setLoading, payload);
  };

  const topgainerscolumns = [
    {
      key: "symbol",
      label: "SYMBOL",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "25%" },
    },
    {
      key: "value",
      label: "Value",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "25%" },
    },
    {
      key: "average",
      label: "Average",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "25%" },
    },
  ];

  const sectorTableConfig = [
    { key: "Stock Symbol", label: "Stock Symbol" },
    { key: "Company Name", label: "Company Name" },
    { key: "Average 12-Month Change", label: "Average 12-Month Change" },
  ];

  const columns = [
    {
      key: "name",
      label: "Name",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "25%" },
    },
    {
      key: "email",
      label: "Email",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "20%" },
    },
    {
      key: "forecast",
      label: "Forecast",
      _style: { width: "10%" },
      _props: { color: "primary", className: "fw-semibold" },
    },
    {
      key: "portfolio",
      label: "Portfolio Creation Value",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "20%" },
    },
    {
      key: "etf",
      label: "ETF",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "20%" },
    },
    {
      key: "createdAt",
      filter: false,
      sorter: false,
      label: "Created At",
      _style: { width: "10%" },
      _props: { color: "primary", className: "fw-semibold" },
    },
    {
      key: "current",
      filter: false,
      sorter: false,
      label: "Portfolio Current Value",
      _props: { color: "primary", className: "fw-semibold" },
    },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      filter: false,
      sorter: false,
      _props: { color: "primary", className: "fw-semibold" },
    },
  ];
  const toggleDetails = (index) => {
    const position = details?.indexOf(index);
    let newDetails = details?.slice();
    if (position !== -1) {
      newDetails?.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const preparePortfolioScore = async () => {
    if (event?.length > 0 && portfolioScoreDetails?.length > 0) {
      event[0]?.id?.forEach((item, idx) => {
        let value = 0;
        // item?.topgainers?.forEach((v) => (value += price[v?.symbol]));
        item?.topgainers?.forEach((v) => {
          const cp = prices?.filter((price) => price?.n?.includes(v?.symbol))[0]
            ?.v?.lp;
          value += cp || 0;
        });
        const difference = Number(Number(value?.toFixed(2)) - item?.portfolio);
        const _portfolioScore = Number(
          ((difference / item?.portfolio) * 100)?.toFixed(2)
        );
        const updatedPortfolioScoreDetails = [...portfolioScoreDetails];
        updatedPortfolioScoreDetails[idx].portfolioScore = _portfolioScore;
        setPortfolioScoreDetails(updatedPortfolioScoreDetails);
      });
      await publishPortfolioScore(setLoading, portfolioScoreDetails);
    }
  };

  const openModal = (state) => {
    setModalState(state);
  };

  const closeModal = () => {
    setModalState(null);
  };

  const handleCreateEvent = async (e) => {
    e?.preventDefault();
    const payload = {
      eventId: id,
      startDate: new Date(startDateInput),
      endDate: new Date(endDateInput),
    };

    closeModal();
    await createInvestorEvent(setLoading, payload);
  };

  const getFyersData = async (stocks) => {
    if (!stocks?.length) return;
    const { data } = await fyersQuotes({ symbols: stocks });
    return data?.data?.d;
  };

  const fetchPrices = async () => {
    const symbols = event[0]?.id?.flatMap((item) =>
      item?.topgainers?.map((g) => g?.symbol)
    );
    const uniqueSymbols = [...new Set(symbols)];
    const fetchedPrices = await getFyersData(uniqueSymbols?.join(","));
    setPrices(fetchedPrices);
  };

  useEffect(() => {
    fetchPrices();
  }, [event]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="bg-white rounded p-4">
          <CModal
            alignment="center"
            visible={modalState === MODAL_STATES.INVESTOR_EVENT}
            onClose={closeModal}
          >
            <CModalHeader onClose={closeModal}>
              <CModalTitle>Create Investor Event</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <Box
                component="form"
                sx={{
                  "& ?.MuiTextField-root": { my: 2 },
                }}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="startDate"
                  label="Start Date"
                  margin="dense"
                  type="date"
                  value={startDateInput}
                  onChange={(e) => setStartDateInput(e?.target?.value)}
                />
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="endDate"
                  label="End Date"
                  margin="dense"
                  type="date"
                  value={endDateInput}
                  onChange={(e) => setEndDateInput(e?.target?.value)}
                />
              </Box>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={handleCreateEvent}>
                Create
              </CButton>{" "}
              <CButton color="secondary" onClick={closeModal}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
          <EventFileUploader
            id={id}
            getevent={getevent}
            closeDetailsUpload={closeModal}
            detailsUpload={modalState === MODAL_STATES.EVENT_DETAILS}
          />
          <EventStockUploader
            getevent={getevent}
            closeStockUpload={closeModal}
            stockUpload={modalState === MODAL_STATES.EVENT_STOCK}
            id={id}
          />
          <EventSectorAnalysisUploader
            getevent={getevent}
            closeSectorUpload={closeModal}
            sectorUpload={modalState === MODAL_STATES.EVENT_SECTOR}
            id={id}
          />
          <EventRiaFileUploader
            getevent={getevent}
            closeRiaFileUploader={closeModal}
            riaFileUpload={modalState === MODAL_STATES.EVENT_RIA}
            id={id}
          />
          <EventScoreAndTrendUploader
            getevent={getevent}
            keyToUpdate={modalState === MODAL_STATES.EVENT_STOCK_SCORE}
            name="Upload Stock Score File"
            visible={MODAL_STATES.EVENT_STOCK_SCORE === modalState}
            id={id}
            close={closeModal}
          />
          <Typography mb={3} fontSize={40} fontWeight="bold">
            {event[0]?.name}
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              <CButton
                color="primary"
                shape="square"
                onClick={preparePortfolioScore}
              >
                Publish Portfolio Score
              </CButton>
            </Grid>
            <Grid item>
              <CButton
                color="primary"
                shape="square"
                onClick={() => openModal(MODAL_STATES.INVESTOR_EVENT)}
              >
                Publish Investor Event
              </CButton>
            </Grid>
            <Grid item>
              <CButton
                color="primary"
                shape="square"
                onClick={() => openModal(MODAL_STATES.EVENT_DETAILS)}
              >
                {event[0]?.file ? "Change Report File" : "Upload Report File"}
              </CButton>
            </Grid>
            <Grid item>
              <CButton
                color="primary"
                shape="square"
                onClick={() => openModal(MODAL_STATES.EVENT_STOCK)}
              >
                {event[0]?.stockFile
                  ? "Change Stock Details"
                  : "Upload Stock Details"}
              </CButton>
            </Grid>
            <Grid item>
              <CButton
                color="primary"
                shape="square"
                onClick={() => openModal(MODAL_STATES.EVENT_SECTOR)}
              >
                {event[0]?.sectorAnalysisFile
                  ? "Change Sector Analysis Details"
                  : "Upload Sector Analysis Details"}
              </CButton>
            </Grid>
            <Grid item>
              <CButton
                color="primary"
                shape="square"
                onClick={() => openModal(MODAL_STATES.EVENT_RIA)}
              >
                {event[0]?.ria?.length > 0
                  ? "Change RIA/RAA File"
                  : "Upload RIA/RAA File"}
              </CButton>
            </Grid>
            <Grid item>
              <CButton
                color="primary"
                shape="square"
                onClick={() => openModal(MODAL_STATES.EVENT_STOCK_SCORE)}
              >
                {event[0]?.futureStocks
                  ? "Change Stock Score File"
                  : "Upload Stock Score File"}
              </CButton>
            </Grid>
          </Grid>
          <Box sx={{ my: 3 }}>
            {event[0]?.file && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography fontWeight="bold">View Report File</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack alignItems="flex-end">
                    <Button onClick={() => window?.open(event[0]?.file)}>
                      Open In new Tab
                    </Button>
                    <object
                      data={event[0]?.file}
                      type="application/pdf"
                      width="100%"
                      height="500px"
                    />
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )}
            {stocks?.length > 0 && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography fontWeight="bold">View Stock Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mb: 3,
                    }}
                  >
                    <Button onClick={() => window?.open(event[0]?.stockFile)}>
                      Open In new Tab
                    </Button>
                  </Box>

                  <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
                    <CSmartTable
                      clickableRows
                      columns={stockAnalysisConfig?.map((config) => ({
                        ...config,
                        _props: {
                          color: "primary",
                          className: "fw-semibold",
                        },
                        _style: { width: "25%" },
                      }))}
                      items={stocks}
                      columnFilter
                      columnSorter
                      pagination
                      itemsPerPage={5}
                      tableProps={{
                        hover: true,
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            )}
            {sectors?.length > 0 && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography fontWeight="bold">
                    View Sector Analysis
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mb: 3,
                    }}
                  >
                    <Button
                      onClick={() => window?.open(event[0]?.sectorAnalysisFile)}
                    >
                      Open In new Tab
                    </Button>
                  </Box>

                  <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
                    <CSmartTable
                      clickableRows
                      columns={sectorTableConfig?.map((config) => ({
                        ...config,
                        _props: {
                          color: "primary",
                          className: "fw-semibold",
                        },
                        _style: { width: "25%" },
                      }))}
                      items={sectors}
                      columnFilter
                      columnSorter
                      pagination
                      itemsPerPage={5}
                      tableProps={{
                        hover: true,
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
          <CSmartTable
            activePage={3}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            items={event[0]?.id || []}
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            sorterValue={{ column: "name", state: "asc" }}
            tableFilter
            scopedColumns={{
              name: (item) => (
                <td>
                  <CAvatar src={item?.image} /> {item?.name}
                </td>
              ),
              details: (item) => {
                return (
                  <CCollapse visible={details?.includes(item?._id)}>
                    <CCardBody>
                      <h4>Selected Topgainers</h4>
                      {item?.topgainers?.map((gainers, idx) => (
                        <CBadge className="mx-2" color="success">
                          {idx + 1}?. {gainers?.symbol}
                        </CBadge>
                      ))}
                    </CCardBody>
                  </CCollapse>
                );
              },
              createdAt: (item) => {
                const date = Math?.ceil(
                  Math?.abs(new Date() - new Date(item?.createdAt)) /
                    (1000 * 60 * 60 * 24)
                );
                return (
                  <td>
                    {new Date(item?.createdAt)?.toLocaleDateString()}(-{date})
                  </td>
                );
              },
              current: (item) => {
                let value = 0;
                item?.topgainers?.forEach((v) => {
                  const cp = prices?.filter((price) =>
                    price?.n?.includes(v?.symbol)
                  )[0]?.v?.lp;
                  // value += price[v?.symbol];
                  value += cp || 0;
                });
                let difference = Number(
                  item?.portfolio - Number(value?.toFixed(2))
                );
                let percentage =
                  (Math?.abs(difference) / item?.portfolio) * 100;
                return (
                  <td
                    key={item?.createdAt}
                    className={difference < 0 ? "text-success" : "text-danger"}
                  >
                    {value?.toFixed(2)} ({percentage?.toFixed(2)}%)
                  </td>
                );
              },
              show_details: (item) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item?._id);
                      }}
                    >
                      {details?.includes(item?._id) ? "Hide" : "Show"}
                    </CButton>
                  </td>
                );
              },
            }}
            tableHeadProps={{
              color: "danger",
              key: "createdAt",
            }}
            tableProps={{
              striped: true,
              hover: true,
            }}
          />
          <hr />
          {topgainerscolumns && (
            <>
              <CSVLink
                filename={`${event[0]?.name}?.csv`}
                data={listofgainers}
                className="btn btn-success"
              >
                Export as CSV
              </CSVLink>
              {event[0]?.polygontokenaddress ? (
                <DeployedContracts
                  polygontokenaddress={event[0]?.polygontokenaddress}
                  polygonportfolioaddress={event[0]?.polygonportfolioaddress}
                  kardiatokenaddress={event[0]?.kardiatokenaddress}
                  kardiaportfolioaddress={event[0]?.kardiaportfolioaddress}
                />
              ) : (
                <CButton
                  className="m-3"
                  color="info"
                  shape="square"
                  onClick={() => {
                    create(event[0]?.name, event[0]?.eventsymbol);
                  }}
                >
                  Create Contract
                </CButton>
              )}
              <CButton
                color="primary"
                shape="square"
                onClick={() => createEtf(id)}
              >
                Create ETF
              </CButton>
              <CSmartTable
                activePage={3}
                cleaner
                clickableRows
                columns={topgainerscolumns}
                columnFilter
                columnSorter
                items={listofgainers}
                itemsPerPageSelect
                itemsPerPage={10}
                pagination
                sorterValue={{ column: "value", state: "dsc" }}
                tableFilter
                tableHeadProps={{
                  color: "danger",
                }}
                scopedColumns={{
                  average: (item) => <td>{item?.average?.toFixed(2)}</td>,
                }}
                tableProps={{
                  striped: true,
                  hover: true,
                }}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
