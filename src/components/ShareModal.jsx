import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import React from "react";
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

function ShareModal({
  link,
  show,
  setShow,
  title = "Share Now",
  linkedin = false,
  twitter = false,
}) {
  return (
    <CModal visible={show} onClose={() => setShow(false)}>
      <CModalHeader onClose={() => setShow(false)}>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="d-flex gap-3 flex-wrap justify-content-start align-items-start mt-2">
          {linkedin && (
            <LinkedinShareButton url={link}>
              <LinkedinIcon size={50} />
            </LinkedinShareButton>
          )}
          {twitter && (
            <TwitterShareButton hashtags={["predictram"]} url={link}>
              <TwitterIcon size={50} />
            </TwitterShareButton>
          )}
        </div>
      </CModalBody>
    </CModal>
  );
}

export default ShareModal;
