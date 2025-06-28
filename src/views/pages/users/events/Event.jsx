import { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CForm,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CFormInput,
  CFormLabel,
  CCardTitle,
  CCardText,
} from "@coreui/react-pro";
import Buytokens from "../../../../components/Events/Buytokens";
import Joi from "joi-browser";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getEvent, getPrice } from "../../../../redux/action/useraction";
import { post } from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { SECTORS } from "../../../../data";
import ImpactSelect from "../../../inputs/SelectInputs/SelectWrapper/ImpactSelect";
import CategorySelect from "../../../inputs/SelectInputs/SelectWrapper/RiskSelect";
import { Typography } from "@mui/material";
import { getetfData } from "../../../../api/services/ScrapperService";
import { getEventChartData } from "../../../../api/services/EventService";
import EventHistoryChart from "../../../../components/Events/EventHistoryChart";
import { getUserResearchPaper } from "../../../../api/services/ResearchPaperService";
import { getCategorizedStocksData } from "../../../../api/services/Investors/InvestorEventService";
import EventStockScoreChart from "../../../../components/Events/EventStockScoreChart";

const quickLinkStyles = {
  wrapper: {
    gap: "0.5rem",
    padding: "1.25rem 1.125rem",
    width: "100%",
    borderRadius: "0.625rem",
    textDecoration: "none",
  },
  headingLarge: {
    fontSize: "2rem",
    lineHeight: "2rem",
    fontWeight: 600,
    color: "#14151F",
    letterSpacing: "-0.05em",
  },
  headingSmall: {
    fontSize: "1.125rem",
    lineHeight: "1.375rem",
    fontWeight: 400,
    color: "#14151F",
  },
};

const customStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "0.625rem",
    padding: "0.25rem 0.125rem",
    fontWeight: "500",
    color: "#14151F",
    borderColor: "#AFAFB6",
    boxShadow: "none",
  }),
};

