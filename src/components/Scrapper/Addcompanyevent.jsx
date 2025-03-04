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

export default function Addcompanyevent({ showadd, setShowadd, handelAdd }) {
  const [companyname, setCompanyname] = useState("");
  const [industry, setIndustry] = useState("");
  const [mktcap, setMktcap] = useState("");
  const [currentevent, setCurrentevent] = useState({
    value: "Manufacturing",
    label: "Manufacturing",
  });

  return (
    <CModal visible={showadd} onClose={() => setShowadd(false)}>
      <CModalHeader onClose={() => setShowadd(false)}>
        <CModalTitle>Add New Company Event</CModalTitle>
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
          onClick={() => handelAdd(companyname, industry, mktcap, currentevent)}
        >
          Add
        </CButton>
        <CButton color="secondary" onClick={() => setShowadd(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
