import AdvisorSelect from "../../../inputs/SelectInputs/SelectWrapper/AdvisorSelect";
import { connectWithAdvisors } from "../../../../api/services/Investors/InvestorEventService";
import {
  CFormSelect,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addSecondsToTime,
  dataTimeFormatForZoho,
} from "../../../../utils/DateTimeService";
import { Box } from "@mui/material";
import {
  getUserList,
  getBookingsServices,
  getBookingsAvailability,
  bookAppointment,
  fetchStaffs,
} from "../../../../api/services/InvestorService";
import ServiceSelect from "../../../inputs/SelectInputs/SelectWrapper/ServiceSelect";
import TimeSelect from "../../../inputs/SelectInputs/SelectWrapper/TimeSelect";
import Loader from "../../users/Loader";
import StaffSelect from "../../../inputs/SelectInputs/SelectWrapper/StaffSelect";
import { useQuery } from "@tanstack/react-query";

export default function ConnectWithAdvisorsModal({ modalOpen, setModalOpen }) {
  const {
    _id: investorId,
    email,
    firstName,
    lastName,
    mobileNumber,
    secretToken,
    //   investorVAR,
    //   investorIdealRisk,
  } = useSelector((state) => state.investor);

  // const [connectStartTime, setConnectStartTime] = useState("");
  // const [selectedAdvisor, setSelectedAdvisor] = useState("");
  // const [advisorData, setAdvisorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [requestedDate, setRequestedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [staffs, setStaffs] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const userList = async () => {
  //   const { data } = await getUserList(setLoading, { isPublic: true });
  //   setAdvisorData(data);
  // };

  // const serviceList = async () => {
  //   const { data } = await getBookingsServices(setLoading);
  //   setServices(data);
  // };

  // useEffect(() => {
  //   // userList();
  //   if (modalOpen) {
  //     serviceList();
  //   }
  // }, [modalOpen]);

  const serviceListQuery = useQuery({
    queryKey: "services",
    queryFn: async () => {
      const { data } = await getBookingsServices(setLoading);
      return data;
    },
    enabled: modalOpen,
    staleTime: 60000 * 2,
  });

  const services = serviceListQuery.data;

  const availableSlotsQuery = useQuery({
    queryKey: ["slots", selectedService?.id, requestedDate],
    queryFn: async () => {
      const { data } = await getBookingsAvailability(setLoading, {
        staff_id: selectedService?.assigned_staffs[0],
        selected_date: requestedDate,
        service_id: selectedService?.id,
      });
      return data;
    },
    enabled: !!requestedDate && !!selectedService,
  });

  const slots = availableSlotsQuery.data;

  const staffsFetch = async () => {
    setStaffs(null);
    const staffDetails = [];
    for (const staffId of selectedService?.assigned_staffs) {
      const { data } = await fetchStaffs(setLoading, {
        staff_id: staffId,
      });

      if (data) {
        staffDetails.push({
          id: staffId,
          label: data[0].name,
          value: data[0].name,
        });
      }
    }
    setStaffs(staffDetails);
  };

  useEffect(() => {
    selectedService && staffsFetch();
  }, [selectedService]);

  function resetAllStates() {
    setSelectedService(null);
    setSelectedStaff(null);
    setRequestedDate(null);
    setSelectedTime(null);
    setStaffs([]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log("rohit", selectedAdvisor);
    // const filteredAdvisor = advisorData?.filter(
    //   (advisor) => advisor.email === selectedAdvisor.value
    // );
    // const payload = {
    //   investorId,
    //   investorVAR,
    //   investorIdealRisk,
    //   requestedDate,
    //   fromTime: connectStartTime,
    //   toTime: addSecondsToTime(connectStartTime, 900),
    //   advisorName: filteredAdvisor[0]?.name,
    //   advisorEmail: filteredAdvisor[0]?.email,
    // };

    const formattedDate = dataTimeFormatForZoho(requestedDate, selectedTime);

    const payload = {
      investorId: investorId,
      service_id: selectedService?.id,
      staff_id: selectedStaff.id,
      from_time: formattedDate,
      customer_details: {
        name: firstName + " " + lastName,
        email: email,
        phone_number: mobileNumber,
      },
    };

    // const { statusCode } = await connectWithAdvisors(setLoading, payload);

    const { statusCode } = await bookAppointment(setLoading, payload, {
      secretToken,
      mobileNumber,
    });

    if (statusCode === 200) {
      resetAllStates();
      setModalOpen(false);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <CForm>
      <CModal
        visible={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <CModalHeader>
          <CModalTitle>Connect With Advisors</CModalTitle>
        </CModalHeader>
        <CModalBody className="mx-2">
          {services && (
            <Box component="div" sx={{ my: "1em" }}>
              <ServiceSelect
                value={selectedService}
                setValue={setSelectedService}
                services={services}
              />
            </Box>
          )}
          {selectedService && staffs && (
            <Box component="div" sx={{ my: "1em" }}>
              <StaffSelect
                selectedStaff={selectedStaff}
                setSelectedStaff={setSelectedStaff}
                staffs={staffs}
              />
            </Box>
          )}
          {/* <Box component="div" sx={{ my: "1em" }}>
            <AdvisorSelect
              value={selectedAdvisor}
              setValue={setSelectedAdvisor}
            />
          </Box> */}
          {selectedService && selectedStaff && staffs && (
            <Box component="div" sx={{ my: "1em" }}>
              <CFormLabel htmlFor="requestedDate">Select Date</CFormLabel>
              <CFormInput
                name="requestedDate"
                id="requestedDate"
                placeholder="Select date you want to connect"
                required={true}
                type="date"
                value={requestedDate}
                onChange={(e) => {
                  setRequestedDate(e.target.value);
                }}
              />
            </Box>
          )}
          {/* <Box component="div" sx={{ my: "1em" }}> */}
          {/* <CFormLabel htmlFor="connectStartTime">Select Time</CFormLabel> */}
          {/* <CFormInput
              name="connectStartTime"
              id="connectStartTime"
              placeholder="Select time you want to connect"
              type="time"
              required={true}
              value={connectStartTime}
              onChange={(event) => setConnectStartTime(event.target.value)}
            /> */}
          {/* </Box> */}
          {requestedDate && slots && (
            <Box component="div" sx={{ my: "1em" }}>
              <TimeSelect
                value={selectedTime}
                setValue={setSelectedTime}
                slots={slots}
              />
            </Box>
          )}
          {loading && !isSubmitting && <Loader />}
          {isSubmitting ? (
            <CButton className="my-4" disabled>
              <CSpinner component="span" size="sm" aria-hidden="true" />{" "}
              Submitting...
            </CButton>
          ) : (
            <CButton
              className="my-4"
              onClick={(e) => handleSubmit(e)}
              disabled={!selectedService || !requestedDate || !selectedTime}
            >
              Submit
            </CButton>
          )}
        </CModalBody>
      </CModal>
    </CForm>
  );
}
