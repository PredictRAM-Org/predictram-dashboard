import { useState, useEffect } from "react";
import {
  CForm,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CFormInput,
  CCardTitle,
  CCardText,
} from "@coreui/react-pro";
import { useSelector, useDispatch } from "react-redux";
import { getEvent, getPrice } from "../../../../redux/action/useraction";
import { useParams } from "react-router-dom";
import { useMetaMask } from "metamask-react";
import abi from "../../../../web3/portfolio.json";
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

// import faker from "faker";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { getEventPrice } from "../../../../api/services/EventService";
import { getUserStocks } from "../../../../api/services/UserService";
import LoadingPage from "../../../../utils/LoadingPage";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
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

export default function TokenPurchase() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [VAR, setVAR] = useState("");
  const [currentPrice, setCurrentprice] = useState("");
  const [token, setToken] = useState(1);
  const { account, chainId } = useMetaMask();
  const [_loading, _setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let data = await getEventPrice(id);
      if (!data) return;
      setCurrentprice(data.currentprice);
    })();
    dispatch(getEvent(id));
    dispatch(getPrice());
  }, []);

  const event = useSelector((state) => state.event.event);
  const allPrices = useSelector((state) => state.price);

  useEffect(() => {
    (async () => {
      const userStocks = await getUserStocks(_setLoading);
      if (!userStocks) return;
      let totalvar = 0;
      if (!allPrices) {
        return;
      } else {
        userStocks.forEach((stock) => {
          let varvalue = (stock.totalinvested * stock.var) / 100;
          totalvar += varvalue;
        });
        setVAR(Math.round(totalvar));
      }
    })();
  }, []);

  useEffect(() => {
    if (!currentPrice && !VAR) return;
    const tokens = Math.round(Number(VAR) / Number(currentPrice));
    setToken(tokens);
  }, [currentPrice, VAR]);
  const buyHandler = async () => {
    console.log("buy");
    if (id === "6346fb57ccc6e4ccdf44c6d3") {
      console.log({ chainId });
      if (chainId === "0x18") {
        if (account) {
          console.log("inevent");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const timestamp = Math.floor(Date.now() / 1000);
          const contract = new ethers.Contract(
            "0x656CcCf2fc397976DA5Ba164cb59874b422674Fe",
            abi,
            signer
          );
          toast.loading("Processing...");
          try {
            const tx = await contract.buyPortfolioBuyer(
              [
                account,
                token * 1000,
                timestamp,
                token * 7900,
                "0x3adb78977d2d272b44b342b7938582e204237fe91b6cf569e345715627e3b0ff42e725860eb96805a2462b3489854e7e91033dffdb5352383346e7357f7a20b51b",
              ],
              { value: ethers.utils.parseEther(String(token * 79)) }
            );
            const receipt = await tx.wait();
            console.log(receipt);
            toast.dismiss();
            toast.success("Transaction Successful");
          } catch (e) {
            console.log(e);
            toast.dismiss();
            toast.error("Transaction failed");
            toast.error(e?.message);
          }
        } else {
          toast.error("Please connect your wallet");
        }
      } else {
        toast.error("Connect to kardia mainnet");
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x18" }],
          });
        } catch {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x18",
                rpcUrls: ["https://rpc.kardiachain.io"],
                chainName: "KardiaChain Mainnet",
                nativeCurrency: {
                  name: "KAI",
                  decimals: 18,
                  symbol: "KAI",
                },
              },
            ],
          });
        }
      }
    } else {
      toast.error("Token not available");
      toast.error(
        "Please buy the USA Fed Interest Rate Decision Nov 2022 token"
      );
    }
  };
  const date = new Date(event.enddate);
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
      {_loading && <LoadingPage />}
      {!_loading && (
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

            <CCard
              className={"shadow-none border-0 d-flex flex-row p-0"}
              style={{
                borderRadius: "0.625rem",
                gap: "0.9375rem",
                marginTop: "1.7rem",
                background: "transparent",
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
                <span>Amount you get (TOKEN)</span>
                <CFormInput
                  id="amountNum"
                  type="number"
                  placeholder="Enter total tokens"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
              <div className="d-flex flex-column" style={{ gap: "0.25rem" }}>
                <span>Amount you pay (INR)</span>
                <CFormInput
                  id="amountTotal"
                  type="number"
                  placeholder="Enter total amount"
                  value={VAR}
                  onChange={(e) => setVAR(e.target.value)}
                  disabled
                />
              </div>
              <CButton
                color="primary"
                onClick={buyHandler}
                style={{
                  marginTop: "1.25rem",
                  fontSize: "1.125rem",
                  textTransform: "uppercase",
                  height: "3rem",
                }}
              >
                BUY
              </CButton>
            </CForm>
          </CCardBody>
        </div>
      )}
    </div>
  );
}
