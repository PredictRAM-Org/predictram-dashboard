import {
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
import { dataTimeFormatForZoho } from "../../../../utils/DateTimeService";
import { Box } from "@mui/material";
import {
  getBookingsServices,
  getBookingsAvailability,
  fetchStaffs,
  fetchAppointment,
  rescheduleAppointment,
} from "../../../../api/services/InvestorService";
import TimeSelect from "../../../inputs/SelectInputs/SelectWrapper/TimeSelect";
import Loader from "../../users/Loader";
import StaffSelect from "../../../inputs/SelectInputs/SelectWrapper/StaffSelect";

function RescheduleAppointmentModal({ modalOpen, setModalOpen, appointment }) {
  const { _id: investorId } = useSelector((state) => state.investor);

  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [requestedDate, setRequestedDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [staffs, setStaffs] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);

  const sessionData = async () => {
    const { data } = await fetchAppointment(setLoading, {
      booking_id: appointment.booking_id,
    });
    setAppointmentData(data);
  };

  useEffect(() => {
    if (modalOpen) {
      sessionData();
    } else {
      resetAllStates();
    }
  }, [modalOpen]);

  const serviceList = async () => {
    const { data } = await getBookingsServices(setLoading, {
      service_id: appointmentData?.service_id,
    });
    setSelectedService(data[0]);
  };

  useEffect(() => {
    appointmentData && serviceList();
  }, [appointmentData]);

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

  const availableSlots = async (selectedService, requestedDate) => {
    setSlots(null);
    const { data } = await getBookingsAvailability(setLoading, {
      staff_id: selectedService?.assigned_staffs[0],
      selected_date: requestedDate,
      service_id: selectedService?.id,
    });
    setSlots(data);
  };

  useEffect(() => {
    requestedDate && availableSlots(selectedService, requestedDate);
  }, [requestedDate, selectedService]);

  const resetAllStates = () => {
    setSelectedService(null);
    setSelectedStaff(null);
    setRequestedDate(null);
    setSlots([]);
    setSelectedTime(null);
    setStaffs([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedDate = dataTimeFormatForZoho(requestedDate, selectedTime);

    const payload = {
      investorId: investorId,
      id: appointment._id,
      booking_id: appointment.booking_id,
      staff_id: selectedStaff.id,
      start_time: formattedDate,
    };

    const { statusCode } = await rescheduleAppointment(setLoading, payload);

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
          <CModalTitle>Reschedule Appointment</CModalTitle>
        </CModalHeader>
        <CModalBody className="mx-2">
          {selectedService && staffs && (
            <Box component="div" sx={{ my: "1em" }}>
              <StaffSelect
                selectedStaff={selectedStaff}
                setSelectedStaff={setSelectedStaff}
                staffs={staffs}
              />
            </Box>
          )}
          {selectedStaff && staffs && (
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

export default RescheduleAppointmentModal;
