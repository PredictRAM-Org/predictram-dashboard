import React, { useEffect, useState } from "react";
import { getBondQnA } from "../../../api/services/BondQnAService";
import { Card, Container } from "@mui/material";
import Loader from "../users/Loader";
import VisualNoData from "../../../utils/VisualNoData";
import { CSmartTable } from "@coreui/react-pro";

function BondQnA() {
  const [qnaRes, setQNARes] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableConfig = [
    { key: "name", label: "Name" },
    { key: "investor_type", label: "Investor Type" },
    { key: "email", label: "Email" },
    { key: "contact_number", label: "Contact Number" },
    { key: "asset_class", label: "Asset Class" },
    { key: "sectors_interest", label: "Sectors of Interest" },
    { key: "investment_amount", label: "Investment Amount" },
    { key: "investment_duration", label: "Investment Duration" },
  ];

  useEffect(() => {
    (async () => {
      const { data } = await getBondQnA(setLoading);

      setQNARes(data);
    })();
  }, []);

  return (
    <Container>
      <Card>
        {loading && <Loader />}
        {!loading && qnaRes.length > 0 && (
          <div style={{ overflow: "auto" }}>
            <CSmartTable
              className="shadow-none border border-light flex-wrap"
              style={{ padding: "10px", backgroundColor: "white" }}
              activePage={3}
              cleaner
              clickableRows
              columnFilter
              columnSorter
              columns={tableConfig?.map((config) => ({
                ...config,
                sorter: true,
                filter: true,
                _props: {
                  color: "primary",
                  className: "fw-semibold",
                },
                _style: { width: "25%" },
              }))}
              items={qnaRes}
              itemsPerPageSelect
              itemsPerPage={5}
              pagination={{ size: "sm" }}
              sorterValue={{ column: "name", state: "asc" }}
              tableFilter
            />
          </div>
        )}
        {!loading && !qnaRes.length && (
          <VisualNoData
            imageHight={200}
            imageWidth={200}
            message="No Bond Questionnaire Response Found"
          />
        )}
      </Card>
    </Container>
  );
}

export default BondQnA;
