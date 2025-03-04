import React, { useEffect, useState } from "react";
import { getSpecificPortfolioManagementEvent } from "../../../api/services/PortfolioMangementService";
import { useHistory, useParams } from "react-router-dom";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CCollapse,
  CRow,
  CSpinner,
} from "@coreui/react";
import { Chip, Stack } from "@mui/material";
import { CSmartTable } from "@coreui/react-pro";
// import { getStockPrice } from "../../../api/services/EventService";
import { useSelector } from "react-redux";
import {
  acceptPortfolio,
  getPortfolioManagementLeaderboard,
} from "../../../api/services/PortfolioManagementService";
import { fyersQuotes } from "../../../api/services/FyersService";

function AdminPortfolioManagementDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [portfolio, setPortfolio] = useState([]);
  // const [price, setPrice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const investor = useSelector((state) => state.investor);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const [response, setResponse] = useState([]);
  const [stocks, setStocks] = useState([]);

  const getFyersData = async (stocks) => {
    const { data } = await fyersQuotes({ symbols: stocks });
    return data.data.d;
  };

  const getPortfolio = async () => {
    const {
      data: [portfolioEventData],
    } = await getSpecificPortfolioManagementEvent(
      setLoading,
      id,
      investor?._id ? "investor" : "advisor",
      { secretToken, mobileNumber }
    );
    // const data = await getStockPrice(
    //   setLoading,
    //   investor?._id ? "investor" : "advisor",
    //   { secretToken, mobileNumber }
    // );
    // setPrice(data);
    setPortfolio(portfolioEventData);
  };

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const getResponses = async () => {
    const { data: response } = await getPortfolioManagementLeaderboard(
      setLoading,
      {
        portfolioEvent: id,
      },
      "investor",
      { mobileNumber, secretToken }
    );

    setResponse(response);
  };

  const handelAcceptReject = async (advisor, isAccept) => {
    await acceptPortfolio(
      setLoading,
      {
        advisor,
        portfolioEvent: id,
        ...(isAccept
          ? { acceptedBy: investor?._id }
          : { rejectedBy: investor?._id }),
      },
      { secretToken, mobileNumber }
    );
    getResponses();
  };

  useEffect(() => {
    getPortfolio();
    getResponses();
  }, [id]);

  const getCurrentFyersTotal = async (stocks) => {
    setLoading(true);
    let symbols = stocks.map((stock) => stock.symbol);
    const fyersdata = await getFyersData(symbols.join(","));
    let total = 0;

    const updatedStocks = stocks.map((stock) => {
      const fyersStock = fyersdata.find((data) =>
        data.n.includes(stock.symbol)
      );
      if (fyersStock) {
        const currentPrice = fyersStock.v.lp;

        return {
          ...stock,
          currentPrice,
        };
      }
      return stock;
    });

    setStocks(updatedStocks);
    setLoading(false);
    return total;
  };

  useEffect(() => {
    const fetchCurrentTotal = async () => {
      if (!portfolio?.portfolioSubmitted?.length) return;

      const flattenedStocks = portfolio.portfolioSubmitted.flat();
      await getCurrentFyersTotal(flattenedStocks);
      // setCurrentTotal(total);
    };

    fetchCurrentTotal();
  }, [portfolio]);

  return (
    <div>
      {!loading && Object.keys(portfolio).length > 0 ? (
        <div>
          <h1>{portfolio?.title}</h1>
          <CRow className="g-4 my-4">
            <CCol md={6} sm={12}>
              <CCard>
                <CCardBody>
                  <div className="text-1 bold">{portfolio?.portfolioRisk}</div>
                  <CCardText className="text-3 mt-2">
                    Portfolio Risk(%)
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={6} sm={12}>
              <CCard>
                <CCardBody>
                  <div className="text-1 bold">{portfolio?.idealRisk}</div>
                  <CCardText className="text-3 mt-2">Risk Capacity</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CCard>
            <CCardBody>
              <Stack direction="row" spacing={1}>
                {portfolio?.portfolioStocks?.map((stocks) => (
                  <Chip label={stocks?.companyName} color="primary" />
                ))}
              </Stack>
              <CCardText className="text-3 mt-2">Stocks Owned</CCardText>
            </CCardBody>
          </CCard>
          <CCard style={{ margin: "2em 0" }}>
            <CCardHeader>
              <CCardTitle>Comment</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CCardText className="text-3 mt-2">
                {portfolio?.comment}
              </CCardText>
            </CCardBody>
          </CCard>
          <CSmartTable
            cleaner
            clickableRows
            columns={[
              {
                key: "name",
                label: "Name",
                _props: { color: "primary", className: "fw-semibold" },
                _style: { width: "25%" },
              },
              {
                key: "portfolio",
                label: "Portfolio Creation Value",
                _props: { color: "primary", className: "fw-semibold" },
                _style: { width: "20%" },
              },
              {
                key: "current",
                filter: false,
                sorter: false,
                label: "Portfolio Current Value",
                _props: { color: "primary", className: "fw-semibold" },
              },
              {
                key: "show_report",
                label: "Show Report",
                _style: { width: "1%" },
                filter: false,
                sorter: false,
                _props: { color: "primary", className: "fw-semibold" },
              },
              {
                key: "show_details",
                label: "Show Stocks",
                _style: { width: "1%" },
                filter: false,
                sorter: false,
                _props: { color: "primary", className: "fw-semibold" },
              },
              {
                key: "accept",
                label: "Accept",
                _style: { width: "1%" },
                filter: false,
                sorter: false,
                _props: { color: "primary", className: "fw-semibold" },
              },
              {
                key: "reject",
                label: "Reject",
                _style: { width: "1%" },
                filter: false,
                sorter: false,
                _props: { color: "primary", className: "fw-semibold" },
              },
            ]}
            columnFilter
            columnSorter
            items={portfolio.portfolioSubmitted}
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            sorterValue={{ column: "name", state: "asc" }}
            tableFilter
            scopedColumns={{
              name: (item) => <td>{item[0]?.ownerid?.name}</td>,
              details: (item) => {
                const stockarray = Object.values(item).filter((i) => isNaN(i));
                return (
                  <CCollapse visible={details.includes(item[0]?.ownerid?._id)}>
                    <CCardBody>
                      <h4>Selected Stocks</h4>
                      {stockarray.map((item, idx) => (
                        <CBadge className="mx-2" color="success">
                          {idx + 1}. {item.symbol}
                        </CBadge>
                      ))}
                    </CCardBody>
                  </CCollapse>
                );
              },
              portfolio: (item) => {
                let prevValue = 0;
                const stockarray = Object.values(item).filter((i) => isNaN(i));
                stockarray.forEach((v) => {
                  prevValue += v.totalinvested;
                });
                return <td>{prevValue.toFixed(2)}</td>;
              },
              current: (item) => {
                const stockarray = Object.values(item).filter((i) => isNaN(i));
                let prevValue = 0;
                let value = 0;
                stockarray.forEach((v) => {
                  const stockPrice = stocks.find(
                    (p) => p.symbol === v.symbol
                  )?.currentPrice;

                  value += stockPrice * v.totalquantity;
                });
                stockarray.forEach((v) => {
                  prevValue += v.totalinvested;
                });

                let difference = Number(
                  Number(prevValue.toFixed(2)) - Number(value.toFixed(2))
                );
                let percentage = (Math.abs(difference) / prevValue) * 100;

                return (
                  <td
                    className={difference < 0 ? "text-success" : "text-danger"}
                  >
                    {value.toFixed(2)} ({percentage.toFixed(2)}%)
                  </td>
                );
              },
              show_report: (item) => {
                return (
                  <td className="">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        history.push(
                          `/portfolio/management/report/view/${id}?author=${item[0]?.ownerid?._id}`
                        );
                      }}
                    >
                      Show Report
                    </CButton>
                  </td>
                );
              },
              show_details: (item) => {
                return (
                  <td className="">
                    <CButton
                      color="info"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item[0]?.ownerid?._id);
                      }}
                    >
                      {details.includes(item[0]?.ownerid?._id)
                        ? "Hide Stocks"
                        : "Show Stocks"}
                    </CButton>
                  </td>
                );
              },
              accept: (item) => {
                const data = response?.find(
                  (r) => r?.advisor === item[0]?.ownerid?._id
                );
                return (
                  <td className="">
                    {!!data?.acceptedBy || !!data?.rejectedBy ? (
                      <p
                        style={{ color: data?.acceptedBy ? "green" : "black" }}
                      >
                        {data?.acceptedBy ? "Accepted" : "-"}
                      </p>
                    ) : (
                      <CButton
                        color="success"
                        // variant="outline"
                        shape="square"
                        size="sm"
                        disabled={!!data?.acceptedBy || !!data?.rejectedBy}
                        onClick={() => {
                          handelAcceptReject(item[0]?.ownerid?._id, true);
                        }}
                      >
                        Accept
                      </CButton>
                    )}
                  </td>
                );
              },
              reject: (item) => {
                const data = response?.find(
                  (r) => r?.advisor === item[0]?.ownerid?._id
                );
                return (
                  <td className="">
                    {!!data?.acceptedBy || !!data?.rejectedBy ? (
                      <p style={{ color: data?.rejectedBy ? "red" : "black" }}>
                        {data?.rejectedBy ? "Rejected" : "-"}
                      </p>
                    ) : (
                      <CButton
                        color="danger"
                        // variant="outline"

                        shape="square"
                        size="sm"
                        onClick={() => {
                          handelAcceptReject(item[0]?.ownerid?._id, false);
                        }}
                      >
                        Reject
                      </CButton>
                    )}
                  </td>
                );
              },
            }}
          />
        </div>
      ) : (
        <CSpinner color="primary" />
      )}
    </div>
  );
}

export default AdminPortfolioManagementDetails;
