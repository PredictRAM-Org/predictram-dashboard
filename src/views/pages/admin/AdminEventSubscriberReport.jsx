import { useState } from "react";
import LoadingPage from "../../../utils/LoadingPage";
import { CContainer, CPagination, CPaginationItem } from "@coreui/react";
import {
  CSmartTable,
  CCollapse,
  CButton,
  CCardBody,
  CBadge,
  CCard,
  CForm,
  CFormLabel,
  CFormInput,
} from "@coreui/react-pro";
import VisualNoData from "../../../utils/VisualNoData";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getReports } from "../../../api/services/SubsciberReportService";
import Loader from "../users/Loader";
import {
  getCurrentDate,
  getLocalDate,
  getPriorDate,
} from "../../../utils/DateTimeService";
import CurrentEventSelect from "../../inputs/SelectInputs/SelectWrapper/CurrentEventSelect";
import EventSelect from "../../inputs/SelectInputs/SelectWrapper/EventSelect";

export default function AdminReport() {
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState();
  const [reports, setReports] = useState(null);
  const [details, setDetails] = useState([]);
  const [event, setEvent] = useState(null);
  const [params, setParams] = useState({
    event: "",
    startDate: getPriorDate(1).split("T")[0],
    endDate: getCurrentDate().split("T")[0],
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [tableData, setTableData] = useState([]);

  const fetchReports = async () => {
    try {
      const data = await getReports(setLoading, params);
      setHasData(data?.data?.length > 0);
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Unable to get reports data");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    if (reports?.data) {
      const newData = reports.data.map((item) => ({
        ...item,
        id: item.user._id,
        username: item.user.name,
        name: item.name,
        createdAt: getLocalDate(item.subscriber.createdAt),
        topGainers: item.subscriber.topgainers,
      }));
      setTableData(newData);
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
    console.log(newDetails, index);
    setDetails(newDetails);
  };

  const columns = [
    {
      key: "name",
      label: "Event Name",
      sorter: true,
      filter: true,
    },
    {
      key: "username",
      label: "Submission By",
      sorter: true,
      filter: true,
    },
    {
      key: "createdAt",
      label: "Date",
      sorter: false,
      filter: false,
    },
    {
      key: "show_gainers",
      label: "Top Gainers",
      sorter: false,
      filter: false,
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setParams({
      ...params,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchReports();
  };

  return (
    <CContainer fluid className="mb-5">
      <div className="position-relative mb-3">
        <h1 className="text-center m-0">Event Subscriber Reports</h1>
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
              <div>
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
              </div>
              <CButton
                type="submit"
                style={{ height: "fit-content" }}
                disabled={!params.startDate || !params.endDate}
              >
                Apply
              </CButton>
            </CForm>
          </CCard>
        </div>
        <div
          className="flex-grow-1 shadow-none border border-light flex-wrap"
          style={{ width: "850px", padding: "15PX", backgroundColor: "white" }}
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
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        toggleDetails(`${item?.subscriber?._id}+${item?._id}`)
                      }
                    >
                      Show Top Gainers
                    </CButton>
                  </td>
                ),
                details: (item) => {
                  return (
                    <CCollapse
                      visible={details.includes(
                        `${item?.subscriber?._id}+${item?._id}`
                      )}
                    >
                      <CCardBody style={{ padding: 3 }}>
                        <h4>Selected Top Gainers</h4>
                        {item.topGainers?.map((gainer, index) => (
                          <CBadge
                            key={index}
                            color="success"
                            style={{ marginLeft: 1, marginRight: 1 }}
                          >
                            {index + 1}. {gainer.symbol}
                          </CBadge>
                        ))}
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
