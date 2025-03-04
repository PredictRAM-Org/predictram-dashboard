import { useState } from "react";
import { CContainer } from "@coreui/react";
import {
  CSmartTable,
  CCollapse,
  CButton,
  CCardBody,
  CCard,
  CForm,
} from "@coreui/react-pro";
import VisualNoData from "../../../utils/VisualNoData";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getPortfolioReports } from "../../../api/services/SubsciberReportService";
import Loader from "../users/Loader";
import AdminPortfolioTable from "../../../components/AdminPortfolioTable";
import PortfolioManagementEventSelect from "../../inputs/SelectInputs/SelectWrapper/PortfolioManagementEventSelect";
// import { fyersQuotes } from "../../../api/services/FyersService";

// const date = new Date();
// date.setMonth(date.getMonth() - 1);

export default function AdminReturns() {
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState();
  const [reports, setReports] = useState(null);
  const [details, setDetails] = useState([]);
  const [event, setEvent] = useState(null);
  const [params, setParams] = useState({
    event: "",
    // fromTime: date,
    // toTime: new Date(),
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [tableData, setTableData] = useState([]);

  const fetchReports = async () => {
    try {
      const data = await getPortfolioReports(setLoading, params);
      setHasData(data?.data?.length > 0);
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Unable to get reports data");
    }
  };

  useEffect(() => {
    fetchReports();
  }, [params, currentPage]);

  // const getFyersData = async (stocks) => {
  //   const { data } = await fyersQuotes({ symbols: stocks });
  //   return data.data.d;
  // };

  useEffect(() => {
    if (reports?.data) {
      Promise.all(
        reports.data.map(async (item) => {
          // const symbols = item.portfolio.map((stock) => stock.symbol);
          // const prices = await getFyersData(symbols.join(","));

          // // Calculate total value for each portfolio
          // const totalValue = item.portfolio.reduce((acc, stock) => {
          //   const currentPrice = prices.filter((price) =>
          //     price.n.includes(stock.symbol)
          //   )[0].v.lp;
          //   const stockValue = currentPrice * stock.totalquantity;
          //   return acc + stockValue;
          // }, 0);

          return {
            ...item,
            ownerName: item?.owner?.name,
            ownerEmail: item?.owner?.email,
            id: `${item?._id?.ownerid}+${item?._id?.id}`,
            totalPortfolioPrice: item?.totalPortfolioPrice.toFixed(2),
            // totalValue
          };
        })
      )
        .then((newData) => {
          setTableData(newData);
        })
        .catch((error) => {
          console.error("Error fetching prices:", error);
        });
    }
  }, [reports]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    console.log(newDetails);
    setDetails(newDetails);
  };

  const columns = [
    {
      key: "title",
      label: "Event Title",
      sorter: false,
      filter: true,
      _style: { width: "40%" },
    },
    {
      key: "idealRisk",
      label: "Ideal Risk",
      sorter: false,
      filter: false,
      _style: { width: "15%" },
    },
    {
      key: "portfolioRisk",
      label: "Portfolio Risk",
      sorter: false,
      filter: false,
      _style: { width: "15%" },
    },
    {
      key: "totalPortfolioPrice",
      label: "Total Portfolio",
      sorter: false,
      filter: false,
      _style: { width: "15%" },
    },
    {
      key: "ownerName",
      label: "Submitted By",
      sorter: false,
      filter: true,
      _style: { width: "15%" },
    },
    {
      key: "ownerEmail",
      label: "email",
      sorter: false,
      filter: true,
      _style: { width: "15%" },
    },
    // {
    //   key: "totalValue",
    //   label: "Current Total",
    //   sorter: false,
    //   filter: false,
    //   _style: { width: "15%" },
    // },
    {
      key: "show_gainers",
      label: "Portfolio",
      sorter: false,
      filter: false,
      _style: { width: "15%", textAlign: "right" },
      scopedSlots: {
        customCell: (item) => (
          <td>
            <CButton
              color="primary"
              size="sm"
              onClick={() => toggleDetails(item.id)}
            >
              Show Top Gainers
            </CButton>
          </td>
        ),
      },
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(event);
    setParams({
      ...params,
      event: event.value,
    });
    if (params.event) {
      setTableData([]);
      setReports(null);
      fetchReports();
    }
  };

  return (
    <CContainer fluid className="mb-5">
      <div className="position-relative mb-3">
        <h1 className="text-center m-0">Event Subscriber Portfolio</h1>
      </div>
      <div className="d-flex flex-row">
        <div className="flex-grow-1 me-3">
          <CCard
            className="shadow-none border border-light d-flex flex-column"
            style={{
              padding: "1.25rem",
              orderRadius: "0.625rem",
              maxWidth: "18.75rem",
            }}
          >
            <h2>Filters</h2>
            <CForm
              onSubmit={handleSubmit}
              className="d-flex flex-column "
              style={{ gap: "0.9375rem", height: "fit-content" }}
            >
              <PortfolioManagementEventSelect
                value={event}
                setValue={(e) => {
                  setEvent(e);
                }}
              />
              {/* <div>
                <CFormLabel style={{ marginBottom: "25px" }}>
                  Start Date
                </CFormLabel>
                <CFormInput
                  name="startDate"
                  type="date"
                  value={params.startDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <CFormLabel style={{ marginBottom: "25px" }}>
                  End Date
                </CFormLabel>
                <CFormInput
                  name="endDate"
                  type="date"
                  value={params.endDate || ""}
                  onChange={handleChange}
                />
              </div> */}
              <CButton
                type="submit"
                style={{ height: "fit-content" }}
                // disabled={!params.startDate || !params.endDate}
              >
                Apply
              </CButton>
            </CForm>
          </CCard>
        </div>
        <div
          className="flex-grow-1 shadow-none border border-light flex-wrap"
          style={{ width: "850px" }}
        >
          {loading && <Loader />}
          {!loading && hasData && (
            <CSmartTable
              className="shadow-none border border-light flex-wrap"
              style={{ padding: "10px", backgroundColor: "white" }}
              activePage={3}
              cleaner
              clickableRows
              columnFilter
              columnSorter
              columns={columns}
              items={tableData}
              itemsPerPageSelect
              itemsPerPage={5}
              pagination={{ size: "sm" }}
              sorterValue={{ column: "name", state: "asc" }}
              tableFilter
              scopedColumns={{
                show_gainers: (item) => (
                  <td>
                    <CButton
                      color="primary"
                      size="sm"
                      onClick={() => toggleDetails(item.id)}
                    >
                      {details.includes(item.id)
                        ? "Hide portfolio"
                        : "Show portfolio"}
                    </CButton>
                  </td>
                ),
                details: (item) => {
                  return (
                    <CCollapse visible={details.includes(item.id)}>
                      <CCardBody>
                        <AdminPortfolioTable
                          portfolio={item.portfolio}
                          visible={details.includes(item.id)}
                          totalPortfolioPrice={item.totalPortfolioPrice}
                        />
                      </CCardBody>
                    </CCollapse>
                  );
                },
              }}
            />
          )}
          {!loading && !hasData && <VisualNoData />}
        </div>
      </div>
    </CContainer>
  );
}
