import { cilTag, cilArrowCircleRight } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { toast } from "react-toastify";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CContainer,
  CCardTitle,
  CListGroupItem,
} from "@coreui/react";
import Researchcard from "../../../components/Researchcard";
import Eventcard from "../../../components/Eventcard";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get, post } from "axios";
import Loader from "./Loader";
import { cisReload } from "@coreui/icons-pro";
import NoData from "../../../utils/NoData";

function Tag() {
  const tagname = useParams().id;
  const [loading, setLoading] = useState(true);
  const [followlist, setFollowlist] = useState([]);
  const [loader, setLoader] = useState(false);
  const [papers, setPapers] = useState([]);
  const [events, setEvents] = useState([]);
  const [price, setPrice] = useState([]);

  const handelFollow = async (tag) => {
    setLoader(true);
    await post("/api/users/followtag", { tag });
    toast.success(`${tag} tag followed`);
    setLoader(false);
  };
  const handelunFollow = async (tag) => {
    setLoader(true);
    await post("/api/users/unfollowtag", { tag });
    toast.success(`${tag} tag unfollowed`);
    setLoader(false);
  };

  useEffect(() => {
    (async () => {
      const { data } = await get(`/api/users/getprofile`);
      setFollowlist(data.profile.followedTags);
    })();
    (async () => {
      const { data } = await post(`/api/users/gettagedresearch`, {
        tag: tagname,
      });
      setPapers(data);
    })();
    (async () => {
      const { data } = await post(`/api/users/gettagedevents`, {
        tag: tagname,
      });
      console.log(data);
      setEvents(data);
    })();
    (async () => {
      const { data } = await get("/api/users/getPrice");
      setPrice(data);
      setLoading(false);
    })();
  }, [loading, loader]);

  return (
    <CContainer fluid>
      {loading && <Loader />}
      {!loading && (
        <div>
          <div className="d-flex align-items-center gap-3 text-black text-decoration-none">
            <CIcon icon={cilTag} className="mb-2" size="xxl"></CIcon>
            <h1 className="fw-semibold">{tagname}</h1>
          </div>
          <div
            onClick={() => {
              followlist.includes(tagname)
                ? handelunFollow(tagname)
                : handelFollow(tagname);
            }}
          >
            <span
              style={{
                padding: "0 1rem 0 1rem",
                borderRadius: "999px",
                backgroundColor: "white",
                color: "blue",
                outline: "1px solid #F88700",
                cursor: "pointer",
              }}
            >
              {!loader ? (
                followlist.includes(tagname) ? (
                  "unfollow"
                ) : (
                  "follow"
                )
              ) : (
                <CIcon icon={cisReload}></CIcon>
              )}
            </span>
          </div>
          <CRow
            xs={{ cols: 1 }}
            sm={{ cols: 1 }}
            md={{ cols: 2 }}
            className=" mt-3"
          >
            <CCol>
              <CCard>
                <CCardBody>
                  <CCardTitle className="fw-semibold">
                    Research Page based on {tagname} Tag
                  </CCardTitle>
                  <hr />
                  {papers.length === 0 && <NoData />}
                  {papers.length > 0 && (
                    <>
                      {papers.map((paper, idx) => (
                        <Researchcard paper={paper} idx={idx} />
                      ))}
                    </>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardBody>
                  <CCardTitle className="fw-semibold">
                    Events based on {tagname} Tag
                  </CCardTitle>
                  <hr />
                  {events.length === 0 && <NoData />}
                  {events.length > 0 && (
                    <>
                      {events.map((event, idx) => (
                        <Eventcard event={event} idx={idx} price={price} />
                      ))}
                    </>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      )}
    </CContainer>
  );
}

export default Tag;
