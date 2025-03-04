import { useEffect, useState } from "react";
import {
  CButton,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CCardTitle,
  CListGroup,
  CCard,
  CCardBody,
  CListGroupItem,
  CContainer,
  CModal,
  CModalFooter,
} from "@coreui/react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEvnet } from "../redux/action/adminaction";
import { getLocalDate } from "../utils/DateTimeService";

function AdminEventsCard({
  name,
  eventid,
  enddate,
  forecastvalue,
  previousvalue,
  lastvalue,
  isPublic,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState({
    active: false,
    ended: null,
  });

  useEffect(() => {
    let eventEndDate = new Date(enddate);
    let currentDate = new Date();
    setEvent({
      active: eventEndDate < currentDate,
      ended: getLocalDate(eventEndDate),
    });
  }, [enddate]);

  const handleNavigation = (eventid) => {
    if (!isPublic) {
      history.push(`/admin/interns/${eventid}`);
    } else {
      history.push(`/admin/events/${eventid}`);
    }
  };

  return (
    <CContainer
      className="justify-content-center m-2"
      style={{ width: "25rem" }}
    >
      <CCard className="rounded-3 p-3">
        <CCardBody className="text-center">
          <CCardTitle className="fw-bold">{name} </CCardTitle>
          <span className="text-danger">Event end date is {event.ended}</span>
          {event.active && (
            <>
              <CListGroupItem className="my-2 rounded-3 text-danger fw-bold">
                This event had been ended
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
            className="m-2 px-3"
            shape="rounded-pill"
          >
            Edit
          </CButton>
          <CButton
            onClick={() => setVisible(!visible)}
            color="danger"
            className="m-2 px-3"
            shape="rounded-pill"
          >
            Delete
          </CButton>
          <CButton
            onClick={() => handleNavigation(eventid)}
            color="success"
            className="m-2 px-3"
            shape="rounded-pill"
          >
            View Opinions
          </CButton>
        </CCardBody>
      </CCard>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Delete Event</CModalTitle>
        </CModalHeader>
        <CModalBody>
          If you delete all data regarding event will be lost.
        </CModalBody>
        <CModalFooter>
          <CButton
            onClick={() => {
              dispatch(deleteEvnet(eventid));
              setVisible(false);
            }}
            color="primary"
          >
            Confirm
          </CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
}
export default AdminEventsCard;
