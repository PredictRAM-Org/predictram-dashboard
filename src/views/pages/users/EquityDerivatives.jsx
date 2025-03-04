import { post } from "axios";
import { useEffect, useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { getEquityderivatives } from "../../../api/services/ReportService";
import { useSelector } from "react-redux";
export default function EquityDerivatives() {
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: investorId } = useSelector((state) => state.investor);
  useEffect(() => {
    (async () => {
      const data = await getEquityderivatives(
        setLoading,
        { secretToken, mobileNumber },
        investorId ? "investor" : "advisor"
      );
      setState(data);
    })();
  }, []);
  return (
    <>
      {state && (
        <div className="overflow-auto">
          <CSmartTable
            cleaner
            clickableRows
            columnFilter
            columnSorter
            items={state}
            itemsPerPageSelect
            itemsPerPage={10}
            pagination
            tableFilter
            tableHeadProps={{
              color: "success",
            }}
            tableProps={{
              striped: true,
              hover: true,
            }}
          />
        </div>
      )}
    </>
  );
}
