import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardHeader,
  FormLabel,
  Input,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import hedgeos from "../../../../assets/images/hedgeoslogo.jpeg";
import { useSelector } from "react-redux";
import StockSelect from "../../../inputs/SelectInputs/SelectWrapper/StockSelect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { CCard } from "@coreui/react";
import { toast } from "react-toastify";
import axios from "axios";
import { hadgeCompany } from "../../../../data";
import Loader from "../Loader";
import CustomTable from "../../../../utils/CustomTable";

export default function HedgeOs() {
  // const { email, secretToken } = useSelector((state) => state.user);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hagdeResult, setHadgeResult] = useState([]);

  const handelHedge = async (e) => {
    e.preventDefault();
    setHadgeResult([]);
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://hedgeos-fzfhabegevgdercr.z02.azurefd.net/v2/hedge",
        {
          tickers: stocks?.map((s) => s?.value),
        },
        // { headers: { username: email, token: secretToken } }
        {
          headers: {
            username: "prabal.chow09009.pc@gmail.com",
            token:
              "$2a$10$6fm2NMr6yEPGtNZOFdwb4eJkNGfuJpSD5xM2xWDMg3ms7DUWUNAeO",
          },
        }
      );
      setHadgeResult(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-2 text-center">
        <img
          style={{ height: "5rem", objectFit: "contain" }}
          src={hedgeos}
          alt="no data"
        />
      </div>

      <CCard style={{ padding: 10 }}>
        <form
          onSubmit={handelHedge}
          style={{ display: "flex", flexDirection: "column", gap: 5 }}
        >
          <FormLabel htmlFor="stock-select" sx={{ fontWeight: "bold" }}>
            Choose Stocks To Get Hedging and Best Performing Stocks
          </FormLabel>
          <StockSelect
            id="stock-select"
            value={stocks}
            options={hadgeCompany}
            setValue={setStocks}
            isMultiSelect
            noLabel
          />
          <Button type="submit" variant="contained" disabled={!stocks.length}>
            Submit
          </Button>
        </form>
      </CCard>

      <Stack gap={2} marginY={5}>
        {loading && <Loader />}
        {!loading &&
          hagdeResult?.map((info) => {
            return (
              <Card>
                <CardHeader
                  title={
                    <Typography fontSize={20} color="#3293F6" fontWeight="bold">
                      Best Hedging and Best Performing Stocks for{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {info?.stock_details["Stock Symbol"]}
                      </span>
                    </Typography>
                  }
                />

                <Stack gap={1} margin={2}>
                  {info?.best_hedging_stock ? (
                    <Alert severity="info" sx={{ fontSize: 15 }}>
                      Best Hedging Stock is{" "}
                      <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                        {info?.best_hedging_stock["Stock Symbol"]}
                      </span>
                    </Alert>
                  ) : (
                    <Alert severity="warning">
                      Sorry no hedging stock found
                    </Alert>
                  )}
                  {info?.best_performing_stock ? (
                    <Alert severity="info" sx={{ fontSize: 15 }}>
                      Best Performing Stock is{" "}
                      <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                        {info?.best_performing_stock["Stock Symbol"]}
                      </span>
                    </Alert>
                  ) : (
                    <Alert severity="warning">
                      Sorry no hedging stock found
                    </Alert>
                  )}
                  <Typography fontSize="18px" fontWeight="bold">
                    Missed Return is{" "}
                    <span style={{ color: "green" }}>
                      + {info?.missed_return} %
                    </span>
                  </Typography>

                  <CustomTable
                    maxHeight={500}
                    tableCellAlign="left"
                    tableHeadAlign="left"
                    columns={[
                      "Parameters",
                      info?.stock_details?.["Stock Symbol"],
                      info?.best_hedging_stock?.["Stock Symbol"] ?? "N/A",
                      info?.best_performing_stock?.["Stock Symbol"] ?? "N/A",
                    ].map((c) => ({ header: c, accessor: c }))}
                    data={Object.keys(info?.stock_details)?.map((key) => ({
                      Parameters: key,
                      [info?.stock_details?.["Stock Symbol"]]:
                        info?.stock_details?.[key] ?? "N/A",
                      [info?.best_hedging_stock?.["Stock Symbol"] ?? "N/A"]:
                        info?.best_hedging_stock?.[key] ?? "N/A",
                      [info?.best_performing_stock?.["Stock Symbol"] ?? "N/A"]:
                        info?.best_performing_stock?.[key] ?? "N/A",
                    }))}
                  />
                </Stack>
              </Card>
            );
          })}
      </Stack>
    </>
  );
}
