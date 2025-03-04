import { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CCardSubtitle,
  CButton,
  CAvatar,
  CCardText,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import parse from "html-react-parser";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deltePortfolioManagementReport,
  getPortfolioManagementReport,
} from "../../../api/services/PortfolioMangementService";
import Loader from "../users/Loader";
import VisualNoData from "../../../utils/VisualNoData";
import useQuery from "../../../customHooks/useQuery";

export default function ViewPortfolioReport() {
  const { eventId } = useParams();
  const [{ author }] = useQuery();
  const userId = useSelector((state) => state.user.id);
  const admin = useSelector((state) => state.user.admin);
  const history = useHistory();
  const [report, setReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const deleteReport = async () => {
    const { statusCode } = await deltePortfolioManagementReport(setLoading, {
      event: eventId,
      userId: author ?? userId,
    });

    if (statusCode === 200) {
      history.push(`/portfolio/management/${eventId}`);
    }
  };

  const getUserPortfolioReport = async () => {
    const params = { event: eventId, userId: author ?? userId };
    const { data = {} } = await getPortfolioManagementReport(
      setLoading,
      params
    );
    setReport(data);
  };

  useEffect(() => {
    getUserPortfolioReport();
    window.scrollTo(0, 0);
  }, [eventId]);

  const handleModalOpen = () => {
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  return (
    <>
      <CModal
        backdrop={true}
        alignment="center"
        visible={visible}
        onClose={handleModalClose}
      >
        <CModalHeader closeButton={false} onClose={handleModalClose}>
          <CModalTitle>Delete paper</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete the paper?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleModalClose}>
            No
          </CButton>
          <CButton color="danger" onClick={deleteReport}>
            Yes
          </CButton>
        </CModalFooter>
      </CModal>
      {!Object.keys(report).length && <VisualNoData />}
      {Object.keys(report).length && (
        <CCard
          style={{
            boxShadow: "none",
          }}
        >
          <CCardHeader
            className="d-flex flex-column align-items-center p-0"
            style={{
              background: "none",
              gap: "0.5rem",
              maxWidth: "44rem",
              margin: "0 auto",
              marginTop: "3.5rem",
              marginBottom: "2rem",
              border: "none",
            }}
          >
            <CCardTitle
              className="p-0 m-0"
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "#252525",
                textAlign: "center",
              }}
            >
              {report.title}
            </CCardTitle>

            <CCardText
              className="m-0"
              style={{
                fontWeight: 500,
                color: "#AFAFB6",
                textAlign: "center",
                fontSize: "1.75rem",
              }}
            >
              {report.subtitle}
            </CCardText>

            <div
              className="d-flex flex-row align-items-center"
              style={{
                gap: "0.5rem",
              }}
            >
              <CAvatar
                src={
                  report?.userId?.image ??
                  "https://picsum.photos/200?random=" + Math.random()
                }
                style={{
                  width: "2rem",
                  height: "2rem",
                }}
              />
              <CCardSubtitle
                className="text-medium-emphasis"
                style={{
                  color: "#252525",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                }}
              >
                {report.userId && (
                  <Link
                    className="text-black text-decoration-none"
                    to={`/profile/${report.userId._id}`}
                  >
                    {report.userId.name}
                  </Link>
                )}
              </CCardSubtitle>
            </div>
          </CCardHeader>

          <CCardBody
            className="paper_content"
            style={{
              maxWidth: "70vw",
              margin: "0 auto",
              padding: "0 2em",
            }}
          >
            {loading && <Loader />}
            {!loading && <>{report.data ? parse(report.data) : null}</>}
          </CCardBody>
          <CRow className="text-center">
            <CCol md={12}>
              {(!!admin || userId === report.userId?._id) && (
                <CButton
                  color="danger"
                  className="fs-5 mt-4 mx-auto text-white w-100 mb-5"
                  onClick={handleModalOpen}
                  style={{
                    maxWidth: "44rem",
                    boxShadow: "none",
                  }}
                >
                  Delete Paper
                </CButton>
              )}
            </CCol>
          </CRow>
        </CCard>
      )}
    </>
  );
}
