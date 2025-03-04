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
  CInputGroup,
  CRow,
  CFormTextarea,
  CFormText,
} from "@coreui/react";
import Joi from "joi-browser";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import { post } from "axios";
import { toast } from "react-toastify";
import TagsList from "../../../../config/TagsList";
import { useSelector } from "react-redux";
export default function Completeprofile() {
  const { premiumUser } = useSelector((state) => state.user);
  const history = useHistory();
  const [about, setAbout] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState({ value: "male", label: "male" });
  const [sebiregistration, setSebiregistration] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [tags, setTags] = useState([]);
  const options = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "other", label: "other" },
  ];

  const saveprofile = async (e) => {
    e.preventDefault();

    const schema = {
      about: Joi.string().required(),
      age: Joi.string().required(),
      gender: Joi.string().required(),
      followedTags: Joi.array().min(3).required(),
      // sebiregistration: Joi.string().optional(),
      // wallet: Joi.string().optional(),
    };
    try {
      const tagarray = tags.map((tag) => tag.value);
      if (!premiumUser && tagarray.length > 5)
        return toast.warning(
          "You need to be a premium user to follow more than 5 tags"
        );
      const data = {
        about: about,
        age: age,
        gender: gender.value,
        followedTags: tagarray,
        sebiregistration: sebiregistration ?? "",
        wallet: wallet ?? "",
      };
      // const result = Joi.validate(data, schema);
      // if (result.error) {
      //   return toast.error(result.error.details[0].message);
      // }
      const response = await post("/api/users/saveprofile", data);
      history.go(0);
    } catch (err) {
      toast.error("Server problem");
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>Complete Your Profile to use all features</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={saveprofile} className="row g-3">
          <CCol xs={12} md={6}>
            <CFormLabel htmlFor="inputFullname">
              Enter About Yourself
            </CFormLabel>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="3"
            ></CFormTextarea>{" "}
          </CCol>
          <CCol xs={12} md={6}>
            <CFormLabel htmlFor="inputEmail">Enter Your age</CFormLabel>
            <CFormInput
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Your age"
            />
          </CCol>
          <CCol xs={12} md={6}>
            <CFormLabel htmlFor="inputConfirmPassword">
              Select Your Gender
            </CFormLabel>
            <Select
              value={gender}
              onChange={(e) => {
                setGender(e);
              }}
              options={options}
            />{" "}
          </CCol>

          <CCol xs={12} md={6}>
            <CFormLabel htmlFor="inputPassword">
              {" "}
              Enter Your SEBI REGISTRATION NO. (optional)
            </CFormLabel>
            <CFormInput
              value={sebiregistration}
              onChange={(e) => setSebiregistration(e.target.value)}
              type="text"
              placeholder="Your SEBI REGISTRATION NO."
            />{" "}
          </CCol>
          <CCol xs={12} md={6}>
            <CFormLabel htmlFor="inputPassword">
              {" "}
              Enter Your Wallet Address (optional)
            </CFormLabel>
            <CFormInput
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              type="text"
              placeholder="Your wallet address"
            />{" "}
          </CCol>

          <CCol xs={12} md={6}>
            <CFormLabel htmlFor="inputOtp">
              Select Your favorite Topics
            </CFormLabel>
            <Select
              isMulti
              name="Tages"
              options={TagsList}
              onChange={setTags}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            <CFormText>Select atleast 3 topics</CFormText>
          </CCol>
          <CRow className="m-2">
            <CCol xs={12} md={12} className="text-center">
              <CButton className="bold m-2 p-2" type="submit">
                Complete
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
}
