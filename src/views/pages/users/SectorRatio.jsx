import {
  CCard,
  CCardBody,
  CCardTitle,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import {
  getAllSectors,
  getSectorRatio,
} from "../../../api/services/SectorRatioService";
import Loader from "./Loader";
import { Typography } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Select from "react-select";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function SectorRatio() {
  const [allsector, setAllSector] = useState([]);
  const [ratioData, setRatioData] = useState({});
  const [loading, setLoading] = useState(false);
  const getAllSector = async () => {
    const { data } = await getAllSectors(setLoading);
    setAllSector(data);
    getSectorRatioData({ value: data[0]?._id });
  };
  const getSectorRatioData = async (e) => {
    const { data } = await getSectorRatio(setLoading, { id: e.value });
    setRatioData(data);
  };

  useEffect(() => {
    getAllSector();
  }, []);

  return (
    <CCard
      className={"pb-0 shadow-none border border-light"}
      style={{ borderRadius: "0.625rem", padding: "1.25rem" }}
    >
      <CCardTitle>
        <div>Industry Specific Ratio</div>
      </CCardTitle>

      <CCardBody>
        <CFormLabel className="mt-2">Choose Industry</CFormLabel>
        <Select
          defaultValue={{
            value: "Manufacturing Industry",
            label: "Manufacturing Industry",
          }}
          options={allsector?.map((obj) => {
            return { value: obj?._id, label: obj?.sector };
          })}
          onChange={getSectorRatioData}
          classNamePrefix="select"
        />

        {ratioData?.ratio?.length != 0 && !loading && (
          <div className="mt-3">
            {ratioData?.ratio?.map((ratio, idx) => {
              return (
                <Accordion key={idx}>
                  <AccordionSummary
                    aria-controls={`panel${ratio.ratioName}a-content`}
                    id={`panel${ratio.ratioName}a-header`}
                  >
                    <Typography>{ratio.ratioName}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{ratio.ratioDesc}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        )}
        {loading && <Loader />}
      </CCardBody>
    </CCard>
  );
}

export default SectorRatio;
