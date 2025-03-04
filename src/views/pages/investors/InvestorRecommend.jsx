import { CCard, CCardBody, CCardTitle, CCol, CRow } from "@coreui/react";
import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import {
  getSectorRecommendation,
  getStockRecommendation,
} from "../../../api/services/RecommendationService";
import Loader from "../users/Loader";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useQuery } from "@tanstack/react-query";

function InvestorRecommend() {
  const [loading, setLoading] = useState(false);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");

  const { data: { topSectors, topStocks } = {}, isLoading } = useQuery({
    queryKey: "investorRecomendation",
    queryFn: async () => {
      const { data: sector } = await getSectorRecommendation(setLoading, {
        secretToken,
        mobileNumber,
      });
      const { data: stock } = await getStockRecommendation(setLoading, {
        secretToken,
        mobileNumber,
      });

      return { topStocks: stock, topSectors: sector };
    },
    enabled: !!mobileNumber && !!mobileNumber,
    staleTime: 60000 * 2,
  });

  return (
    <>
      {topSectors?.length > 0 && topStocks.length > 0 ? (
        <RecommendationWidget />
      ) : (
        <></>
      )}
    </>
  );

  function RecommendationWidget() {
    return (
      <CCard
        className={"pb-0 shadow-none border border-light card-dashboard mt-3"}
      >
        <CCardTitle className="text-2">PredictRAM Analytics</CCardTitle>
        <CCardBody className="p-4">
          {!isLoading && (
            <CRow>
              <CCol>
                <div className="text-2">Sectors In News For This Week</div>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  aria-label="contacts"
                >
                  {topSectors?.map((sector, index) => {
                    return (
                      <ListItem disablePadding key={index}>
                        <ListItemButton>
                          <ListItemIcon>
                            <ShowChartIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <div className="fw-bold">
                                {sector?.sector || ""}
                              </div>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </CCol>
              <CCol>
                <div className="text-2">Stocks In News For This Week</div>
                <div>
                  {topStocks.map((event, index) => {
                    return (
                      <Stack
                        key={index}
                        useFlexGap
                        direction="row"
                        mt={2}
                        gap={1}
                        flexWrap="wrap"
                      >
                        {event?.topstocks?.map((stock, index) => (
                          <Chip
                            label={stock?.symbol}
                            color="primary"
                            key={index}
                          />
                        ))}
                      </Stack>
                    );
                  })}
                </div>
              </CCol>
            </CRow>
          )}
          {isLoading && <Loader />}
        </CCardBody>
      </CCard>
    );
  }
}

export default InvestorRecommend;
