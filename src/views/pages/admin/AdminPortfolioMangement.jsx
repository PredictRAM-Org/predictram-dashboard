import React, { useEffect, useState } from "react";
import { getPortfolioManagementEvent } from "../../../api/services/PortfolioMangementService";
import { toast } from "react-toastify";
import AdminEventsCard from "../../../components/AdminEventsCard";
import AdminPortfolioCard from "../../../components/AdminPortfolioCard";
import { CRow, CSpinner } from "@coreui/react";

function AdminPortfolioMangement() {
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState();
  const [portfolioManagement, setPortfolioManagement] = useState([]);
  const getPortfolioEvents = async () => {
    try {
      const { data } = await getPortfolioManagementEvent(setLoading);
      setPortfolioManagement(data);
      setHasData(data.length);
    } catch (error) {
      toast.error("Unable to get data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPortfolioEvents();
  }, []);
  if (loading) return <CSpinner color="primary" />;
  else
    return (
      <CRow className="justify-content-center" xs={{ cols: "auto" }}>
        {portfolioManagement.map((portfolio, idx) => (
          <AdminPortfolioCard
            key={idx}
            title={portfolio.title}
            portfolioRisk={portfolio.portfolioRisk}
            idealRisk={portfolio.idealRisk}
            enddate={portfolio.endDate}
            portfolioId={portfolio._id}
          />
        ))}
      </CRow>
    );
}

export default AdminPortfolioMangement;
