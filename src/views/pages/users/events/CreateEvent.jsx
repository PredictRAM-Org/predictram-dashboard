import React, { useRef, useState } from "react";
import { startOfDay, endOfDay } from "date-fns";
import {
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import UploadImage from "../../../../utils/custom/UploadImage";
import Select from "react-select";
import TagsList from "../../../../config/TagsList";
import BooleanSelect from "../../../inputs/SelectInputs/SelectWrapper/BooleanSelect";
import EventAccessSelect from "../../../inputs/SelectInputs/SelectWrapper/EventAccessSelect";

export default function CreateEvent() {
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [finalPayload, setFinalPayload] = useState({});
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const createEvent = async (object) => {
    try {
      const { data } = await axios.post("/api/admin/createevent", object, {
        withCredentials: true,
        // headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data);
      history.push("/viewevents");
    } catch (error) {
      toast.error(error.response && error.response.data);
    }
  };
  function handlesubmit(e) {
    e.preventDefault();
    if (!image) return toast.error("Cover Image is required");
    const tagarray = tags.map((tag) => tag.value);
    const payload = {
      ...finalPayload,
      image,
      tags: tagarray,
      isPublic: isPublic?.value,
    };

    createEvent(payload);
  }

  const handleChange = (e) => {
    setFinalPayload({
      ...finalPayload,
      [e.target.name]: e.target.value,
    });
  };

  const handleStartDateChange = (e) => {
    const result = startOfDay(new Date(e.target.value)).toISOString();
    console.log(result);
    setFinalPayload({
      ...finalPayload,
      [e.target.name]: result,
    });
  };

  const handleEndDateChange = (e) => {
    const result = endOfDay(new Date(e.target.value)).toISOString();
    setFinalPayload({
      ...finalPayload,
      [e.target.name]: result,
    });
  };

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>Create Event</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handlesubmit} className="row g-3">
          <UploadImage
            imgSrc={image}
            setImgSrc={setImage}
            containerName="event-image"
            refSrc={hiddenFileInput}
          />
          <CCol xs={12}>
            <CFormLabel htmlFor="inputEventname">Event Name</CFormLabel>
            <CFormInput
              id="inputEventname"
              name="name"
              placeholder="Enter Event Name"
              onChange={handleChange}
            />{" "}
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="inputEventname">Event Symbol</CFormLabel>
            <CFormInput
              id="inputEventname"
              name="eventsymbol"
              placeholder="Enter Symbol Name"
              onChange={handleChange}
            />{" "}
          </CCol>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">
              Event Details
            </CFormLabel>
            <CFormTextarea
              name="details"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={handleChange}
            ></CFormTextarea>
          </div>
          <CCol md={4}>
            <CFormLabel htmlFor="inputLastValue">Last Value</CFormLabel>
            <CFormInput
              id="inputEventname"
              name="lastvalue"
              placeholder="Enter Last Value"
              onChange={handleChange}
            />{" "}
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="inputPreviousValue">Previous Value</CFormLabel>
            <CFormInput
              id="inputEventname"
              name="previousvalue"
              placeholder="Enter Previous Value"
              onChange={handleChange}
            />{" "}
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="inputForecastValue">Forecast Value</CFormLabel>
            <CFormInput
              id="inputEventname"
              name="forecastvalue"
              placeholder="Enter Forecast Value"
              onChange={handleChange}
            />{" "}
          </CCol>
          <CCol xs={6}>
            <CFormLabel htmlFor="inputForecastValue">Start Date</CFormLabel>
            <CFormInput
              id="inputEventname"
              name="startdate"
              placeholder="Enter Start Date"
              type="date"
              onChange={handleStartDateChange}
            />{" "}
          </CCol>
          <CCol xs={6}>
            <CFormLabel htmlFor="inputForecastValue">End Date</CFormLabel>
            <CFormInput
              id="inputEventname"
              name="enddate"
              placeholder="Enter End Date"
              type="date"
              onChange={handleEndDateChange}
            />{" "}
          </CCol>
          <CCol xs={6}>
            <CFormLabel className="mt-2">Choose Tag</CFormLabel>
            <Select
              isMulti
              name="Tages"
              options={TagsList}
              onChange={setTags}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </CCol>
          <CCol xs={6}>
            <EventAccessSelect value={isPublic} setValue={setIsPublic} />
          </CCol>
          <CCol xs={12}>
            <CButton type="submit">Create Event</CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  );
}
