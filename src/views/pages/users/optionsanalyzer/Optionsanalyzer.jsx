import { post } from "axios";
import { useEffect, useState } from "react";
import { CContainer, CRow, CCol, CFormSelect } from "@coreui/react";
import { useSelector } from "react-redux";
import { getOptionanalyze } from "../../../../api/services/OptionanalyzeService";

export default function OptionsAnalyzer() {
  const [interval, setinterval] = useState(null);
  const [indices, setIncices] = useState("NIFTY");
  const [strikeprice, setStrikeprice] = useState(null);
  const [state, setState] = useState(null);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: investorId } = useSelector((state) => state.investor);
  const [loading, setLoading] = useState(false);

  const getAnalyzerData = async () => {
    await getdata();
    clearInterval(interval);
    setinterval(
      setInterval(async () => {
        await getdata();
      }, 50000)
    );
  };

  useEffect(() => {
    getAnalyzerData();
  }, [indices]);

  async function getdata() {
    const data = await getOptionanalyze(
      setLoading,
      { indices },
      { secretToken, mobileNumber },
      investorId ? "investor" : "advisor"
    );
    setState(data.value[indices]);
    console.log(data.value);
  }
  function changedata(e) {
    setStrikeprice(null);
    setIncices(e.target.value);
  }
  function changestrikeprice(e) {
    if (e.target.value == "Select Strike Price") return;
    setStrikeprice(e.target.value);
    console.log(e.target.value);
  }
  return (
    <div className="text-center">
      {state && <h4>{"Expiry Date: " + state.PRICES.date}</h4>}
      <CFormSelect
        className="mb-2"
        onChange={changedata}
        aria-label="Default select example"
      >
        <option>Select Indices</option>
        <option>NIFTY</option>
        <option>BANKNIFTY</option>
        <option>FINNIFTY</option>
        <option>MIDCPNIFTY</option>
      </CFormSelect>
      {state && (
        <CFormSelect
          className="mb-2"
          onChange={changestrikeprice}
          aria-label="Default select example"
        >
          <option>Select Strike Price</option>
          {state.PRICES.strike_price.map((price) => (
            <option>{price}</option>
          ))}
        </CFormSelect>
      )}
      {state && (
        <CContainer className="text-center border border-dark">
          <CRow className="justify-content-center bg-success border border-dark">
            <CCol className="fw-bolder">Open Interest Upper Boundary</CCol>
            <CCol className="fw-bolder">Open Interest Lower Boundary</CCol>
          </CRow>
          <CRow className="align-items-center">
            <CCol>
              <CRow className="align-items-center border border-dark">
                <CCol className="fw-semibold">Strike Price 1</CCol>
                <CCol>{state.max_call_oi_sp}</CCol>
                <CCol className="fw-semibold">OI (in K)</CCol>
                <CCol>{state.max_call_oi}</CCol>
              </CRow>
            </CCol>
            <CCol>
              <CRow className="align-items-center border border-dark">
                <CCol className="fw-semibold">Strike Price 1</CCol>
                <CCol>{state.max_put_oi_sp}</CCol>
                <CCol className="fw-semibold">OI (in K)</CCol>
                <CCol>{state.max_put_oi}</CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow className="align-items-center">
            <CCol>
              <CRow className="align-items-center border border-dark">
                <CCol className="fw-semibold">Strike Price 2</CCol>
                <CCol>{state.max_call_oi_sp_2}</CCol>
                <CCol className="fw-semibold">OI (in K)</CCol>
                <CCol>{state.max_call_oi_2}</CCol>
              </CRow>
            </CCol>
            <CCol>
              <CRow className="align-items-center border border-dark">
                <CCol className="fw-semibold">Strike Price 2</CCol>
                <CCol>{state.max_put_oi_sp_2}</CCol>
                <CCol className="fw-semibold">OI (in K)</CCol>
                <CCol>{state.max_put_oi_2}</CCol>
              </CRow>
            </CCol>
          </CRow>

          {strikeprice && (
            <>
              <CRow className="align-items-center border border-dark">
                <CCol className="fw-semibold">Open Interest:</CCol>
                <CCol
                  className={
                    state.PRICES[strikeprice].open_interest
                      ? "bg-success"
                      : "bg-danger"
                  }
                >
                  {state.PRICES[strikeprice].open_interest
                    ? "Bullish"
                    : "Bearish"}
                </CCol>
                <CCol className="fw-semibold">PCR:</CCol>
                <CCol className={state.PCR >= 1 ? "bg-primarry" : "bg-danger"}>
                  {state.PCR}
                </CCol>
              </CRow>
              <CRow className="align-items-center border border-dark">
                <CCol className="fw-semibold">Call Writer Exits:</CCol>
                <CCol
                  className={
                    state.PRICES[strikeprice].call_writer_exits
                      ? "bg-success"
                      : "bg-danger"
                  }
                >
                  {state.PRICES[strikeprice].call_writer_exits ? "YES" : "NO"}
                </CCol>
                <CCol className="fw-semibold">PUT writer exit:</CCol>
                <CCol
                  className={
                    state.PRICES[strikeprice].put_writer_exit
                      ? "bg-danger"
                      : "bg-success"
                  }
                >
                  {state.PRICES[strikeprice].put_writer_exit ? "YES" : "NO"}
                </CCol>
              </CRow>
              <CRow className="align-items-center border border-dark">
                <CCol className="fw-semibold">OTM Calls Exits:</CCol>
                <CCol
                  className={
                    state.PRICES[strikeprice].call_itm
                      ? "bg-success"
                      : "bg-danger"
                  }
                >
                  {state.PRICES[strikeprice].call_itm ? "YES" : "NO"}
                </CCol>
                <CCol className="fw-semibold">Put ITM:</CCol>
                <CCol
                  className={
                    state.PRICES[strikeprice].put_itm
                      ? "bg-danger"
                      : "bg-success"
                  }
                >
                  {state.PRICES[strikeprice].put_itm ? "YES" : "NO"}
                </CCol>
              </CRow>
              <CRow className="align-items-center">
                <CCol
                  className={
                    state.PRICES[strikeprice].open_interest &&
                    state.PRICES[strikeprice].call_writer_exits
                      ? "fw-bolder m-2 bg-success"
                      : "bg-danger m-2 fw-bolder"
                  }
                >
                  {state.PRICES[strikeprice].open_interest &&
                  state.PRICES[strikeprice].call_writer_exits
                    ? "BUY"
                    : "SELL"}
                </CCol>
              </CRow>
            </>
          )}
        </CContainer>
      )}
    </div>
  );
}
