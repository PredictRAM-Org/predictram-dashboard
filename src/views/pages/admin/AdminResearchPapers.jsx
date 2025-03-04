import { CCol, CContainer, CRow } from "@coreui/react";
import { CSmartPagination } from "@coreui/react-pro";
import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getResearchPapers } from "../../../api/services/ResearchPaperService";
import VisualNoData from "../../../utils/VisualNoData";
import Loader from "../../pages/users/Loader";
import AdminResearchCard from "../users/research/AdminResearchCard";

function AdminResearchPapers() {
  const [papers, setPapers] = useState([]);
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  const getNonPublishedPaper = async () => {
    const data = await getResearchPapers(setLoading, {
      count,
      isVerified: false,
    });
    setTotal(Math.trunc(data?.totalPaper / 20) + 1);
    setPapers(data.data);
  };

  useEffect(() => {
    getNonPublishedPaper();
  }, [count]);

  return (
    <CContainer fluid>
      <div
        className="mx-auto mb-2 px-2 d-flex align-items-center justify-content-center"
        style={{ width: "fit-content" }}
      >
        <h1 className="text-center m-0">Non-Published Research Papers</h1>
      </div>
      <Divider />

      {loading && <Loader />}
      {!loading && (
        <>
          <CRow className="g-3" xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
            {papers.length === 0 && <VisualNoData />}
            {papers.map((item, idx) => {
              return (
                <CCol xs>
                  <AdminResearchCard
                    data={item}
                    setLoading={setLoading}
                    refresh={getNonPublishedPaper}
                  />
                </CCol>
              );
            })}
          </CRow>
          <CSmartPagination
            align="center"
            activePage={count}
            pages={total}
            onActivePageChange={setCount}
          />
        </>
      )}
    </CContainer>
  );
}

export default AdminResearchPapers;
