import { CSmartTable, CFormSelect } from "@coreui/react-pro";
import { useEffect, useState } from "react";
import { post } from "axios";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import {
  getEquityblock,
  getEquitybulk,
  getMutualfund,
} from "../../../api/services/ReportService";
import { useSelector } from "react-redux";
export default function Reports() {
  const [mutualfund, setmutual] = useState(false);
  const [equitybulk, setbulk] = useState(false);
  const [equityblock, setblock] = useState(false);
  const [details, setDetails] = useState(1);
  const [loading, setLoading] = useState(false);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: investorId } = useSelector((state) => state.investor);

  const handelApicall = async (api) => {
    return await api(
      setLoading,
       { secretToken, mobileNumber },
      investorId ? "investor" : "advisor",
    );
  };
  useEffect(() => {
    (async () => {
      const data = await handelApicall(getMutualfund);
      console.log(data);
      setmutual(data);
    })();
  }, []);
  async function detailschanged(e) {
    try {
      if (e.target.value == 1) {
        console.log(e.target.value);

        setDetails(e.target.value);
        const data = await handelApicall(getMutualfund);
        setmutual(data);
      } else if (e.target.value == 2) {
        setDetails(e.target.value);
        console.log(e.target.value);
        const data = await handelApicall(getEquityblock);
        setblock(data);
      } else if (e.target.value == 3) {
        console.log(e.target.value);
        setDetails(e.target.value);
        const data = await handelApicall(getEquitybulk);
        setbulk(data);
      }
    } catch (e) {
      if (e.response & e.response.data) console.log(e.response);
      toast.error("Failed to get data");
    }
  }
  return (
    <>
      <CFormSelect
        className="m-2"
        aria-label="Default select example"
        options={[
          "Open this select menu",
          { label: "Mutual Fund Report", value: 1 },
          { label: "Equity Block Report", value: 2 },
          { label: "Equity Bulk", value: 3 },
        ]}
        onChange={detailschanged}
      />
      {details == 1 && mutualfund && (
        <>
          <CSVLink
            filename={`Mutualfundreport.csv`}
            data={mutualfund}
            className="btn btn-success"
          >
            Export as CSV
          </CSVLink>
          <div className="overflow-auto">
            <CSmartTable
              cleaner
              clickableRows
              columnFilter
              columnSorter
              items={mutualfund}
              itemsPerPageSelect
              itemsPerPage={10}
              pagination
              sorterValue={{ column: "Date", state: "desc" }}
              tableFilter
              tableHeadProps={{
                color: "success",
              }}
              scopedColumns={{
                Date: (item) => {
                  return <td>{item.Date.slice(0, 10)}</td>;
                },
              }}
              tableProps={{
                striped: true,
                hover: true,
              }}
            />
          </div>
        </>
      )}
      {details == 2 && equityblock && (
        <>
          <CSVLink
            filename={`Equity Block Report.csv`}
            data={equityblock}
            className="btn btn-success"
          >
            Export as CSV
          </CSVLink>
          <div className="overflow-auto">
            <CSmartTable
              cleaner
              clickableRows
              columnFilter
              columnSorter
              items={equityblock}
              itemsPerPageSelect
              itemsPerPage={10}
              pagination
              sorterValue={{ column: "Date", state: "desc" }}
              tableFilter
              tableHeadProps={{
                color: "success",
              }}
              scopedColumns={{
                Date: (item) => {
                  return <td>{item.Date.slice(0, 10)}</td>;
                },
              }}
              tableProps={{
                striped: true,
                hover: true,
              }}
            />
          </div>
        </>
      )}
      {details == 3 && equitybulk && (
        <>
          <CSVLink
            filename={`Equity Bulk Report.csv`}
            data={equitybulk}
            className="btn btn-success"
          >
            Export as CSV
          </CSVLink>
          <div className="overflow-auto">
            <CSmartTable
              cleaner
              clickableRows
              columnFilter
              columnSorter
              items={equitybulk}
              itemsPerPageSelect
              itemsPerPage={10}
              pagination
              sorterValue={{ column: "Date", state: "desc" }}
              tableFilter
              tableHeadProps={{
                color: "success",
              }}
              scopedColumns={{
                Date: (item) => {
                  return <td>{item.Date.slice(0, 10)}</td>;
                },
              }}
              tableProps={{
                striped: true,
                hover: true,
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
