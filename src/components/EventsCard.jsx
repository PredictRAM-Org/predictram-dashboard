import { useEffect, useState } from "react";
import {
  CBadge,
  CButton,
  CCardTitle,
  CListGroup,
  CCard,
  CCardBody,
  CListGroupItem,
  CContainer,
} from "@coreui/react";
import { Link } from "react-router-dom";

function EventsCard({
  name,
  eventid,
  enddate,
  forecastvalue,
  previousvalue,
  lastvalue,
  subscriber,
  image,
}) {
  const [img, setImage] = useState(
    "https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"
  );
  const [event, setEvent] = useState({
    active: false,
    ended: null,
  });
  useEffect(() => {
    let date = new Date(enddate);
    let currentDate = new Date();
    setEvent({ active: date < currentDate, ended: date.toDateString() });
    if (image) setImage(`/uploaded/static/${image}`);
  }, []);
  return (
    <CContainer
      className="justify-content-center mt-4"
      style={{ width: "24rem" }}
    >
      <CCard
        className={
          event.active
            ? "rounded-3 p-3 border-top-danger border-top-5 shadow"
            : "rounded-3 p-3 border-top-success border-top-5 shadow"
        }
      >
        {/* <CImage className='mb-2' rounded thumbnail src={img} fluid align="center" height={50}/> */}
        <CCardBody className="text-center">
          <CCardTitle className="fw-bold">
            {name}{" "}
            {subscriber.length != 0 && (
              <CBadge color="warning" shape="rounded-pill">
                submitted
              </CBadge>
            )}{" "}
          </CCardTitle>
          {!event.active && (
            <span className="text-danger">Event end date is {event.ended}</span>
          )}
          {event.active && (
            <>
              <CListGroupItem className="my-2 rounded-3 text-danger fw-bold">
                This event ended
              </CListGroupItem>
            </>
          )}
          <CListGroupItem className="my-2 rounded-3 bg-light">
            Forecasted Value {forecastvalue}
          </CListGroupItem>

          <CListGroup>
            <CListGroupItem className="my-2 rounded-3">
              Last Value {lastvalue}
            </CListGroupItem>
            <CListGroupItem className="my-2 rounded-3">
              Previous Value {previousvalue}
            </CListGroupItem>
          </CListGroup>

          <CButton
            to={`/eventdetails/${eventid}`}
            component={Link}
            color="primary"
            className="mt-3 px-3"
            shape="rounded-pill"
          >
            Details
          </CButton>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}
export default EventsCard;
