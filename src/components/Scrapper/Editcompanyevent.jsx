import { useState } from "react";
import {
  CButton,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import Select, { createFilter } from "react-select";
import { eventtypes } from "../../data";
import { useEffect } from "react";

export default function Addcompanyevent({ showedit, setShowedit, handelEdit,editdata }) {
 
    const [companyname, setCompanyname] = useState("");
    const [industry, setIndustry] = useState("");
    const [mktcap, setMktcap] = useState("");
    const [currentevent, setCurrentevent] = useState({
      value: "Manufacturing",
      label: "Manufacturing",
    });
    const [id, setId] = useState("");
  useEffect(()=>{
    setCompanyname(editdata["Company Name"]);
    setIndustry(editdata["Industry"]);
    setMktcap(editdata["Mkt. Cap."]);
    setCurrentevent({value:editdata["Event"],label:editdata["Event"]});
    setId(editdata["id"]);
  },[])

  return (
    <CModal visible={showedit} onClose={() => setShowedit(false)}>
      <CModalHeader onClose={() => setShowedit(false)}>
        <CModalTitle>Edit Company Event</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput
          className="mb-2"
          onChange={(e) => setCompanyname(e.target.value)}
          value={companyname}
          placeholder="Enter Company Name"
        />
        <CFormInput
          className="mb-2"
          onChange={(e) => setIndustry(e.target.value)}
          value={industry}
          placeholder="Enter Industry Name"
        />
        <CFormInput
          className="mb-2"
          onChange={(e) => setMktcap(e.target.value)}
          value={mktcap}
          type="Number"
          placeholder="Enter Market Cap."
        />
        <Select
          className="mb-2"
          filterOption={createFilter({ ignoreAccents: false })}
          onChange={(event) => {
            setCurrentevent(event);
          }}
          options={eventtypes.map((el) => ({
            value: el,
            label: el,
          }))}
          value={currentevent}
        />
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => handelEdit(companyname, industry, mktcap, currentevent,id)}
        >
          Edit
        </CButton>
        <CButton color="secondary" onClick={() => setShowedit(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
}