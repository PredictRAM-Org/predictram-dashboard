import { Container } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import ContactCard from "../../../../components/Profile/ContactCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import backgroudpic from "../../../../assets/images/icon.png";
import { CCard, CCardBody } from "@coreui/react";
import UpdateProfileImage from "../../../../components/Profile/UpdateProfileImage";
import {
  getInvestors,
  updateInvestors,
} from "../../../../api/services/InvestorService";
import { useHistory, useParams } from "react-router-dom";
import { cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import InvestorProfileUpdate from "./InvestorProfileUpdate";
import { toast } from "react-toastify";
import Loader from "../../users/Loader";

function InvestorProfile() {
  const customStyles = {
    backgroundPic: {
      objectFit: "contain",
      borderBottom: "1px solid",
    },
    profileImg: {
      objectFit: "cover",
      border: "1px solid",
      borderRadius: "50%",
      backgroundColor: "#808080",
      position: "absolute",
      zIndex: 9,
      top: 100,
      left: 20,
      cursor: "pointer",
    },
  };

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateProfileImg, setUpdateProfileImg] = useState(false);
  const [profilemodal, setProfileModal] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const history = useHistory();
  const { id } = useParams();
  const investor = useSelector((state) => state.investor);

  const updateProfilePic = async () => {
    await updateInvestors(setLoading, { image: imgSrc, id: profile?._id });
    history.go(0);
  };
  const getProfile = async () => {
    const {
      data: [userData],
    } = await getInvestors(
      setLoading,
      { _id: id },
      {
        mobileNumber: investor?.mobileNumber,
        secretToken: investor?.secretToken,
      }
    );
    console.log(userData);
    setProfile(userData);
  };
  useEffect(() => {
    if (id === investor._id) {
      history.push("/investor/profile");
    } else if (id) {
      getProfile();
    } else {
      setProfile(investor);
    }
  }, []);
  return (
    <Container>
      <CCard>
        <div style={{ position: "relative" }}>
          <img
            width="100%"
            height="200"
            alt="..."
            src={backgroudpic}
            style={customStyles.backgroundPic}
          />
          <img
            width="160"
            height="160"
            alt="..."
            onClick={() => !id && setUpdateProfileImg(true)}
            src={
              profile?.image ||
              `https://ui-avatars.com/api/?name=${profile?.firstName}+${profile?.lastName}`
            }
            style={customStyles.profileImg}
          />
          {loading && <Loader />}
          {!loading && (
            <CCardBody style={{ marginTop: 60, marginLeft: 15 }}>
              <div className="d-flex align-items-center justify-content-between">
                {profile?.firstName && (
                  <h1>{`${profile?.firstName} ${profile?.lastName}`}</h1>
                )}
                <div>Please update your name</div>
                {!id && (
                  <CIcon
                    icon={cilPencil}
                    size="xl"
                    onClick={() => setProfileModal(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              <p
                style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
                onClick={() => {
                  navigator.clipboard.writeText(`${profile?.uniqueId}`);
                  toast.success("Id is coppied!!");
                }}
              >{`${profile?.uniqueId || "N/A"}`}</p>
              {!id ? (
                <p>
                  Your Email is {profile?.email || "N/A"} <br /> Youe Phone
                  Number is {profile?.mobileNumber}
                </p>
              ) : (
                <p>Email is {profile?.email || "N/A"}</p>
              )}
            </CCardBody>
          )}
        </div>
      </CCard>
      {updateProfileImg && (
        <UpdateProfileImage
          setShow={setUpdateProfileImg}
          show={updateProfileImg}
          name={`${profile?.firstName} ${profile?.lastName}`}
          image={profile?.image}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          updateProfile={updateProfilePic}
        />
      )}
      {profilemodal && (
        <InvestorProfileUpdate
          data={{
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            email: profile?.email,
          }}
          setLoading={setLoading}
          setVisible={setProfileModal}
          visible={profilemodal}
        />
      )}
    </Container>
  );
}

export default InvestorProfile;
