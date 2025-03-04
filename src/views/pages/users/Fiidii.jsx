import { useEffect, useState } from "react";
import { post } from "axios";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react-pro";
import { useSelector } from "react-redux";
import { getFIIDII } from "../../../api/services/FiidiiService";
import VisualNoData from "../../../utils/VisualNoData";
export default function Fiidii() {
  const [fiidii, setFiidii] = useState([]);
  const [loading, setLoading] = useState(false);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: investorId } = useSelector((state) => state.investor);
  useEffect(() => {
    (async () => {
      console.log("Entering...");
      const data = await getFIIDII(
        setLoading,
        { secretToken, mobileNumber },
        investorId ? "investor" : "advisor"
      );
      setFiidii(data);
      console.log(data);
    })();
  }, []);
  return (
    <>
      {fiidii.length > 0 ? (
        <div className="overflow-auto">
          <CTable color="light" className="text-center">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell color="primary" colSpan="5">
                  FII/FPI trading activity on NSE,BSE and MSEI in Capital Market
                  Segment(In Rs. Crores)
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Buy Value</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sell Value</CTableHeaderCell>
                <CTableHeaderCell scope="col">Net Value</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">
                  {fiidii[0]?.Category}
                </CTableHeaderCell>
                <CTableDataCell>{fiidii[0]?.Date}</CTableDataCell>
                <CTableDataCell>{fiidii[0]["Buy Value"]}</CTableDataCell>
                <CTableDataCell>{fiidii[0]["Sell Value"]}</CTableDataCell>
                <CTableDataCell>{fiidii[0]["Net Value"]}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CTable color="light" className="text-center">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell color="primary" colSpan="5">
                  DII trading activity on NSE,BSE and MSEI in Capital Market
                  Segment(In Rs. Crores)
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Buy Value</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sell Value</CTableHeaderCell>
                <CTableHeaderCell scope="col">Net Value</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">
                  {fiidii[1].Category}
                </CTableHeaderCell>
                <CTableDataCell>{fiidii[1].Date}</CTableDataCell>
                <CTableDataCell>{fiidii[1]["Buy Value"]}</CTableDataCell>
                <CTableDataCell>{fiidii[1]["Sell Value"]}</CTableDataCell>
                <CTableDataCell>{fiidii[1]["Net Value"]}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </div>
      ) : (
        <VisualNoData />
      )}
    </>
  );
}
