import { useEffect, useState } from "react";
import { CContainer, CPagination, CPaginationItem } from "@coreui/react";
import { post } from "axios";
import { toast } from "react-toastify";
import EventFilter from "./EventFilter";
import Loader from "../Loader";
import NoData from "../../../../utils/NoData";
import VisualNoData from "../../../../utils/VisualNoData";
import { Link, useHistory } from "react-router-dom";
import { etfGet } from "../../../../api/services/EtfService";

import { useSelector } from "react-redux";

const ROWS_PER_PAGE = 20;

export default function ViewETF() {
  const premiumUser = useSelector((state) => state.user.premiumUser);
  const history = useHistory();
  const [etfs, setEtfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const investorAuth = useSelector((state) => state.investor.authenticated);

  const getETf = async () => {
    const etfData = await etfGet(setLoading);
    setEtfs(etfData);
  };

  useEffect(() => {
    getETf();
  }, []);

  const redirectToBuyETF = (id) => {
    if (!etfs.length) return;
    if (investorAuth) {
      history.push({
        pathname: "/investor/etf/buy",
        search: `?id=${id}`,
      });
      return;
    }
    if (!premiumUser)
      return toast.error(
        "You need to pay in order to view details and buy etfs",
        {
          toastId: id,
        }
      );
    history.push({
      pathname: "/etf/buy",
      search: `?id=${id}`,
    });
  };

  return (
    <CContainer
      fluid
      className="mb-5"
      style={{
        maxWidth: "68.75rem",
      }}
    >
      <div
        className="position-relative mx-auto mb-3 px-2 d-flex align-items-center justify-content-center"
        style={{ width: "fit-content" }}
      >
        <h1 className="text-center m-0">ETF</h1>
      </div>
      <div>
        <EventFilter
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          setParams={setParams}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {loading && <Loader />}
      {!etfs.length && <VisualNoData />}
      {!loading && !!etfs.length && (
        <>
          <table
            className="table customTable w-100"
            style={{ fontSize: "14px" }}
          >
            <colgroup>
              <col span="1" style={{ width: "32%" }} />
              <col span="1" style={{ width: "18%" }} />
              <col span="1" style={{ width: "15%" }} />
              <col span="1" style={{ width: "15%" }} />
              <col span="1" style={{ width: "12%" }} />
              <col span="1" style={{ width: "8%" }} />
            </colgroup>
            <thead>
              <tr>
                <th className="text-truncate">Name</th>
                <th className="text-truncate">Minted value</th>
                <th className="text-truncate">Current value</th>
                <th className="text-truncate">Ends in</th>
                <th className="text-truncate"></th>
              </tr>
            </thead>
            {etfs.length > 0 ? (
              <tbody>
                {etfs
                  .slice(
                    currentPage * ROWS_PER_PAGE,
                    (currentPage + 1) * ROWS_PER_PAGE
                  )
                  .map((etf, idx) => (
                    <tr key={idx}>
                      <td
                        scope="row"
                        style={{
                          width: "50%",
                        }}
                      >
                        <div
                          className="d-flex align-items-center"
                          style={{
                            gap: "0.5rem",
                          }}
                        >
                          <p className="text-truncate m-0">{etf.title}</p>
                        </div>
                      </td>
                      <td className="text-truncate">{etf.createdPrice}</td>
                      <td className="text-truncate">{etf.currentPrice}</td>
                      <td
                        className={
                          "text-truncate" +
                          (new Date(etf.endDate).getTime() < Date.now()
                            ? " text-danger"
                            : "")
                        }
                      >
                        {new Date(etf.endDate).toLocaleDateString()}
                      </td>
                      <td
                        className="text-truncate d-flex align-items-end justify-content-end"
                        style={{
                          gap: "0.5rem",
                        }}
                      >
                        <div
                          onClick={() => redirectToBuyETF(etf.eventId)}
                          style={{
                            padding: "0.3125rem 0.625rem",
                            borderRadius: "999px",
                            backgroundColor: "#F5F8FF",
                            color: "#10398E",
                            outline: "1px solid #10398E",
                            cursor: "pointer",
                          }}
                        >
                          {"+"}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              <></>
            )}
          </table>
          <CPagination
            aria-label="Page navigation example"
            style={{
              margin: "0 auto",
              width: "fit-content",
              marginTop: "2rem",
            }}
          >
            <CPaginationItem
              aria-label="Previous"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{ cursor: "pointer" }}
            >
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            {new Array(Math.ceil(etfs.length / ROWS_PER_PAGE))
              .fill(0)
              .map((_, idx) => (
                <CPaginationItem
                  key={idx}
                  active={idx === currentPage}
                  onClick={() => setCurrentPage(idx)}
                  style={{ cursor: "pointer" }}
                >
                  {idx + 1}
                </CPaginationItem>
              ))}
            <CPaginationItem
              aria-label="Next"
              disabled={
                currentPage === Math.ceil(etfs.length / ROWS_PER_PAGE) - 1
              }
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ cursor: "pointer" }}
            >
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </>
      )}
    </CContainer>
  );
}
