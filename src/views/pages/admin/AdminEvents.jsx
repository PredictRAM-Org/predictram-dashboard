import AdminEventsCard from "../../../components/AdminEventsCard";
import { CRow } from "@coreui/react";
import { useEffect } from "react";
import { useState } from "react";
import { CSpinner } from "@coreui/react";
import { toast } from "react-toastify";
import { getEvents } from "../../../api/services/EventService";
import { Divider, Typography } from "@mui/material";
import PillSwitch from "../../../utils/custom/PillSwitch";
export default function AdminEvents() {
  const [events, setEvents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    getevents();
  }, [isPublic]);

  const getevents = async () => {
    try {
      const data = await getEvents(setLoading, {
        withCredentials: true,
        isPublic,
      });
      setEvents(data);
    } catch (error) {
      toast.error(error.response && error.response.data);
    }
  };
  if (!events) return <CSpinner color="primary" />;
  else
    return (
      <>
        <Typography sx={{ textAlign: "center", mb: "0.5em" }} variant="h4">
          Events Data
        </Typography>
        <PillSwitch
          leftLabel="Pre User"
          rightLabel="User"
          value={isPublic}
          setValue={setIsPublic}
        />
        <Divider sx={{ my: "1em" }} />
        <CRow className="justify-content-center" xs={{ cols: "auto" }}>
          {events.map((event, idx) => (
            <AdminEventsCard
              key={idx}
              name={event.name}
              eventid={event._id}
              isPublic={isPublic}
              enddate={event.enddate}
              forecastvalue={event.forecastvalue}
              previousvalue={event.previousvalue}
              lastvalue={event.lastvalue}
              subscriber
            />
          ))}
        </CRow>
      </>
    );
}