export default function Event() {
  const history = useHistory();
  const { id } = useParams();
  const subscriber = useSelector((state) => state.event.event.subscriber || []);
  const dispatch = useDispatch();
  const [impact, setImpact] = useState([]);
  const [category, setCategory] = useState([]);
  const [apiload, setApiloading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [eventChartData, setEventChartData] = useState([]);
  const [etfs, setEtfs] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  let price = useSelector((state) => state.price);

  const [industrySectors, setIndustrySectors] = useState([]);
  const [stocks, setStocks] = useState([]);
  // const [categorizedStocks, setCategorizedStocks] = useState([]);
  // const [selectedStocks, setSelectedStocks] = useState([]);

  const getEtfList = async () => {
    const { data } = await getetfData(setApiloading);
    setEtfs(data.map((obj) => ({ label: obj?.symbol, value: obj?.symbol })));
  };

  useEffect(() => {
    dispatch(getEvent(id));
    dispatch(getPrice());
    getEtfList();
    categorizedStockDataFetch();
  }, []);

  useEffect(() => {
    if (subscriber?.length !== 0) {
      setImpact(
        subscriber[0]?.topgainers?.map((item) => {
          return {
            label: item?.impact,
            value: item?.impact,
          };
        })
      );
    }
  }, [subscriber]);

  const categorizedStockDataFetch = async () => {
    const { data: jsonData } = await getCategorizedStocksData(setIsLoading);

    // Extracting data from the "Industry_Sector" column
    const industrySectors = jsonData.map((obj) => obj["Industry_Sector"]);
    console.log('industrySectors', industrySectors);
    // Creating a Set to filter out duplicates
    const uniqueIndustrySectors = [...new Set(industrySectors)];
    // Transforming the array of unique sector names into an array of objects
    const sectorObjects = uniqueIndustrySectors.map((sector) => ({
      label: sector,
      value: sector,
    }));

    setIndustrySectors(sectorObjects);

    // jsonData.forEach((obj) => {
    //   obj.Symbol = obj?.Symbol?.replace(".NS", "");
    //   obj.symbol = obj.Symbol;
    //   delete obj.Symbol;
    //   obj.value = obj.Latest_Close_Price;
    //   delete obj.Latest_Close_Price;
    // });

    // setCategorizedStocks(jsonData);
  };

  const handleSectorChange = (selectedOption) => {
    // setSelectedStocks([]);
    setState({ ...state, bestsector: selectedOption.value });

    // const filteredStocksBySector = categorizedStocks.filter(
    //   (stock) => stock.Industry_Sector === selectedOption.value
    // );

    // const filteredStocksPriceArray = filteredStocksBySector.filter((p) => {
    //   const symbol = p.symbol;
    //   return price.some((s) => s.symbol === symbol);
    // });

    // setStocks(filteredStocksPriceArray);
  };

  const handleImpactChange = (value, idx) => {
    const newImpact = [...impact];
    newImpact[idx] = value;
    setImpact(newImpact);
  };
  const handleCategoryChange = (value, idx) => {
    const newCategory = [...category];
    newCategory[idx] = value;
    setCategory(newCategory);
  };

  const animatedComponents = makeAnimated();
  const event = useSelector((state) => state.event.event);
  const { id: userId } = useSelector((state) => state.user);
  const loading = useSelector((state) => state.event.loading);
  const date = new Date(event.enddate);
  const [state, setState] = useState({
    topgainers: [],
    forecast: null,
    // toplosers: [],
    totalgainer: 0,
    totallosers: 0,
    portfolio: 0,
    bestsector: "",
    etf: "",
    // worstsector: "",
  });

  // async function totalgainer(stocks) {
  //   let t = 0;
  //   setSelectedStocks(stocks);
  //   const filteredPrice = price.filter((p) => {
  //     const symbol = p.symbol.replace(".NS", "");
  //     return stocks.some((s) => s.symbol.replace(".NS", "") === symbol);
  //   });

  //   filteredPrice.forEach((i) => (t += i.value));
  //   setState({
  //     ...state,
  //     topgainers: filteredPrice,
  //     totalgainer: Number(t.toFixed(2)),
  //     portfolio: Number((state.totallosers + t).toFixed(2)),
  //   });
  // }

  async function totalgainer(e) {
    let t = 0;
    e.forEach((i) => (t += i.value));
    setState({
      ...state,
      topgainers: e,
      totalgainer: Number(t.toFixed(2)),
      portfolio: Number((state.totallosers + t).toFixed(2)),
    });
  }

  async function totalloser(e) {
    let t = 0;
    e.forEach((i) => (t += i.value));
    setState({
      ...state,
      toplosers: e,
      totallosers: Number(t.toFixed(2)),
      portfolio: Number((state.totalgainer + t).toFixed(2)),
    });
  }

  const validatePayload = () => {
    if (
      impact?.length !== 5
      // && state?.topgainers?.length !== stocks.length
    ) {
      toast.error("Please select impact for all the stocks");
      return false;
    }
    if (
      category?.length !== 5
      // && state?.topgainers?.length !== stocks.length
    ) {
      toast.error("Please select category for all the stocks");
      return false;
    }
    return true;
  };

  function onsubmit(e) {
    e.preventDefault();
    const schema = {
      topgainers: Joi.array().min(Math.min(5, stocks.length)).max(5).required(),
      topgainers: Joi.array().min(5).max(5).required(),
      // toplosers: Joi.array().min(5).max(5).required(),
      totalgainer: Joi.number().required(),
      totallosers: Joi.number().optional(),
      portfolio: Joi.number().required(),
      forecast: Joi.number().required(),
      bestsector: Joi.string().required(),
      etf: Joi.string().required(),
      // worstsector: Joi.string().required(),
    };
    const result = Joi.validate(state, schema);
    if (result.error) return toast.error(result.error.details[0].message);
    state?.topgainers?.forEach((item, idx) => {
      item.impact = impact[idx]?.value;
      item.category = category[idx]?.value;
    });

    if (validatePayload()) {
      saveevent(state, id);
    }
  }
  async function saveevent(info, id) {
    try {
      await post(
        "/api/users/saveevent",
        { data: info, id },
        {
          withCredentials: true,
        }
      );
      history.push("/viewevents");
      toast.success("Your data submitted successfully");
    } catch (error) {
      console.error(error.response && error.response);
    }
  }

  const getEventChart = async (tags) => {
    const { data } = await getEventChartData(setApiloading, {
      tags: tags,
      isPublic: true,
      startdate: new Date("01-01-2023"),
    });
    setEventChartData(data);
  };

  useEffect(() => {
    if (!!event?.name && !event?.futureStocks) getEventChart(event.tags);
    if (!!event?._id) {
      userSubmittedPaper();
    }
  }, [event]);

  const userSubmittedPaper = async () => {
    const data = await getUserResearchPaper(setApiloading, {
      id: userId,
      event: event._id,
    });
    setShowForm(!!data.length);
  };

  return (
    <div
      style={{
        marginBottom: "3rem",
      }}
    >
      <CCardHeader className="mt-3">
        <CCardTitle
          className="p-0 m-0"
          style={{
            fontSize: "2.5rem",
            fontWeight: 600,
            color: "#252525",
            textAlign: "center",
          }}
        >
          {event.name}
        </CCardTitle>

        <CCardText
          className="m-0 mt-2"
          style={{
            fontWeight: 500,
            color: "#AFAFB6",
            textAlign: "center",
            fontSize: "1.75rem",
          }}
        >
          End date {date.toLocaleDateString()}
        </CCardText>
      </CCardHeader>
      {(loading || apiload || isLoading) && <Loader />}
      {!loading && !apiload && (
        <div>
          {/* {event.image ? (
            <CImage
              className="mb-2 mt-4"
              rounded
              thumbnail
              src={event.image}
              fluid
              align="center"
              style={{
                maxWidth: "68.75rem",
                maxHeight: "40rem",
                objectFit: "cover",
                borderRadius: "0.75rem",
                margin: "0 auto",
                width: "100%",
              }}
            />
          ) : null} */}
          {eventChartData?.length != 0 && !event?.futureStocks && (
            <EventHistoryChart data={eventChartData} />
          )}

          {event?.futureStocks && (
            <EventStockScoreChart futureStocks={event?.futureStocks} />
          )}

          <CCardBody
            style={{
              maxWidth: "44rem",
              margin: "0 auto",
              boxShadow: "none",
              marginTop: "5rem",
            }}
          >
            <p
              style={{
                textAlign: "justify",
                letterSpacing: "-0.04em",
              }}
            >
              {event.details}
            </p>

            <CCard
              className={"shadow-none border-0 d-flex flex-row p-0 mb-3"}
              style={{
                borderRadius: "0.625rem",
                gap: "0.9375rem",
                marginTop: "1.7rem",
              }}
            >
              <div
                className="d-flex flex-column"
                style={{
                  ...quickLinkStyles.wrapper,
                  backgroundColor: "#F5FFF6",
                }}
              >
                <h4 style={{ ...quickLinkStyles.headingLarge }}>
                  {event.lastvalue}
                </h4>
                <span
                  style={{
                    color: "#6F6E7A",
                    fontSize: "0.875rem",
                  }}
                >
                  Last value
                </span>
              </div>
              <div
                className="d-flex flex-column"
                style={{
                  ...quickLinkStyles.wrapper,
                  backgroundColor: "#F5F8FF",
                }}
              >
                <h4 style={{ ...quickLinkStyles.headingLarge }}>
                  {event.previousvalue}
                </h4>
                <span
                  style={{
                    color: "#6F6E7A",
                    fontSize: "0.875rem",
                  }}
                >
                  Previous value
                </span>
              </div>
            </CCard>
            {showForm && (
              <CForm onSubmit={onsubmit}>
                <a
                  href="https://predictram.com/economic-event-analyser.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Use this link as a reference to help you choose stocks.
                </a>
                {!loading && !apiload && (
                  <CCard
                    style={{
                      boxShadow: "none",
                      marginTop: "2.75rem",
                      background: "transparent",
                    }}
                  >
                    <h2
                      className="pl-2"
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      Top Gainers
                    </h2>
                    <CCardBody className="p-0">
                      <CRow>
                        <CCol className="mt-2" sm={12} md={12}>
                          <CFormLabel>Sectors</CFormLabel>
                          <Select
                            isDisabled={subscriber?.length !== 0 || event.ended}
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            placeholder="Select sectors"
                            defaultValue={
                              subscriber?.length !== 0
                                ? {
                                    label: industrySectors.find(
                                      (s) =>
                                        s.value === subscriber[0].bestsector
                                    )?.label,
                                    value: subscriber[0].bestsector,
                                  }
                                : ""
                            }
                            options={industrySectors}
                            getOptionLabel={(option) => `${option.label}`}
                            getOptionValue={(option) => `${option.value}`}
                            styles={customStyles}
                            onChange={handleSectorChange}
                          />
                        </CCol>
                      </CRow>
                      {/* {(!!stocks.length
                      || subscriber?.length !== 0
                    ) && (
                      // <CRow>
                      //   <CCol className="mt-2" sm={12} md={12}>
                      //     <CFormLabel>Stocks</CFormLabel>
                      //     <Select
                      //       isDisabled={subscriber?.length !== 0 || event.ended}
                      //       closeMenuOnSelect={false}
                      //       components={animatedComponents}
                      //       isMulti
                      //       placeholder="Select Stocks"
                      //       value={
                      //         subscriber?.length !== 0
                      //           ? subscriber[0].topgainers
                      //           : selectedStocks
                      //       }
                      //       options={stocks}
                      //       getOptionLabel={(option) => `${option.symbol}`}
                      //       getOptionValue={(option) => `${option.value}`}
                      //       styles={customStyles}
                      //       onChange={totalgainer}
                      //     />
                      //   </CCol>
                      // </CRow>
                    )} */}
                      <CRow>
                        <CCol className="mt-2" sm={12} md={12}>
                          <CFormLabel>Stocks</CFormLabel>
                          <Select
                            isDisabled={subscriber?.length !== 0 || event.ended}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            placeholder="Select Stocks"
                            defaultValue={
                              subscriber?.length !== 0
                                ? subscriber[0].topgainers
                                : []
                            }
                            options={price}
                            getOptionLabel={(option) => `${option.symbol}`}
                            getOptionValue={(option) => `${option.value}`}
                            styles={customStyles}
                            onChange={totalgainer}
                          />
                        </CCol>
                      </CRow>
                      {state?.topgainers?.length === 5 && (
                        // ||state?.topgainers?.length === stocks.length
                        // !!stocks.length &&
                        <CRow
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 2,
                          }}
                        >
                          <CFormLabel className="mt-4 text-2">
                            Choose Impact
                          </CFormLabel>
                          <table>
                            <thead
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <tr>
                                <th>Stock</th>
                                <th>Fundamental</th>
                                <th>Technical</th>
                                <th>Impact</th>
                                <th>Category</th>
                              </tr>
                            </thead>
                            {/* <tbody>
                            {(state?.topgainers?.length === 5 ||
                              subscriber?.length !== 0 ||
                              state?.topgainers?.length === stocks.length) &&
                              !!stocks.length &&
                              (subscriber?.length !== 0
                                ? subscriber[0]
                                : state
                              )?.topgainers?.map((item, idx) => {
                                return (
                                  <tr key={idx}>
                                    <td>
                                      <Typography
                                        sx={{ fontWeight: "bold" }}
                                        variant="body1"
                                      >
                                        {idx + 1}. {item?.symbol}
                                      </Typography>
                                    </td>
                                    <td>
                                      <Link
                                        target="_blank"
                                        to={`/fundamental/${item?.symbol}`}
                                      >
                                        Click Here
                                      </Link>
                                    </td>
                                    <td>
                                      <Link
                                        target="_blank"
                                        to={`/technical/hourly/${item?.symbol}`}
                                      >
                                        Click Here
                                      </Link>
                                    </td>
                                    <td>
                                      <ImpactSelect
                                        noLabel
                                        disabled={subscriber?.length !== 0}
                                        value={impact[idx]}
                                        setValue={(value) =>
                                          handleImpactChange(value, idx)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <CategorySelect
                                        noLabel
                                        disabled={subscriber?.length !== 0}
                                        value={category[idx]}
                                        setValue={(value) =>
                                          handleCategoryChange(value, idx)
                                        }
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody> */}
                            <tbody>
                              {(state?.topgainers?.length === 5 ||
                                subscriber?.length !== 0) &&
                                (subscriber?.length !== 0
                                  ? subscriber[0]
                                  : state
                                )?.topgainers?.map((item, idx) => {
                                  return (
                                    <tr>
                                      <td>
                                        <Typography
                                          sx={{ fontWeight: "bold" }}
                                          variant="body1"
                                        >
                                          {idx + 1}. {item?.symbol}
                                        </Typography>
                                      </td>
                                      <td>
                                        <Link
                                          target="_blank"
                                          to={`/fundamental/${item?.symbol}`}
                                        >
                                          Click Here
                                        </Link>
                                      </td>
                                      <td>
                                        <Link
                                          target="_blank"
                                          to={`/technical/hourly/${item?.symbol}`}
                                        >
                                          Click Here
                                        </Link>
                                      </td>
                                      <td>
                                        <ImpactSelect
                                          noLabel
                                          disabled={subscriber?.length !== 0}
                                          value={impact[idx]}
                                          setValue={(value) =>
                                            handleImpactChange(value, idx)
                                          }
                                        />
                                      </td>
                                      <td>
                                        <CategorySelect
                                          noLabel
                                          disabled={subscriber?.length !== 0}
                                          value={category[idx]}
                                          setValue={(value) =>
                                            handleCategoryChange(value, idx)
                                          }
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </CRow>
                      )}
                      <CRow>
                        <CCol className="mt-2" sm={12} md={12}>
                          <CFormLabel>ETF</CFormLabel>
                          <Select
                            isDisabled={subscriber?.length !== 0 || event.ended}
                            components={animatedComponents}
                            placeholder="Select etfs"
                            defaultValue={
                              subscriber?.length !== 0
                                ? {
                                    label: subscriber[0]?.etf,
                                    value: subscriber[0]?.etf,
                                  }
                                : ""
                            }
                            options={etfs}
                            getOptionLabel={(option) => `${option.label}`}
                            getOptionValue={(option) => `${option.value}`}
                            styles={customStyles}
                            onChange={(e) =>
                              setState({ ...state, etf: e.value })
                            }
                          />
                        </CCol>
                      </CRow>
                      {/* <h2
                      className="pl-2 mt-4"
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      Top Losers
                    </h2> */}
                      <CRow>
                        {/* <CCol className="mt-2" sm={12} md={6}>
                        <CFormLabel>Sectors</CFormLabel>
                        <Select
                          isDisabled={subscriber.length !== 0}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          placeholder="Select sectores"
                          defaultValue={
                            subscriber.length !== 0
                              ? {
                                  label: SECTORS.find(
                                    (s) => s.value === subscriber[0].worstsector
                                  )?.label,
                                  value: subscriber[0].worstsector,
                                }
                              : ""
                          }
                          options={SECTORS}
                          getOptionLabel={(option) => `${option.label}`}
                          getOptionValue={(option) => `${option.value}`}
                          styles={customStyles}
                          onChange={(e) =>
                            setState({ ...state, worstsector: e.value })
                          }
                        />
                      </CCol>
                      <CCol className="mt-2" sm={12} md={6}>
                        <CFormLabel>Stocks</CFormLabel>
                        <Select
                          isDisabled={subscriber.length !== 0}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          placeholder="Select Stocks"
                          defaultValue={
                            subscriber.length !== 0
                              ? subscriber[0].toplosers
                              : []
                          }
                          options={price}
                          getOptionLabel={(option) => `${option.symbol}`}
                          getOptionValue={(option) => `${option.value}`}
                          styles={customStyles}
                          onChange={totalloser}
                        />
                      </CCol> */}
                      </CRow>
                      <CFormLabel className="mt-4 text-2">
                        Your Event Forecast Value
                      </CFormLabel>
                      <div>
                        {subscriber.length === 0 ? (
                          <CFormInput
                            disabled={event.ended}
                            onChange={(e) =>
                              setState({
                                ...state,
                                forecast: e.target.value,
                              })
                            }
                            placeholder="Enter your value here"
                            type="text"
                            style={{
                              borderRadius: "0.625rem",
                              padding: "0.25rem 0.7rem",
                              height: "2.875rem",
                              fontWeight: "500",
                              color: "#14151F",
                              borderColor: "#AFAFB6",
                              boxShadow: "none  ",
                            }}
                          />
                        ) : (
                          <>
                            <h2 className="fw-bold">
                              {subscriber[0].forecast}
                            </h2>
                          </>
                        )}
                      </div>
                      <CCard
                        className={
                          "shadow-none border-0 d-flex flex-column p-0"
                        }
                        style={{
                          borderRadius: "0.625rem",
                          gap: "0.625rem",
                          marginTop: "1.7rem",
                          background: "transparent",
                        }}
                      >
                        <div
                          className="d-flex flex-row justify-content-between"
                          style={{
                            ...quickLinkStyles.wrapper,
                            padding: "0.75rem 0.9375rem",
                            backgroundColor: "#F5FFF6",
                          }}
                        >
                          <h4 style={{ ...quickLinkStyles.headingSmall }}>
                            {"Total Gainer Stock Value"}
                          </h4>
                          <span
                            style={{
                              ...quickLinkStyles.headingSmall,
                              fontWeight: "600",
                            }}
                          >
                            {subscriber.length !== 0
                              ? subscriber[0].totalgainer
                              : state.totalgainer}{" "}
                          </span>
                        </div>
                        {/* <div
                        className="d-flex flex-row justify-content-between"
                        style={{
                          ...quickLinkStyles.wrapper,
                          padding: "0.75rem 0.9375rem",
                          backgroundColor: "#F5FFF6",
                        }}
                      >
                        <h4 style={{ ...quickLinkStyles.headingSmall }}>
                          {"Total Loser Stock Value"}
                        </h4>
                        <span
                          style={{
                            ...quickLinkStyles.headingSmall,
                            fontWeight: "600",
                          }}
                        >
                          {subscriber.length !== 0
                            ? subscriber[0].totallosers
                            : state.totallosers}{" "}
                        </span>
                      </div> */}
                        <div
                          className="d-flex flex-row justify-content-between"
                          style={{
                            ...quickLinkStyles.wrapper,
                            padding: "0.75rem 0.9375rem",
                            backgroundColor: "#FFF7EE",
                          }}
                        >
                          <h4 style={{ ...quickLinkStyles.headingSmall }}>
                            {"Forecasted Value"}
                          </h4>
                          <span
                            style={{
                              ...quickLinkStyles.headingSmall,
                              fontWeight: "600",
                            }}
                          >
                            {event.forecastvalue}
                          </span>
                        </div>
                        <div
                          className="d-flex flex-row justify-content-between"
                          style={{
                            ...quickLinkStyles.wrapper,
                            padding: "0.75rem 0.9375rem",
                            backgroundColor: "#F5F8FF",
                          }}
                        >
                          <h4 style={{ ...quickLinkStyles.headingSmall }}>
                            {"Total Protfolio"}
                          </h4>
                          <span
                            style={{
                              ...quickLinkStyles.headingSmall,
                              fontWeight: "600",
                            }}
                          >
                            {subscriber.length !== 0
                              ? subscriber[0].portfolio
                              : state.portfolio}
                          </span>
                        </div>
                      </CCard>
                    </CCardBody>
                    {!event.ended && (
                      <CButton
                        disabled={subscriber?.length !== 0}
                        color="primary"
                        type="submit"
                        style={{
                          marginTop: "1.25rem",
                          fontSize: "1.125rem",
                          textTransform: "uppercase",
                          height: "3.5rem",
                        }}
                      >
                        {subscriber?.length !== 0
                          ? "Your Portfolio"
                          : "Submit Portfolio"}
                      </CButton>
                    )}
                    {event.ended && (
                      <CButton
                        disabled={true}
                        color="danger"
                        type="submit"
                        style={{
                          marginTop: "1.25rem",
                          fontSize: "1.125rem",
                          textTransform: "uppercase",
                          height: "3.5rem",
                        }}
                      >
                        <div className="text-light">Event Ended</div>
                      </CButton>
                    )}
                  </CCard>
                )}
              </CForm>
            )}
            {!event?.ended && !showForm && (
              <CCard
                className={"shadow-none border-0 d-flex flex-row p-0 mb-3"}
                style={{
                  borderRadius: "0.625rem",
                  gap: "0.9375rem",
                  marginTop: "1.7rem",
                }}
              >
                <div
                  className="d-flex flex-column"
                  style={{
                    ...quickLinkStyles.wrapper,
                    backgroundColor: "#E0D3FE",
                  }}
                >
                  <h4
                    style={{
                      ...quickLinkStyles.headingLarge,
                      textAlign: "center",
                    }}
                  >
                    Publish a research paper on this event to access
                    subscription form.
                  </h4>
                  <Link
                    to={{
                      pathname: "/postresearch",
                      search: `?event=${event?._id}`,
                    }}
                    style={{
                      fontWeight: 500,
                      color: "blue",
                      textAlign: "center",
                      fontSize: "1.75rem",
                    }}
                  >
                    <CButton
                      style={{
                        fontSize: "1.125rem",
                        textTransform: "uppercase",
                        height: "3.5rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      Publish research paper
                    </CButton>
                  </Link>
                </div>
              </CCard>
            )}
          </CCardBody>
        </div>
      )}
    </div>
  );
}
