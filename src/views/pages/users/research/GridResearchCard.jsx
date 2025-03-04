import React, { useEffect, useState } from "react";
import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCol,
  CImage,
  CRow,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import star from "../../../../assets/illustrations/star.svg";
import starred from "../../../../assets/illustrations/starred.svg";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getLocalDate } from "../../../../utils/DateTimeService";
import { useMediaQuery } from "@mui/material";

function GridResearchCard({ key, data, lastCard }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const history = useHistory();
  const premiumUser = useSelector((state) => state.user.premiumUser);
  const { _id: investorId, premiumUser: investorPremiumUser } = useSelector(
    (state) => state.investor
  );
  const [stars, setStars] = useState(0);
  const [publishDate, setPublishDate] = useState("");

  const totalLikes = () => {
    if (!data.likes.length) return;
    let stars = 0;
    data.likes.forEach((el, index) => {
      stars += el.rate;
    });
    setStars(stars);
  };

  const getPublishDate = () => {
    const _publishDate = new Date(data.createdAt);
    setPublishDate(getLocalDate(_publishDate));
  };

  useEffect(() => {
    totalLikes();
    getPublishDate();
  }, [data]);

  const handleRedirect = (id) => {
    if (investorId) {
      if (!investorPremiumUser)
        return toast.error("You need to pay to view the full paper", {
          toastId: id,
        });
    } else {
      if (!premiumUser)
        return toast.error("You need to pay to view the full paper", {
          toastId: id,
        });
    }
    history.push(`/viewresearch/${id}`);
  };

  return (
    <CCard
      key={key}
      style={{
        width: "100%",
        padding: "1rem 0",
        boxShadow: "none",
        border: "none",
        borderBottom: lastCard ? "none" : "1px solid #D5D5D5",
        borderRadius: "none",
        background: "none",
      }}
    >
      <div
        className="d-flex flex-column flex-md-row"
        onClick={() => handleRedirect(data._id)}
        style={{
          width: "100%",
          gap: "1rem",
          flexDirection: "row",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <CRow>
          <CCol>
            {data?.isFeatured && (
              <CBadge
                className="mb-2 mx-2 d-flex justify-content-center align-items-center"
                style={{
                  width: "10em",
                  padding: "0.5em 0",
                  gap: "0.25em",
                  background: "rgb(93, 63, 211)",
                  borderRadius: "20px",
                }}
              >
                <div>
                  <img
                    src={starred}
                    alt="star"
                    style={{ height: "15px", width: "15px" }}
                  />
                </div>
                <div>Featured</div>
              </CBadge>
            )}
            <CImage
              className="shadow"
              rounded
              src={
                data.image ||
                "https://images.moneycontrol.com/static-mcnews/2022/01/stocks_sensex_nifty_stockmarket3.jpg"
              }
              width={300}
              height={200}
            />
          </CCol>
        </CRow>
        <CCardBody
          className="p-0 py-2 d-flex flex-column align-items-start"
          style={{ width: "fit-content", gap: "0.625rem" }}
        >
          <CCardTitle
            className="p-0 m-0"
            style={{
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "#252525",
            }}
          >
            {data.title}
          </CCardTitle>
          <div
            className="d-flex flex-row align-items-center"
            style={{
              gap: "0.5rem",
            }}
          >
            <CAvatar
              src={"https://picsum.photos/200?random=" + Math.random()}
              style={{
                width: "1.75rem",
                height: "1.75rem",
              }}
            />
            <CCardSubtitle
              className="text-medium-emphasis"
              style={{
                color: "#252525",
                fontWeight: 500,
              }}
            >
              {data.userId && data.userId.name}
            </CCardSubtitle>
            <span
              style={{
                color: "#252525",
                fontWeight: 500,
              }}
            >
              ·
            </span>
            <span
              style={{
                fontWeight: 400,
                fontSize: "0.875rem",
                color: "#B1B1B1",
              }}
            >
              {publishDate}
            </span>
            <span
              style={{
                color: "#252525",
                fontWeight: 500,
              }}
            >
              ·
            </span>
            <span
              style={{
                fontWeight: 400,
                fontSize: "0.875rem",
                color: "#B1B1B1",
              }}
              className="d-flex align-items-center justify-content-center gap-1"
            >
              <div>
                <img
                  alt="..."
                  src={star}
                  style={{ height: "14px", width: "14px" }}
                />
              </div>
              <div>{stars}</div>
            </span>
          </div>

          <CCardText
            className="m-0"
            style={{
              fontWeight: 600,
              color: "#AFAFB6",
            }}
          >
            {data.subtitle}
          </CCardText>

          <span
            className="m-0"
            style={{
              maxWidth: `${isSmallScreen ? "20rem" : "100%"}`,
              fontWeight: 400,
              color: "#222222",
              width: "100%",
              textAlign: "start",
              boxSizing: "content-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              "-webkit-line-clamp": "3",
              "-webkit-box-orient": "vertical",
              display: "-webkit-box",
              whiteSpace: "normal",
              lineHeight: "1.1875rem",
            }}
          >
            {data.text.substr(0, 240)}...
          </span>
        </CCardBody>
      </div>
    </CCard>
  );
}

export default GridResearchCard;
