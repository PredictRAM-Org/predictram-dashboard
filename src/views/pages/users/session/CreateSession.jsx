import {
  CButton,
  CCard,
  CCardBody,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from "@coreui/react";
import Select from "react-select";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  createSession,
  getSessions,
  updateSession,
} from "../../../../api/services/SessionService";
import { useHistory, useParams } from "react-router-dom";
import SessionTagSelect from "../../../inputs/SelectInputs/SelectWrapper/SessionTagSelect";
import UploadImage from "../../../../utils/custom/UploadImage";
import { useRef } from "react";

const TAG_ENUM = [
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Economy", label: "Economy" },
  { value: "General", label: "General" },
  { value: "Analysis", label: "Analysis" },
  { value: "Carrer_Advice", label: "Carrer Advice" },
  { value: "Others", label: "Others" },
];

const DURATION = [
  { value: 3600, label: "1 hr" },
  { value: 2700, label: "45 min" },
  { value: 1800, label: "30 min" },
];

function CreateSession() {
  const [duration, setDuration] = useState({ value: 1800, label: "30 min" });
  const [tags, setTags] = useState({
    value: "Technology",
    label: "Technology",
  });
  const [isPaid, setIsPaid] = useState({ value: false, label: "NO" });
  const [session, setSession] = useState({ fee: 0 });
  const [loading, setLoading] = useState(false);
  const instructor = useSelector((state) => state.user.id);
  const [image, setImage] = useState("");
  const hiddenFileInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  const handelTextInput = (e) => {
    setSession({ ...session, [e.target.name]: e.target.value });
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const payload = {
      ...session,
      fee: Number(session.fee),
      tags: tags.value,
      duration: duration.value,
      instructor,
      image,
    };
    await createSession(setLoading, payload);
    history.push("/creator/view-session");
  };

  const handelEditSession = async (e) => {
    e.preventDefault();
    const payload = {
      ...session,
      fee: Number(session.fee),
      tags: tags.value,
      duration: duration.value,
      instructor,
      image,
    };
    await updateSession(setLoading, id, payload);
    history.push("/creator/view-session");
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const {
          data: [session],
        } = await getSessions(setLoading, { id });
        setSession({
          description: session?.description,
          title: session?.title,
          fee: session?.fee,
        });
        setImage(session?.image);
        if (session?.fee > 0) {
          setIsPaid({ value: true, label: "YES" });
        }
        const durationLabel = DURATION.find(
          (d) => d.value === session?.duration,
        ).label;
        const tagLabel = TAG_ENUM.find(
          (tag) => tag.label === session?.tags,
        ).label;
        setDuration({ label: durationLabel, value: session?.duration });
        setTags({ label: tagLabel, value: session?.tags });
      }
    })();
  }, []);

  return (
    <CContainer fluid>
      <h1 className="text-center mb-2">Create Session</h1>
      <CCard className="mb-3">
        <CCardBody>
          <CForm onSubmit={id ? handelEditSession : handleCreateSession}>
            <UploadImage
              imgSrc={image}
              setImgSrc={setImage}
              containerName="researchpaper-image"
              refSrc={hiddenFileInput}
            />
            <br />
            <CFormLabel htmlFor="title">Title</CFormLabel>
            <CFormInput
              required
              name="title"
              id="title"
              value={session.title}
              onChange={handelTextInput}
              placeholder="Enter Session Title"
            ></CFormInput>

            <div className="mt-3">
              <CFormLabel htmlFor="desc">Description</CFormLabel>
              <CFormTextarea
                required
                rows="5"
                name="description"
                id="desc"
                value={session.description}
                onChange={handelTextInput}
                placeholder="Enter About Session"
              ></CFormTextarea>
            </div>

            <div className="mt-3">
              <CFormLabel className="mt-2" htmlFor="duration">
                Duration
              </CFormLabel>
              <Select
                required
                id="duration"
                name="duration"
                options={DURATION}
                value={duration}
                onChange={setDuration}
                classNamePrefix="select"
              />
            </div>

            <div className="mt-3">
              <CFormLabel>Session Tag</CFormLabel>
              <SessionTagSelect value={tags} setValue={setTags} />
            </div>

            <div className="mt-3">
              <CFormLabel className="mt-2" htmlFor="paid">
                Do You want to charge for this session ?
              </CFormLabel>
              <Select
                required
                id="paid"
                name="paid"
                options={[
                  { value: true, label: "YES" },
                  { value: false, label: "NO" },
                ]}
                value={isPaid}
                onChange={(e) => {
                  setIsPaid(e);
                  e.value === false && setSession({ ...session, fee: 0 });
                }}
                classNamePrefix="select"
              />
            </div>

            <div className="mt-3">
              <CFormLabel htmlFor="fee" className="mt-2">
                Your Fees
              </CFormLabel>
              <CFormInput
                disabled={isPaid.value === false}
                value={session.fee}
                name="fee"
                id="fee"
                type="number"
                onChange={handelTextInput}
                placeholder="Enter Your fee"
              ></CFormInput>
            </div>

            <CButton type="submit" className="mt-3">
              {id ? "Save Changes" : "Create Session"}
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default CreateSession;
