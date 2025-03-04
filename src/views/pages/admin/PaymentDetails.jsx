import React, { useState } from "react";
import { Card, Container } from "@mui/material";
import Loader from "../users/Loader";
import VisualNoData from "../../../utils/VisualNoData";
import { CSmartTable } from "@coreui/react-pro";
import { getPaymentDetails } from "../../../api/services/PaymentService";
import { useQuery } from "@tanstack/react-query";

function PaymentDetails() {
  const [loading, setLoading] = useState(false);

  const tableConfig = [
    { key: "uniqueId", label: "Unique ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "premiumUser", label: "Premium User" },
    {
      key: "triedFreePremium",
      label: "Tried Free Premium",
    },
  ];

  const { data: { paymentDetails } = {}, isLoading } = useQuery({
    queryKey: "paymentDetails",
    queryFn: async () => {
      const { data: paymentDetails } = await getPaymentDetails(setLoading);
      return { paymentDetails };
    },
    staleTime: 60000 * 2,
  });

  return (
    <Container>
      <Card>
        {isLoading && <Loader />}
        {!isLoading && paymentDetails.length > 0 && (
          <div style={{ overflow: "auto" }}>
            <CSmartTable
              className="shadow-none border border-light flex-wrap"
              style={{ padding: "10px", backgroundColor: "white" }}
              activePage={1}
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
                _style: { width: "20%" },
              }))}
              items={paymentDetails}
              itemsPerPageSelect
              itemsPerPage={5}
              pagination={{ size: "sm" }}
              sorterValue={{ column: "firstName", state: "asc" }}
              tableFilter
            />
          </div>
        )}
        {!isLoading && !paymentDetails.length && (
          <VisualNoData
            imageHight={200}
            imageWidth={200}
            message="No Payment details found"
          />
        )}
      </Card>
    </Container>
  );
}

export default PaymentDetails;
