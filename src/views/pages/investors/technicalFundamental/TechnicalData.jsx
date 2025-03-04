import React, { useEffect, useState } from "react";
import { getTechnicalHourlyData } from "../../../../api/services/ScrapperService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CCardHeader, CCardText, CCardTitle } from "@coreui/react";
import Loader from "../../users/Loader";
import { toast } from "react-toastify";
import CustomScrapperTable from "../../../../utils/CustomScrapperTable";
import TabularNav from "../../../../components/TabularNav";
import VisualNoData from "../../../../utils/VisualNoData";

const options = [
  "Key Technical Indicators",
  "Key Overbought / Sold Oscillators",
  "Key Technicals with Overlay Bands",
  "Key Volume based Technicals",
];

function TechnicalData() {
  const { stock } = useParams();
  const { mobileNumber, secretToken } = useSelector((state) => state.investor);
  const [technicalHourlyData, settechnicalHourlyDta] = useState({});
  const [loading, setLoading] = useState(false);
  const [viewState, setViewState] = useState(0);
  const { _id: userId } = useSelector((state) => state.investor);

  const handleViewState = (state) => {
    setViewState(state);
  };

  const deleteObjProperty = (data, deleteProperty) => {
    Object.keys(data).map((key) => {
      if (Array.isArray(data[key]))
        data[key].map((obj) => {
          deleteProperty.map((d) => {
            delete obj[d];
          });
        });
    });
  };

  const fetchtechnicalHourlyData = async () => {
    const {
      data: [data],
    } = await getTechnicalHourlyData(
      setLoading,
      { symbols: stock },
      { mobileNumber, secretToken },
      userId ? "investor" : "advisor"
    );
    console.log(data);
    if (!data) {
      toast.error("Sorry No technicalHourly Data Present");
    }
    deleteObjProperty(data, ["Strength", "Chart"]);
    settechnicalHourlyDta(data || {});
  };
  useEffect(() => {
    fetchtechnicalHourlyData();
  }, []);
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
          {stock} Technical Details
          {!loading && (
            <CCardText
              className="m-0 mt-2"
              style={{
                fontWeight: 500,
                color: "#AFAFB6",
                textAlign: "center",
                fontSize: "1.75rem",
              }}
            >
              {technicalHourlyData?.label}
            </CCardText>
          )}
        </CCardTitle>
      </CCardHeader>
      {loading && <Loader />}
      {!loading && Object.keys(technicalHourlyData).length === 0 && (
        <VisualNoData message="No data found for this stock" />
      )}
      {!loading && Object.keys(technicalHourlyData).length !== 0 && (
        <div>
          <TabularNav
            options={options}
            state={viewState}
            handleState={handleViewState}
          />
          {viewState === 0 && (
            <CustomScrapperTable
              column={technicalHourlyData?.Technical_Indicator[0]}
              data={technicalHourlyData?.Technical_Indicator}
            />
          )}
          {viewState === 1 && (
            <CustomScrapperTable
              column={technicalHourlyData?.Overbought_Sold_Oscillators[0]}
              data={technicalHourlyData?.Overbought_Sold_Oscillators}
            />
          )}
          {viewState === 2 && (
            <CustomScrapperTable
              column={technicalHourlyData?.Technicals_with_Overlay_Bands[0]}
              data={technicalHourlyData?.Technicals_with_Overlay_Bands}
            />
          )}
          {viewState === 3 && (
            <CustomScrapperTable
              column={technicalHourlyData?.Volume_based_Technicals[0]}
              data={technicalHourlyData?.Volume_based_Technicals}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default TechnicalData;
