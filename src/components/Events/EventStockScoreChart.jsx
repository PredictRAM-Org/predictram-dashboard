import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { convertXlsxURLToJson } from "../FileUploader/xlsxTOJson";
import Loader from "../../views/pages/users/Loader";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import Select from "react-select";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import makeAnimated from "react-select/animated";
import { CCard } from "@coreui/react";

const customStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "0.625rem",
    padding: "0.25rem 0.125rem",
    fontWeight: "500",
    color: "#14151F",
    borderColor: "#AFAFB6",
    boxShadow: "none",
  }),
};

function EventStockScoreChart({ futureStocks, name }) {
  const animatedComponents = makeAnimated();
  const [scoreData, setScoreData] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  function excelDateToJSDate(serial) {
    var baseDate = new Date(1899, 11, 30);
    baseDate.setDate(baseDate.getDate() + serial);

    // Convert to the format 'MM-DD-YYYY HH:MM:SS'
    var month = String(baseDate.getMonth() + 1).padStart(2, "0");
    var day = String(baseDate.getDate()).padStart(2, "0");
    var year = baseDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const createGraphData = (data, items) => {
    setSelectedStocks(items);
    const dates = Array.from(new Set(data?.map((d) => d["Date"]))).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    setLabels(dates?.map((d) => excelDateToJSDate(d)));

    const finalData = items?.map((item, index) => {
      const filterStocks = data?.filter((d) => d["Company Name"] === item);

      const columnData = {
        name: "Event Rate",
        type: "line",
        data: [],
      };
      const lineData = { name: `${item} (Change %)`, type: "column", data: [] };
      dates?.map((date) => {
        const stock = filterStocks?.find((d) => d["Date"] === date);
        lineData.data.push(stock?.["Change (%)"]);

        if (index === 0) columnData.data.push(stock?.["Event Rate"] || null);
      });
      if (index === 0) return [lineData, columnData];
      return lineData;
    });

    setSeries(finalData.flat(Infinity));
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (futureStocks) {
          const data = await convertXlsxURLToJson(futureStocks);
          const allStocks = Array.from(
            new Set(data?.map((d) => d["Company Name"]))
          );

          setStocks(allStocks);
          setScoreData(data);
          createGraphData(data, allStocks?.slice(0, 2));
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [futureStocks]);

  // console.log(scoreData);

  if (loading) return <Loader />;
  if (series.length > 0 && labels.length > 0)
    return (
      <CCard>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {name || "Event Chart"}
          </Typography>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            placeholder="Select Stocks"
            value={selectedStocks?.map((s) => ({ label: s, value: s }))}
            options={stocks?.map((s) => ({ label: s, value: s }))}
            styles={customStyles}
            onChange={(e) => {
              if (e.length === 0) {
                toast.warning("Altest 1 Stock has to be present");
                return;
              }
              createGraphData(
                scoreData,
                e?.map((v) => v.value)
              );
            }}
          />
          <ReactApexChart
            options={{
              chart: {
                height: 350,
                type: "line",
                stacked: false,
              },
              plotOptions: {
                bar: {
                  columnWidth: "50%",
                },
              },
              labels: labels,
              tooltip: {
                followCursor: true,
                intersect: false,
                shared: true,
              },
              dataLabels: {
                background: {
                  enabled: true,
                },
                formatter(val, opts) {
                  const seriesName =
                    opts.w.config.series[opts.seriesIndex].name;
                  return val !== null ? seriesName : "";
                },
              },
              yaxis: {
                show: true,
                labels: {
                  show: true,
                },
              },
              xaxis: {
                type: "category",
              },

              legend: {
                show: true,
                position: "bottom",
                horizontalAlign: "left",
                onItemClick: { toggleDataSeries: false },
              },
              stroke: {
                curve: "smooth",
              },
            }}
            series={series}
          />
        </CardContent>
      </CCard>
    );
}

export default EventStockScoreChart;
