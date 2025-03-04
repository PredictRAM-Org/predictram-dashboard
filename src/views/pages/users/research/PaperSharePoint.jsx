import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from "@coreui/react";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getPointByLinkedinShareLink } from "../../../../api/services/ResearchPaperService";
import { CLoadingButton } from "@coreui/react-pro";

function PaperSharePoint() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrapData, setScrapData] = useState({});

  function isLinkedInLink(url) {
    const regex = /^https:\/\/www\.linkedin\.com\/.*$/;
    return regex.test(url);
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!isLinkedInLink(link) && link !== "") {
      return toast.error("Link is not valid");
    }
    const { data } = await getPointByLinkedinShareLink(setLoading, { link });
    setScrapData(data);
    if (data.aleadyShared && data.owner) {
      return toast.info("You Already Earned 1 Extra Point in This Post");
    }
    if (data.pointEarn) {
      toast.success("You Got 1 Point Extra");
    } else {
      toast.error("This Post is not Eligible For Extra 1 Point");
    }
  };

  return (
    <CContainer>
      <h1 className="text-center mb-2">Share to Earn Points</h1>
      {Object.keys(scrapData).length !== 0 && (
        <CCard className="my-4">
          <CCardBody>
            <CCardTitle>Here is the analysis of your post:</CCardTitle>
            <h6>
              1.
              {scrapData?.hastagPresent ? (
                <span className="text-success">
                  {" "}
                  You Added #predictram, #knowyourrisk
                </span>
              ) : (
                <span className="text-danger"> All hastags were not added</span>
              )}
            </h6>
            <h6>
              2.
              {scrapData?.tagPresent ? (
                <span className="text-success"> You tagged PredictRam</span>
              ) : (
                <span className="text-danger">
                  You Did Not tagged PredictRam
                </span>
              )}
            </h6>
            <h6>
              3.
              {scrapData?.postid ? (
                <span className="text-success"> Paper Found </span>
              ) : (
                <span className="text-danger">
                  {" "}
                  Research Paper Link is Not Valid in Your Post
                </span>
              )}
            </h6>
            {scrapData?.postid && (
              <h6>
                4.
                {scrapData?.owner ? (
                  <span className="text-success">
                    {" "}
                    You Are the Owner of The Paper Link You Shared
                  </span>
                ) : (
                  <span className="text-danger">
                    {" "}
                    You Are Not the Owner of The Paper Link You Shared
                  </span>
                )}
              </h6>
            )}
          </CCardBody>
        </CCard>
      )}
      <CCard>
        <CCardBody>
          <CCardTitle>Paste Linkedin Post Link For Extra Point</CCardTitle>
          <CForm onSubmit={handelSubmit}>
            <CFormInput
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste Your Link Here"
            ></CFormInput>
            <CLoadingButton loading={loading} className="mt-3" type="submit">
              Submit
            </CLoadingButton>
          </CForm>
        </CCardBody>
        <div className="div_card">
          <div className="text-2 mx-4 mb-2">Post should contain:</div>
          <CRow className="mx-3 bold">
            <CCol md={5}>1. Hastags: #predictram, #knowyourrisk</CCol>
            <CCol md={3}>2. Tag: PredictRam</CCol>
            <CCol md={4}>3. Link: Your Research Paper Link</CCol>
          </CRow>
        </div>
        <div className="text-2 mx-4 my-4">Use this post as a reference:</div>
        <div className="responsive-iframe">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:7057419828176785408"
            height="519"
            width="504"
            frameborder="0"
            allowfullscreen=""
            title="Embedded post"
          ></iframe>
        </div>
      </CCard>
    </CContainer>
  );
}

export default PaperSharePoint;
