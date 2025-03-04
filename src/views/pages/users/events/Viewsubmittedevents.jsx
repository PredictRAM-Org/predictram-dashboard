import { useState, useEffect, useRef, useCallback } from "react";
import { post,get } from "axios";
import { CRow, CCol } from "@coreui/react";
import EventsCard from "../../../../components/EventsCard";
import { toast } from "react-toastify";
export default function Viewsubmittedevents() {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasmore, setHasmore] = useState(true);
  async function getEvents() {
    try {
      setLoading(true);
      const { data } = await get("/api/users/viewsubmittedevents", { count });
      setHasmore(data.length);
      setEvents((prevdata) => [...new Set([...prevdata, ...data])]);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Server problem");
    }
  }
  useEffect(() => {
    getEvents();
  }, [count]);
  const observer = useRef();
  const lastElement = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasmore) {
        setCount((prevcount) => prevcount + 50);
      }
    });
    if (node) observer.current.observe(node);
  });
  return (
    <CRow className="justify-content-center" xs={{ cols: "auto", gutter: 2 }}>
      {events.length != 0 &&
        events.map((event, idx) => {
          if (events.length === idx + 1) {
            return (
              <CCol key={idx} ref={lastElement}>
                <EventsCard
                  key={idx}
                  eventid={event._id}
                  name={event.name}
                  enddate={event.enddate}
                  image={event.image}
                  forecastvalue={event.forecastvalue}
                  lastvalue={event.lastvalue}
                  previousvalue={event.previousvalue}
                  subscriber={event.subscriber}
                />
              </CCol>
            );
          } else
            return (
              <EventsCard
                key={idx}
                eventid={event._id}
                name={event.name}
                enddate={event.enddate}
                image={event.image}
                forecastvalue={event.forecastvalue}
                lastvalue={event.lastvalue}
                previousvalue={event.previousvalue}
                subscriber={event.subscriber}
              />
            );
        })}
    </CRow>
  );
}
