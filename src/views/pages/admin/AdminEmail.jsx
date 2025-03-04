import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CListGroup,
  CListGroupItem,
  CRow,
} from "@coreui/react";
import { Container } from "@mui/material";
import Select from "react-select";
import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../users/Loader";
import {
  createEmailGroup,
  deleteEmailGroup,
  getEmailGroup,
  sendGroupEmail,
  sendIndividualEmail,
} from "../../../api/services/EmailService";
import { getLocalDate } from "../../../utils/DateTimeService";
import CIcon from "@coreui/icons-react";
import { cilDelete, cilTrash } from "@coreui/icons-pro";
import { toast } from "react-toastify";
import ImageCompress from "quill-image-compress";
import ReactQuill from "react-quill";
import "../../../assets/css/Editor.css";

ReactQuill.Quill.register("modules/imageCompress", ImageCompress);

AdminEmail.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4] }, { font: [] }],
    [{ size: [] }],
    [{ color: [] }],
    [{ background: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { direction: "rtl" },
    ],
    ["link", "image", "code"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageCompress: {
    quality: 0.5,
    maxWidth: 500,
    maxHeight: 500,
    imageType: "image/*",
    debug: false,
    suppressErrorLogging: false,
    insertIntoEditor: undefined,
  },
};

AdminEmail.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code",
  "align",
  "color",
  "background",
];

function AdminEmail() {
  const [emailGroup, setEmailGroup] = useState({});
  const [loading, setLoading] = useState(false);
  const [emailloading, setEmailloading] = useState(false);
  const [allemailGroup, setallemailGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [emailType, setEmailType] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleCreateEmailGroup = async (e) => {
    e.preventDefault();
    await createEmailGroup(setLoading, emailGroup);
    getEmailGroups();
  };

  const handelSendEmail = async (e) => {
    e.preventDefault();
    const groups = selectedGroup.map((group) => group?.value);
    const isIndividual = emailType?.value;
    if (groups.length === 0) return toast.warning("Please Choose email groups");
    if (emailType?.value === undefined)
      return toast.warning("Please Choose email type");
    const textbody = body.replace(/<[^>]+>/g, "");
    let payload = {
      groups,
      subject,
      htmlbody: body,
      textbody,
    };
    if (isIndividual) {
      await sendIndividualEmail(setEmailloading, payload);
    } else {
      await sendGroupEmail(setEmailloading, payload);
    }
  };

  const getEmailGroups = async () => {
    const allgroups = await getEmailGroup(setLoading, {});
    setallemailGroup(allgroups);
  };

  const handelEmailGroupChange = (e) => {
    setEmailGroup({ ...emailGroup, [e.target.name]: e.target.value });
  };

  const handelEmailGroupDelete = async (id) => {
    await deleteEmailGroup(setLoading, id);
    getEmailGroups();
  };

  useEffect(() => {
    getEmailGroups();
  }, []);

  return (
    <Container>
      <CRow>
        <CCol lg={6}>
          <CCard className="mb-3">
            <CCardHeader>Compose Email</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handelSendEmail}>
                <CFormLabel htmlFor="groups">
                  Select Recipients Email Group
                </CFormLabel>
                <Select
                  required
                  isMulti
                  id="groups"
                  name="groups"
                  options={allemailGroup.map((group) => {
                    return { value: group._id, label: group.name };
                  })}
                  onChange={setSelectedGroup}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                <CFormLabel className="mt-2" htmlFor="emailType">
                  Send Individual
                </CFormLabel>
                <Select
                  required
                  id="emailType"
                  name="emailType"
                  options={[
                    { value: true, label: "YES" },
                    { value: false, label: "NO" },
                  ]}
                  onChange={setEmailType}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                <CFormLabel className="mt-2" htmlFor="subject">
                  Subject
                </CFormLabel>
                <CFormInput
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  name="subject"
                  id="subject"
                  placeholder="Enter Email Subject"
                ></CFormInput>
                <CFormLabel className="mt-2">Body</CFormLabel>
                <div className="app">
                  <ReactQuill
                    style={{}}
                    bounds={".app"}
                    theme="snow"
                    value={body}
                    onChange={setBody}
                    placeholder={"Write something..."}
                    modules={AdminEmail.modules}
                    formats={AdminEmail.formats}
                  />
                </div>
                <h6 className="mt-2">Note*</h6>
                <p>
                  use {"{{user_name}}"} to mention username in individual email
                  <br />
                  use {"{{email_id}}"} to mention email in individual email
                </p>
                <CButton type="submit" className="mt-3">
                  SEND MAIL
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={6}>
          <CCard>
            <CCardHeader>Create Email Group</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleCreateEmailGroup}>
                <CFormLabel htmlFor="name">Group Name</CFormLabel>
                <CFormInput
                  required
                  value={emailGroup?.name}
                  onChange={handelEmailGroupChange}
                  name="name"
                  id="name"
                  placeholder="Enter Email Group Name"
                ></CFormInput>
                <CFormLabel className="mt-2" htmlFor="startdate">
                  Start Date
                </CFormLabel>
                <CFormInput
                  required
                  name="startdate"
                  id="startdate"
                  placeholder="Enter Start Date"
                  type="date"
                  value={emailGroup.startdate}
                  onChange={handelEmailGroupChange}
                />
                <CFormLabel className="mt-2" htmlFor="enddate">
                  End Date
                </CFormLabel>
                <CFormInput
                  required
                  name="enddate"
                  id="enddate"
                  placeholder="Enter End Date"
                  type="date"
                  value={emailGroup.enddate}
                  onChange={handelEmailGroupChange}
                />

                <CButton type="submit" className="mt-3">
                  Create
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
          {allemailGroup.length > 0 && (
            <CCard className="my-3">
              <CCardBody>
                {!loading && (
                  <CListGroup flush>
                    {allemailGroup.map((emailGroup) => {
                      return (
                        <CListGroupItem className="d-flex justify-content-between">
                          <div>
                            <h6>{emailGroup.name}</h6>
                            <p>
                              {`${getLocalDate(emailGroup.startdate)}  to 
                              ${getLocalDate(emailGroup.enddate)}`}
                            </p>
                            Total no. of emails in this group :{" "}
                            {emailGroup.recipients.length}
                          </div>
                          <div>
                            <CIcon
                              style={{ cursor: "pointer" }}
                              icon={cilTrash}
                              onClick={() =>
                                handelEmailGroupDelete(emailGroup._id)
                              }
                            />
                          </div>
                        </CListGroupItem>
                      );
                    })}
                  </CListGroup>
                )}
                {loading && <Loader />}
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </Container>
  );
}

export default AdminEmail;
