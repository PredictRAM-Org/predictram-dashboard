import { useState, useEffect } from "react";
import {
  CForm,
  CButton,
  CCardHeader,
  CCardBody,
  CFormInput,
  CCardTitle,
  CCardText,
} from "@coreui/react-pro";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import LoadingPage from "../../../../utils/LoadingPage";
import useQuery from "../../../../customHooks/useQuery";
import { etfGet } from "../../../../api/services/EtfService";
import { getFutureDateFromDate } from "../../../../utils/DateTimeService";
import VisualNoData from "../../../../utils/VisualNoData";
import {
  fyersFunds,
  fyersPlaceMultiOrder,
} from "../../../../api/services/FyersService";
import {
  fyers_access_token_key,
  fyers_refresh_token_key,
  loginwithFyersRefreshToken,
} from "../../../../utils/custom/fyersLogin";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Historical data",
    },
  },
};

const TEMP_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const TEMP_DATA = {
  labels: TEMP_LABELS,
  datasets: [
    {
      label: "Prices",
      data: TEMP_LABELS.map(
        () => Math.random() * (Math.floor(Math.random() * 100) + 1)
      ),
      borderColor: "#222C65",
    },
  ],
};

function EtfPurchase() {
  const event = useSelector((state) => state.event.event);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const fyers_access_token = localStorage.getItem(fyers_access_token_key);
  const fyers_refresh_token = localStorage.getItem(fyers_refresh_token_key);
  const { _id: investorId } = useSelector((state) => state.investor);
  const [{ id }] = useQuery();
  const [etfDetails, setEtfDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fyersLoading, setFyersLoading] = useState(false);
  const [totalfund, setTotalfund] = useState(0);
  const { _id: userId } = useSelector((state) => state.investor);

  useEffect(() => {
    if (!id) return;
    getEtf();
  }, [id]);

  const getEtf = async () => {
    const etfData = await etfGet(
      setLoading,
      id,
      { secretToken, mobileNumber },
      investorId ? "investor" : "advisor"
    );
    if (fyers_access_token && fyers_refresh_token) {
      const data = await fyersFunds(setFyersLoading, fyers_access_token);
      if (data?.expired) {
        loginwithFyersRefreshToken(fyers_refresh_token, setFyersLoading);
      }
      setTotalfund(data.fund);
    }
    setEtfDetails(etfData);
  };

  const buyETF = async () => {
    const etfPrice = etfDetails[0]?.currentPrice;
    if (!(fyers_access_token && fyers_refresh_token))
      return toast.error("You need to connect to A broker");
    if (totalfund < etfPrice) return toast.error("Insufficient Balance");
    Swal.fire({
      title: `Do you want to Buy this etf ?`,
      text: `Total price = ${etfPrice}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const stocks = etfDetails[0]?.stocks.map((stock) => `NSE:${stock}-EQ`);
        await fyersPlaceMultiOrder(
          setFyersLoading,
          stocks,
          fyers_access_token,
          userId,
          etfPrice
        );
      }
    });
  };

  return (
    <div
      style={{
        marginBottom: "3rem",
      }}
    >
      <CCardHeader className="mt-3">
        {!!etfDetails.length && (
          <>
            <CCardTitle
              className="p-0 m-0"
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "#252525",
                textAlign: "center",
              }}
            >
              {etfDetails[0].title}
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
              End date {new Date(etfDetails[0].endDate).toLocaleDateString()}
            </CCardText>
          </>
        )}
      </CCardHeader>
      {loading && <LoadingPage />}
      {!etfDetails.length && <VisualNoData />}
      {!loading && !!etfDetails.length && (
        <div
          className="d-flex"
          style={{
            gap: "2rem",
            width: "100%",
            maxWidth: "69rem",
            margin: "0 auto",
          }}
        >
          <CCardBody
            style={{
              maxWidth: "44rem",
              boxShadow: "none",
              marginTop: "5rem",
            }}
          >
            <Line options={options} data={TEMP_DATA} />

            <p
              style={{
                textAlign: "justify",
                letterSpacing: "-0.04em",
                marginTop: "3rem",
              }}
            >
              {event.details}
            </p>
          </CCardBody>
          <CCardBody
            style={{
              maxWidth: "23rem",
              boxShadow: "none",
              marginTop: "5rem",
            }}
          >
            <CForm
              className="d-flex flex-column"
              style={{
                gap: "1rem",
              }}
            >
              <h2>Buy</h2>
              <div className="d-flex flex-column" style={{ gap: "0.25rem" }}>
                <span>Current Market Value of ETF (INR)</span>
                <CFormInput
                  id="amountTotal"
                  type="number"
                  placeholder="Enter total amount"
                  value={etfDetails[0].currentPrice}
                  disabled
                />
                {fyers_access_token && fyers_refresh_token && (
                  <p className="text-muted">Your balance is {totalfund}</p>
                )}
              </div>
              <CButton
                color="primary"
                onClick={buyETF}
                style={{
                  marginTop: "1.25rem",
                  fontSize: "1.125rem",
                  textTransform: "uppercase",
                  height: "3rem",
                }}
              >
                Buy Now
              </CButton>
            </CForm>
          </CCardBody>
        </div>
      )}
    </div>
  );
}

export default EtfPurchase;
