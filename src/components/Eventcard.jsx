import React,{useState} from "react";
import { cilArrowCircleRight } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CListGroupItem,CButton } from "@coreui/react";
import { Link } from "react-router-dom";
import star from "../assets/illustrations/star.svg";
import {get} from 'axios'
import {toast} from "react-toastify"

function Eventcard({ event, idx, price  }) {
    
  

  return (
    <CListGroupItem
      component={Link}
      key={idx}
      to={`/eventdetails/${event._id}`}
      className=" d-flex justify-content-between align-items-center groupItem"
    >
      <div>
        <div>{event.name}</div>
        
      </div>

      <div>
        <CButton
          // shape="rounded-pill"
          color="primary"
          role="button"
          variant="outline"
        >
          Know More
        </CButton>
      </div>
    </CListGroupItem>
  );
}

export default Eventcard;
