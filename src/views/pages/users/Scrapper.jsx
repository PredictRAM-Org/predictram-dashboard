import { useEffect, useState } from "react";
import Select, { createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";
import { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCollapse,
  CForm,
  CFormSwitch,
  CNavbar,
} from "@coreui/react";
import Loader from "./Loader";
import {
  compByeventGet,
  getCompanydata,
  compByeventAdd,
  compByeventEdit,
  compByeventDelete,
} from "../../../api/services/CompanyService";
import { company, eventtypes } from "../../../data";
import Addcompanyevent from "../../../components/Scrapper/Addcompanyevent";
import Editcompanyevent from "../../../components/Scrapper/Editcompanyevent";
import { CSmartTable } from "@coreui/react-pro";
import { useSelector } from "react-redux";

const options = [];
company.forEach((i) => options.push({ value: i, label: i }));
const height = 35;
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#F6F7F8",
    borderRadius: "0.625rem",
    padding: "0.25rem 0.125rem",
    fontWeight: "500",
    color: "#14151F",
    border: "none",
    width: "15rem",
    boxShadow: state.isFocused ? "0 0 0 1px #666666" : "none",
  }),
};

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}
export default function Scrapper() {
  const [scrapper, setScrapper] = useState(false);
  const [loading, setLoading] = useState(true);
  const admin = useSelector((state) => state.user.admin);
  const [showData, setShowData] = useState({
    value: "pc",
    label: "Peer Comparision",
  });
  const [allcompbyevent, setAllcompbyevent] = useState(false);
  const [current, setCurrent] = useState(options[0]);
  const [showbyevent, setShowByEvent] = useState(false);
  const [currentevent, setCurrentevent] = useState({
    value: "Manufacturing",
    label: "Manufacturing",
  });
  const [showadd, setShowadd] = useState(false);
  const [showedit, setShowedit] = useState(false);
  const [editdata, setEditdata] = useState(false);
  const scraperOptions = [
    {
      heading: "Peer Comparision",
      key: "pc",
      data: scrapper?.peer_comparison,
    },
    {
      heading: "Quaterly Results",
      key: "qr",
      data: scrapper?.quarterly_results?.slice(0, -1),
    },
    {
      heading: "Profit Loss",
      key: "pl",
      data: scrapper?.profit_loss,
    },
    {
      heading: "Balance Sheet",
      key: "bs",
      data: scrapper?.balance_sheet,
    },
    {
      heading: "Cash Flows",
      key: "cf",
      data: scrapper?.cash_flows,
    },
    {
      heading: "Ratios",
      key: "r",
      data: scrapper?.ratios,
    },
  ];
  var columns = [
    "Company Name",
    "Industry",
    "Mkt. Cap.",
    { key: "Event", filter: false, sorter: false },
  ];
  if (admin) {
    columns = [
      ...columns,
      { key: "edit", label: "", filter: false, sorter: false },
      { key: "delete", label: "", filter: false, sorter: false },
    ];
  }
  const handleChange = async (e) => {
    const event = e || { value: "20MICRONS", label: "20MICRONS" };
    const data = await getCompanydata(setLoading, event.value);
    setScrapper(data);
    setCurrent(event);
  };

  const handelEventchange = async (e) => {
    const event = e || { value: "Manufacturing", label: "Manufacturing" };
    const data = await compByeventGet(setLoading, event.value);
    setAllcompbyevent(false);
    setAllcompbyevent(data);
    setCurrentevent(event);
  };

  const handelAdd = async (companyname, industry, mktcap, event) => {
    setShowadd(false);
    const data = { companyname, industry, mktcap, event: event.value };
    await compByeventAdd(setLoading, data);
    handelEventchange(event);
  };

  const handelEdit = async (companyname, industry, mktcap, event, id) => {
    setShowedit(false);
    const data = { companyname, industry, mktcap, event: event.value };
    await compByeventEdit(setLoading, id, data);
    handelEventchange(event);
  };

  const handelDelete = async (id) => {
    await compByeventDelete(setLoading, id);
    handelEventchange(currentevent);
  };

  useEffect(() => {
    handleChange();
    handelEventchange();
  }, [showbyevent]);

  return (
    <>
      <CCard
        className={"pb-0 shadow-none border border-light mb-4"}
        style={{ borderRadius: "0.625rem", padding: "1.25rem" }}
      >
        <CCardBody className="p-0">
          <div className="d-flex align-items-center justify-content-between flex-column flex-md-row">
            {!showbyevent ? (
              <div className="d-flex align-items-center flex-column flex-md-row">
                <Select
                  className="m-2"
                  styles={customStyles}
                  filterOption={createFilter({ ignoreAccents: false })}
                  components={{ MenuList }}
                  onChange={handleChange}
                  options={options}
                  value={current}
                />
                <Select
                  className="m-2"
                  styles={customStyles}
                  filterOption={createFilter({ ignoreAccents: false })}
                  components={{ MenuList }}
                  onChange={setShowData}
                  options={scraperOptions.map((el) => ({
                    value: el.key,
                    label: el.heading,
                  }))}
                  value={showData}
                />
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Select
                  className="m-2"
                  styles={customStyles}
                  filterOption={createFilter({ ignoreAccents: false })}
                  components={{ MenuList }}
                  onChange={handelEventchange}
                  options={eventtypes.map((el) => ({
                    value: el,
                    label: el,
                  }))}
                  value={currentevent}
                />
                {!!admin && (
                  <CButton variant="outline" onClick={() => setShowadd(true)}>
                    Add new Company event
                  </CButton>
                )}
              </div>
            )}
            <CFormSwitch
              className="fw-semibold"
              size="lg"
              style={{
                width: "2rem",
                cursor: "pointer",
              }}
              checked={showbyevent}
              onChange={(e) => setShowByEvent(e.target.checked)}
              label="Search by event type"
            />
          </div>

          {!showbyevent
            ? scrapper &&
              !loading &&
              scraperOptions?.map((el, index) => {
                if (showData.value === `${el?.key}`) {
                  return (
                    <div key={index}>
                      <table
                        className="table customTable"
                        style={{ fontSize: "14px" }}
                      >
                        <thead>
                          <tr>
                            {el?.data &&
                              el.data[0] &&
                              Object.keys(el.data[0]).map(
                                (headerName, index) => (
                                  <th className="text-truncate" key={index}>
                                    {headerName}
                                  </th>
                                )
                              )}
                          </tr>
                        </thead>
                        <tbody>
                          {el.data?.map((rowData, index) => (
                            <tr key={index}>
                              {rowData &&
                                Object.values(rowData).map((value, index) => (
                                  <td className="text-truncate" key={index}>
                                    {value}
                                  </td>
                                ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              })
            : allcompbyevent &&
              !loading && (
                <CSmartTable
                  items={allcompbyevent.map((ele) => {
                    return {
                      "Company Name": ele.companyname,
                      Industry: ele.industry,
                      "Mkt. Cap.": ele.mktcap,
                      Event: ele.event,
                      id: ele._id,
                    };
                  })}
                  columns={columns}
                  columnFilter
                  itemsPerPageSelect
                  columnSorter
                  pagination
                  tableProps={{
                    hover: true,
                    responsive: true,
                  }}
                  clickableRows
                  scopedColumns={{
                    edit: (item) => (
                      <td>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            setEditdata(item);
                            setShowedit(true);
                            //console.log(item);
                          }}
                        >
                          Edit
                        </CButton>
                      </td>
                    ),
                    delete: (item) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="danger"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              handelDelete(item.id);
                            }}
                          >
                            Delete
                          </CButton>
                        </td>
                      );
                    },
                  }}
                />
              )}
          {loading && <Loader />}
        </CCardBody>
      </CCard>
      <Addcompanyevent
        showadd={showadd}
        setShowadd={setShowadd}
        handelAdd={handelAdd}
      />
      {showedit && (
        <Editcompanyevent
          showedit={showedit}
          editdata={editdata}
          setShowedit={setShowedit}
          handelEdit={handelEdit}
        />
      )}
    </>
  );
}
